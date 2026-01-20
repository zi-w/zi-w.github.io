export enum EntityType {
  EXPLICIT = 'EXPLICIT',
  IMPLICIT = 'IMPLICIT',
  BACKGROUND = 'BACKGROUND'
}

export interface AttributeDistribution {
  value: string;
  probability: number;
}

export interface EntityAttribute {
  name: string;
  distribution: AttributeDistribution[];
  lockedValue?: string; // If the user has clarified this
}

export interface BeliefNode {
  id: string;
  label: string;
  type: EntityType;
  probability: number; // Existence probability
  attributes: EntityAttribute[];
}

export interface QuestOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface QuestProblem {
  id: string;
  domain: 'Math' | 'Logic' | 'Planning';
  context: string;
  underspecifiedPart: string;
  options: QuestOption[];
}
