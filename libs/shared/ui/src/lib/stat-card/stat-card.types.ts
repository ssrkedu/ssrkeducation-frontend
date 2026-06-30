export type StatCardAccentPosition = 'suffix' | 'inline';

export type StatCardValueSize = 'default' | 'compact';

export interface StatCardData {
  value: string;
  label: string;
  accent?: string;
  accentPosition?: StatCardAccentPosition;
  valueSize?: StatCardValueSize;
}
