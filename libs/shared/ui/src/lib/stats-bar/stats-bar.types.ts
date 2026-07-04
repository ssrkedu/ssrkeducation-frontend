export type StatCardAccentPosition = 'suffix' | 'inline';

export type StatCardValueSize = 'default' | 'compact' | 'icon';

export interface StatCardData {
  value: string;
  label: string;
  description?: string;
  accent?: string;
  accentPosition?: StatCardAccentPosition;
  valueSize?: StatCardValueSize;
}

export interface StatsBarConfig {
  items: StatCardData[];
  footnote?: string;
  ariaLabel?: string;
}
