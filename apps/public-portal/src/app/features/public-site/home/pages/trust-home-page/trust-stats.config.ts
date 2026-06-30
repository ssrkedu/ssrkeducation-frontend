import { StatsBarConfig } from '@ssrk/shared/ui';

export const TRUST_STATS_BAR: StatsBarConfig = {
  ariaLabel: 'Key statistics',
  footnote:
    '*Scholarship availability depends on eligibility, course, and institution rules.',
  items: [
    { value: '2', label: 'Institutions' },
    {
      value: '100',
      accent: '%',
      accentPosition: 'suffix',
      label: 'Scholarship Available*',
    },
    {
      value: 'UG & +2',
      label: 'Programmes',
      valueSize: 'compact',
    },
    {
      value: '1',
      accent: 'Form',
      accentPosition: 'inline',
      label: 'For Admission Enquiry',
    },
  ],
};
