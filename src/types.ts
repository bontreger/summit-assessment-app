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

export interface AdvancementDetail {
  foundation: string;
  actions: string[];
  goals: string;
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
  /** One concise label per domain per maturity level (5 entries, index 0 = level 1). */
  maturityModel: Record<DomainKey, string[]>;
  scoringMatrix: Record<DomainKey, DomainScoringMatrix>;
  advancement: DomainAdvancement[];
  /** 5 entries per domain (index 0 = level 1): foundation, actions, and goals. */
  advancementDetail: Record<DomainKey, AdvancementDetail[]>;
}

export type Answers = Record<string, number>;

export interface DomainScore {
  domain: DomainKey;
  label: string;
  /** Score on a 1-5 scale */
  score: number;
  maturityLevel: string;
}
