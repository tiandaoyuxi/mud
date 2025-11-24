export enum AttributeType {
  INTELLIGENCE = 'Intelligence', // 悟性
  STRENGTH = 'Strength', // 力量
  AGILITY = 'Agility', // 敏捷
  CHIVALRY = 'Chivalry', // 侠义
  LIFESPAN = 'Lifespan', // 寿命
  LUCK = 'Luck', // 福源
}

export enum FactionType {
  ORTHODOX = 'Orthodox', // 正派
  EVIL = 'Evil', // 邪派
  NEUTRAL = 'Neutral', // 中立
}

export type Language = 'en' | 'zh';

export interface LocalizedString {
  en: string;
  zh: string;
}

export interface Attributes {
  [AttributeType.INTELLIGENCE]: number;
  [AttributeType.STRENGTH]: number;
  [AttributeType.AGILITY]: number;
  [AttributeType.CHIVALRY]: number;
  [AttributeType.LIFESPAN]: number;
  [AttributeType.LUCK]: number;
}

export interface Skill {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  type: 'Internal' | 'External' | 'Lightness' | 'Special';
  damageModifier: number;
  tier: 'Standard' | 'Special';
}

export interface Faction {
  id: string;
  name: LocalizedString;
  type: FactionType;
  description: LocalizedString;
  requirements: Partial<Attributes>;
  standardSkills: string[]; // Skill IDs
  specialSkills: string[]; // Skill IDs
  internalAffinity: Partial<Attributes>; // Bonus growth rates
}

export interface Item {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  type: 'consumable' | 'equipment' | 'misc';
  value: number; // For selling
  effects?: {
    hpRestore?: number;
    staminaRestore?: number;
    innerBreathRestore?: number;
    attrBuff?: Partial<Attributes>;
  };
}

export interface Job {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  reqAttribute: AttributeType;
  reqValue: number;
  staminaCost: number;
  goldReward: number;
  difficulty: number; // 0-100 modifier for success chance
}

export interface GameEvent {
  id: string;
  name: LocalizedString;
  type: 'interaction' | 'combat' | 'exploration' | 'item' | 'work';
  successFormula: (attrs: Attributes) => number; // Returns 0-1 probability
  trigger: string;
}

export interface Player {
  name: string;
  attributes: Attributes;
  factionId: string | null;
  skills: string[]; // Skill IDs
  
  // Derived Stats
  currentHp: number;
  maxHp: number;
  currentStamina: number;
  maxStamina: number;
  currentInnerBreath: number;
  maxInnerBreath: number;

  location: string;
  inventory: Item[];
  gold: number;
}

export interface GameLogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'combat' | 'event' | 'system' | 'narrative' | 'item' | 'gain' | 'error';
}

export interface LocationData {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  type: string;
  connectedTo: string[];
  weather: LocalizedString;
  events: string[];
}