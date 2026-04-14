import { createContext, useCallback, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Answers } from '../types';

interface AssessmentState {
  answers: Answers;
  setAnswer: (questionId: string, score: number) => void;
  resetAnswers: () => void;
}

const AssessmentContext = createContext<AssessmentState | null>(null);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<Answers>({});

  const setAnswer = useCallback((questionId: string, score: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
  }, []);

  const resetAnswers = useCallback(() => {
    setAnswers({});
  }, []);

  return (
    <AssessmentContext.Provider value={{ answers, setAnswer, resetAnswers }}>
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment(): AssessmentState {
  const ctx = useContext(AssessmentContext);
  if (!ctx) throw new Error('useAssessment must be used inside AssessmentProvider');
  return ctx;
}
