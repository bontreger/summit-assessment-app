import { useState } from 'react';
import {
  ActionGroup,
  Alert,
  Button,
  Form,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  TextInput,
} from '@patternfly/react-core';
import type { Answers, Assessment, DomainScore } from '../types';
import { buildReportHtml } from '../utils/reportTemplate';

interface EmailReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  assessment: Assessment;
  answers: Answers;
  domainScores: DomainScore[];
}

type SendStatus = 'idle' | 'sending' | 'success' | 'error';

export function EmailReportModal({
  isOpen,
  onClose,
  assessment,
  answers,
  domainScores,
}: EmailReportModalProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SendStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSend = async () => {
    if (!email) return;
    setStatus('sending');
    setErrorMsg('');

    try {
      const html = buildReportHtml(assessment.title, domainScores);
      const endpoint = import.meta.env.VITE_EMAIL_API_URL;
      if (!endpoint) throw new Error('Email service is not configured');

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: email,
          subject: `${assessment.title} — Your Results`,
          html,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? body.message ?? `Server returned ${res.status}`);
      }

      setStatus('success');
    } catch (err: unknown) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Failed to send email');
    }
  };

  const handleClose = () => {
    setEmail('');
    setStatus('idle');
    setErrorMsg('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} variant="medium">
      <ModalHeader title="Email Your Report" />
      <ModalBody>
        {status === 'success' ? (
          <Alert variant="success" isInline title="Report sent!">
            Check your inbox at <strong>{email}</strong> for your assessment report with scores, rubric, and next steps.
          </Alert>
        ) : (
          <>
            {status === 'error' && (
              <Alert variant="danger" isInline title="Failed to send" style={{ marginBottom: '1rem' }}>
                {errorMsg}
              </Alert>
            )}
            <Form>
              <FormGroup label="Email address" isRequired fieldId="report-email">
                <TextInput
                  isRequired
                  type="email"
                  id="report-email"
                  value={email}
                  onChange={(_event, val) => setEmail(val)}
                  placeholder="you@company.com"
                  isDisabled={status === 'sending'}
                />
              </FormGroup>
            </Form>
          </>
        )}
      </ModalBody>
      <ModalFooter>
        {status === 'success' ? (
          <Button variant="primary" onClick={handleClose}>Done</Button>
        ) : (
          <ActionGroup>
            <Button
              variant="primary"
              onClick={handleSend}
              isDisabled={!email || status === 'sending'}
              isLoading={status === 'sending'}
            >
              {status === 'sending' ? 'Sending...' : 'Send Report'}
            </Button>
            <Button variant="link" onClick={handleClose} isDisabled={status === 'sending'}>
              Cancel
            </Button>
          </ActionGroup>
        )}
      </ModalFooter>
    </Modal>
  );
}
