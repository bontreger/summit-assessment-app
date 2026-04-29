export type DomainKey = 'governance' | 'platform' | 'devopsSkills' | 'useCases';

export interface LevelDescriptor {
  score: number;
  label: string;
  description: string;
}

export interface Question {
  id: string;
  domain: DomainKey;
  title: string;
  prompt: string;
  levelDescriptors: LevelDescriptor[];
}

export interface DomainMeta {
  key: DomainKey;
  label: string;
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
