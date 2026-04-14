import type { Assessment } from '../types';
import { automationMaturity } from './automation-maturity';

const assessments: Assessment[] = [automationMaturity];

export function getAssessments(): Assessment[] {
  return assessments;
}

export function getAssessmentById(id: string): Assessment | undefined {
  return assessments.find((a) => a.id === id);
}
