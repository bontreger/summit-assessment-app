import {
  Card,
  CardBody,
  CardTitle,
  ExpandableSection,
  Content,
  ContentVariants,
} from '@patternfly/react-core';
import type { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  index: number;
  value: number | undefined;
  onChange: (score: number) => void;
}

const ANCHOR_SCORES = [1, 3, 5];

export function QuestionCard({ question, index, value, onChange }: QuestionCardProps) {
  const activeDescriptor = value != null
    ? question.levelDescriptors.find((ld) => ld.score === value)
    : null;

  return (
    <Card isCompact style={{ marginBottom: '1rem' }}>
      <CardTitle>
        <span style={{ opacity: 0.6, marginRight: '0.5rem' }}>Q{index + 1}.</span>
        {question.title}
      </CardTitle>
      <CardBody>
        <Content component={ContentVariants.p} style={{ marginBottom: '1rem' }}>
          {question.prompt}
        </Content>

        <div className="score-selector">
          {Array.from({ length: 5 }, (_, i) => i + 1).map((n) => {
            const anchor = ANCHOR_SCORES.includes(n)
              ? question.levelDescriptors.find((ld) => ld.score === n)
              : null;

            return (
              <div key={n} className="score-btn-wrapper">
                <button
                  type="button"
                  className={`score-btn ${value === n ? 'score-btn--selected' : ''}`}
                  onClick={() => onChange(n)}
                  aria-label={`Score ${n}`}
                >
                  {n}
                </button>
                {anchor && (
                  <span className="score-anchor-label">{anchor.description}</span>
                )}
              </div>
            );
          })}
        </div>

        {activeDescriptor && (
          <Content
            component={ContentVariants.p}
            style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}
          >
            {activeDescriptor.description}
          </Content>
        )}

        <ExpandableSection
          toggleText="View all level descriptions"
          style={{ marginTop: '0.75rem' }}
        >
          <div className="level-markers" style={{ flexDirection: 'column' }}>
            {question.levelDescriptors.map((ld) => (
              <div
                key={ld.score}
                style={{
                  display: 'flex',
                  gap: '0.5rem',
                  alignItems: 'baseline',
                  opacity: value === ld.score ? 1 : 0.75,
                  fontWeight: value === ld.score ? 600 : 400,
                }}
              >
                <span style={{ minWidth: '1.5rem', textAlign: 'right', fontWeight: 600 }}>
                  {ld.score}
                </span>
                <span style={{ fontSize: '0.8125rem' }}>
                  &mdash; {ld.description}
                </span>
              </div>
            ))}
          </div>
        </ExpandableSection>
      </CardBody>
    </Card>
  );
}
