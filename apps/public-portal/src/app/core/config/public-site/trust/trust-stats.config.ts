// FALLBACK-PHASE: static content kept for content-fallback plan.

import { StatsBarConfig } from '@ssrk/shared/ui';

export const TRUST_STATS_BAR: StatsBarConfig = {
  ariaLabel: 'Why choose SSRK',
  items: [
    {
      value: '🎓',
      label: 'Quality Education',
      description: 'Experienced faculty and outcome-focused learning.',
      valueSize: 'icon',
    },
    {
      value: '📚',
      label: 'Diverse Courses',
      description: '+2, +3 and career-oriented programs across multiple disciplines.',
      valueSize: 'icon',
    },
    {
      value: '💰',
      label: 'Scholarships Available',
      description:
        'Government scholarships and institutional support to support their dreams.',
      valueSize: 'icon',
    },
    {
      value: '🤝',
      label: 'Student Support',
      description: 'Expert guidance for admissions, courses and career success.',
      valueSize: 'icon',
    },
  ],
};
