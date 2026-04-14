import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Content,
  ContentVariants,
  EmptyState,
  EmptyStateBody,
  PageSection,
  Title,
} from '@patternfly/react-core';
import { getAssessmentById } from '../data/assessment-registry';
import { useAssessment } from '../context/AssessmentContext';
import { isAssessmentComplete } from '../utils/scoring';
import { QuestionCard } from './QuestionCard';

export function AssessmentPage() {
  const { assessmentId } = useParams<{ assessmentId: string }>();
  const navigate = useNavigate();
  const { answers, setAnswer } = useAssessment();

  const assessment = assessmentId ? getAssessmentById(assessmentId) : undefined;

  if (!assessment) {
    return (
      <PageSection>
        <EmptyState>
          <Title headingLevel="h2" size="lg">Assessment Not Found</Title>
          <EmptyStateBody>
            The requested assessment does not exist. Select one from the sidebar.
          </EmptyStateBody>
        </EmptyState>
      </PageSection>
    );
  }

  const complete = isAssessmentComplete(assessment, answers);
  const answeredCount = assessment.questions.filter((q) => answers[q.id] != null).length;

  return (
    <>
      <PageSection variant="light">
        <Title headingLevel="h1" size="2xl">{assessment.title}</Title>
        <Content component={ContentVariants.p} style={{ marginTop: '0.5rem' }}>
          {assessment.description}
        </Content>
        <Content component={ContentVariants.p} style={{ marginTop: '0.25rem', fontSize: '0.875rem', opacity: 0.7 }}>
          Progress: {answeredCount} of {assessment.questions.length} questions answered
        </Content>
      </PageSection>

      <PageSection>
        {assessment.questions.map((q, i) => (
          <QuestionCard
            key={q.id}
            question={q}
            index={i}
            value={answers[q.id]}
            onChange={(score) => setAnswer(q.id, score)}
          />
        ))}

        <Button
          variant="primary"
          size="lg"
          isDisabled={!complete}
          onClick={() => navigate(`/assessments/${assessment.id}/results`)}
          style={{ marginTop: '1rem' }}
        >
          {complete ? 'View Results' : `Answer all questions to continue (${answeredCount}/${assessment.questions.length})`}
        </Button>
      </PageSection>
    </>
  );
}
