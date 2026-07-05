export type TrustInstitutionIconVm = 'degree' | 'junior-college';

export interface TrustInstitutionCardVm {
  name: string;
  coursesLine: string;
  programsLine?: string;
  href: string;
  linkLabel?: string;
  icon: TrustInstitutionIconVm;
  iconBackgroundColor: string;
  iconStrokeColor: string;
}

export interface TrustInstitutionsSectionContentVm {
  sectionLabel: string;
  title: string;
  titleAccent?: string;
  description: string;
  cards: TrustInstitutionCardVm[];
}

export interface TrustInstitutionCardPresentationVm {
  coursesLine: string;
  programsLine?: string;
  icon: TrustInstitutionIconVm;
  iconBackgroundColor: string;
  iconStrokeColor: string;
  tenantKey: string;
}
