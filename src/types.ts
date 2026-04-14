export type DomainKey = 'productUsage' | 'performance' | 'proficiency' | 'perception';

export type DomainWeights = Partial<Record<DomainKey, number>>;

export interface LevelDescriptor {
  score: number;
  label: string;
  description: string;
}

export interface Question {
  id: string;
  title: string;
  prompt: string;
  levelDescriptors: LevelDescriptor[];
}

export interface DomainMeta {
  key: DomainKey;
  label: string;
  pptDimension: string;
}

export interface AdvancementAction {
  levelRange: [number, number];
  label: string;
  actions: string[];
}

export interface DomainAdvancement {
  domain: DomainKey;
  guidance: AdvancementAction[];
}

export interface ScoringMatrixThread {
  name: string;
  /** 5 cells for levels 1-5. null means the thread doesn't apply at that level. */
  cells: (string | null)[];
}

export interface DomainScoringMatrix {
  domainLabel: string;
  threads: ScoringMatrixThread[];
}

export interface Assessment {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  domains: DomainMeta[];
  questions: Question[];
  /** questionId -> { productUsage: 1.0, performance: 0.5, ... } */
  domainWeights: Record<string, DomainWeights>;
  scoringMatrix: Record<DomainKey, DomainScoringMatrix>;
  advancement: DomainAdvancement[];
}

export type Answers = Record<string, number>;

export interface DomainScore {
  domain: DomainKey;
  label: string;
  /** Score on a 1-5 scale */
  score: number;
  maturityLevel: string;
}
