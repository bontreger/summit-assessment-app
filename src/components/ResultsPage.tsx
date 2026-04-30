import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Content,
  ContentVariants,
  EmptyState,
  EmptyStateBody,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  PageSection,
  Title,
} from '@patternfly/react-core';
import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { getAssessmentById } from '../data/assessment-registry';
import { useAssessment } from '../context/AssessmentContext';
import { useSettings } from '../context/SettingsContext';
import {
  computeDomainScores,
  getAdvancementGuidance,
  isAssessmentComplete,
} from '../utils/scoring';
import { EmailReportModal } from './EmailReportModal';
import { buildReportHtml } from '../utils/reportTemplate';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const MATURITY_COLORS: Record<string, string> = {
  Initial: '#c9190b',
  Developing: '#f0ab00',
  Operational: '#06c',
  Optimizing: '#5752d1',
  Innovator: '#3e8635',
};

export function ResultsPage() {
  const { assessmentId } = useParams<{ assessmentId: string }>();
  const navigate = useNavigate();
  const { answers, resetAnswers } = useAssessment();
  const { developerMode } = useSettings();
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);

  const assessment = assessmentId ? getAssessmentById(assessmentId) : undefined;

  const domainScores = useMemo(
    () => (assessment ? computeDomainScores(assessment, answers) : []),
    [assessment, answers],
  );

  if (!assessment) {
    return (
      <PageSection>
        <EmptyState>
          <Title headingLevel="h2" size="lg">Assessment Not Found</Title>
          <EmptyStateBody>Select an assessment from the sidebar.</EmptyStateBody>
        </EmptyState>
      </PageSection>
    );
  }

  if (!isAssessmentComplete(assessment, answers)) {
    return (
      <PageSection>
        <EmptyState>
          <Title headingLevel="h2" size="lg">Assessment Incomplete</Title>
          <EmptyStateBody>Please answer all questions before viewing results.</EmptyStateBody>
          <Button variant="primary" onClick={() => navigate(`/assessments/${assessment.id}`)}>
            Back to Assessment
          </Button>
        </EmptyState>
      </PageSection>
    );
  }

  const radarData = {
    labels: domainScores.map((d) => d.label),
    datasets: [
      {
        label: 'Your Score',
        data: domainScores.map((d) => d.score),
        backgroundColor: 'rgba(0, 102, 204, 0.2)',
        borderColor: 'rgba(0, 102, 204, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(0, 102, 204, 1)',
        pointRadius: 5,
      },
    ],
  };

  const radarOptions = {
    scales: {
      r: {
        min: 0,
        max: 5,
        ticks: { stepSize: 1, backdropColor: 'transparent' },
        grid: { color: 'rgba(0,0,0,0.08)' },
        pointLabels: { font: { size: 14, weight: 600 as const } },
      },
    },
    plugins: { legend: { display: false } },
    maintainAspectRatio: true,
  };

  const handleRetake = () => {
    resetAnswers();
    navigate(`/assessments/${assessment.id}`);
  };

  const handlePreviewEmail = () => {
    setPreviewHtml(buildReportHtml(assessment.title, domainScores));
  };

  return (
    <>
      <PageSection variant="light">
        <Title headingLevel="h1" size="2xl">
          {assessment.title} &mdash; Results
        </Title>
      </PageSection>

      <PageSection>
        <div className="radar-chart-container">
          <Radar data={radarData} options={radarOptions} />
        </div>
      </PageSection>

      <PageSection>
        <Title headingLevel="h2" size="xl" style={{ marginBottom: '1rem' }}>
          Domain Scores
        </Title>
        <div className="domain-card-grid">
          {domainScores.map((ds) => {
            const guidance = getAdvancementGuidance(assessment, ds.domain, ds.score);
            return (
              <Card key={ds.domain} isCompact>
                <CardTitle style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {ds.label}
                  <Label
                    style={{ backgroundColor: MATURITY_COLORS[ds.maturityLevel] ?? '#6a6e73', color: '#fff' }}
                  >
                    {ds.score} / 5 &mdash; {ds.maturityLevel}
                  </Label>
                </CardTitle>
                <CardBody>
                  {guidance && (
                    <>
                      <Content component={ContentVariants.p} style={{ fontWeight: 600, marginBottom: '0.25rem' }}>
                        Next: {guidance.label}
                      </Content>
                      <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                        {guidance.actions.map((action, i) => (
                          <li key={i} style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                            {action}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </CardBody>
              </Card>
            );
          })}
        </div>
      </PageSection>

      <PageSection>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button variant="primary" onClick={() => setEmailModalOpen(true)}>
            Email Report
          </Button>
          <Button variant="secondary" onClick={handleRetake}>
            Retake Assessment
          </Button>
          <Button variant="link" onClick={() => navigate(`/assessments/${assessment.id}`)}>
            Back to Questions
          </Button>
          {developerMode && (
            <Button variant="tertiary" onClick={handlePreviewEmail}>
              Preview Email
            </Button>
          )}
        </div>
      </PageSection>

      <EmailReportModal
        isOpen={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        assessment={assessment}
        answers={answers}
        domainScores={domainScores}
      />

      {previewHtml != null && (
        <Modal
          isOpen
          onClose={() => setPreviewHtml(null)}
          variant="large"
          aria-label="Email preview"
        >
          <ModalHeader title="Email Preview (Developer Mode)" />
          <ModalBody>
            <iframe
              srcDoc={previewHtml}
              title="Email preview"
              style={{ width: '100%', height: '70vh', border: '1px solid #ddd', borderRadius: 4 }}
            />
          </ModalBody>
        </Modal>
      )}
    </>
  );
}
