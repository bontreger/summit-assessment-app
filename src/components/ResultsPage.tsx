import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  EmptyState,
  EmptyStateBody,
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
  isAssessmentComplete,
  getMaturityLabel,
} from '../utils/scoring';
import { EmailReportModal } from './EmailReportModal';
import { buildReportHtml } from '../utils/reportTemplate';
import type { DomainKey } from '../types';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const LEVEL_LABELS = ['Initial', 'Developing', 'Operational', 'Optimizing', 'Innovator'];

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
          Automation Maturity Model
        </Title>
        <div className="maturity-grid">
          {/* Domain rows */}
          {domainScores.map((ds) => {
            const currentLevel = Math.max(1, Math.floor(ds.score));
            const nextLevel = currentLevel < 5 ? currentLevel + 1 : null;
            const labels = assessment.maturityModel[ds.domain as DomainKey] ?? [];
            return (
              <div key={ds.domain} className="maturity-row">
                <div className="maturity-domain-label">
                  <span className="maturity-domain-name">{ds.label}</span>
                  <span className="maturity-domain-score">{ds.score} / 5</span>
                </div>
                {labels.map((cellLabel, i) => {
                  const level = i + 1;
                  let cellClass = 'maturity-cell';
                  if (level === currentLevel) cellClass += ' maturity-cell--current';
                  else if (level === nextLevel) cellClass += ' maturity-cell--next';
                  return (
                    <div key={level} className={cellClass}>
                      {cellLabel}
                    </div>
                  );
                })}
              </div>
            );
          })}

          {/* Level labels row */}
          <div className="maturity-row maturity-row--footer">
            <div className="maturity-domain-label" />
            {LEVEL_LABELS.map((label, i) => (
              <div key={i} className="maturity-level-label">
                <strong>{i + 1}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="maturity-legend">
          <span className="maturity-legend-item">
            <span className="maturity-legend-swatch maturity-legend-swatch--current" />
            Current State
          </span>
          <span className="maturity-legend-item">
            <span className="maturity-legend-swatch maturity-legend-swatch--next" />
            Next Focus
          </span>
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
