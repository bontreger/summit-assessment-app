import type { Answers, Assessment, DomainKey, DomainScore } from '../types';

const MATURITY_LABELS: [number, string][] = [
  [1, 'Initial'],
  [2, 'Developing'],
  [3, 'Operational'],
  [4, 'Optimizing'],
  [5, 'Innovator'],
];

export function getMaturityLabel(score: number): string {
  let label = 'Initial';
  for (const [threshold, l] of MATURITY_LABELS) {
    if (score >= threshold) label = l;
  }
  return label;
}

export function computeDomainScores(
  assessment: Assessment,
  answers: Answers,
): DomainScore[] {
  return assessment.domains.map(({ key, label }) => {
    const domainQuestions = assessment.questions.filter((q) => q.domain === key);
    const answered = domainQuestions.filter((q) => answers[q.id] != null);

    const rawAvg =
      answered.length > 0
        ? answered.reduce((sum, q) => sum + answers[q.id], 0) / answered.length
        : 0;

    const score = Math.round(rawAvg * 10) / 10;

    return {
      domain: key,
      label,
      score,
      maturityLevel: getMaturityLabel(score),
    };
  });
}

export function getAdvancementGuidance(
  assessment: Assessment,
  domainKey: DomainKey,
  score: number,
) {
  const domainAdvancement = assessment.advancement.find(
    (a) => a.domain === domainKey,
  );
  if (!domainAdvancement) return null;

  const idx = Math.min(Math.ceil(score), 5) - 1;
  return domainAdvancement.guidance[idx]
    ?? domainAdvancement.guidance[domainAdvancement.guidance.length - 1];
}

export function isAssessmentComplete(
  assessment: Assessment,
  answers: Answers,
): boolean {
  return assessment.questions.every((q) => answers[q.id] != null);
}

export function getHighlightedColumns(score: number): number[] {
  return [Math.max(0, Math.floor(score) - 1)];
}
