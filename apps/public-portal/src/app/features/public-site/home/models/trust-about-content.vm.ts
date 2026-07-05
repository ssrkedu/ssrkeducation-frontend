export interface TrustAboutContentVm {
  sectionLabel: string;
  title: string;
  description: string;
  highlights: string[];
  cta: { label: string; href: string };
  founder: {
    quote: string;
    name: string;
    role: string;
    avatarInitial: string;
    badge: string;
    badgeNote: string;
  };
}
