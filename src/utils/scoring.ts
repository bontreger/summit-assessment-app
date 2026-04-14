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
    let weightedSum = 0;
    let totalWeight = 0;

    for (const q of assessment.questions) {
      const w = assessment.domainWeights[q.id]?.[key] ?? 0;
      if (w > 0 && answers[q.id] != null) {
        weightedSum += answers[q.id] * w;
        totalWeight += w;
      }
    }

    const score = totalWeight > 0
      ? Math.round((weightedSum / totalWeight) * 10) / 10
      : 0;

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

/**
 * Returns the column indices (0-based) that should be highlighted for a given 1-5 score.
 * If the score is close to an integer, highlight one column.
 * If it falls well between two, highlight both.
 */
export function getHighlightedColumns(score: number): number[] {
  const floor = Math.floor(score);
  const ceil = Math.ceil(score);
  const frac = score - floor;

  if (floor === ceil || frac < 0.3) {
    return [Math.max(0, Math.round(score) - 1)];
  }
  if (frac > 0.7) {
    return [Math.max(0, ceil - 1)];
  }
  return [Math.max(0, floor - 1), Math.min(4, ceil - 1)];
}
