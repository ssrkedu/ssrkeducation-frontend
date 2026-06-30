import { StatCardData } from '../stat-card/stat-card.types';

export interface StatsBarConfig {
  items: StatCardData[];
  footnote?: string;
  ariaLabel?: string;
}
