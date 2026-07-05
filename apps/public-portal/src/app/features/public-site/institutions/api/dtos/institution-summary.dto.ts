export interface InstitutionSummaryDto {
  id: string;
  code: string;
  slug: string;
  subdomain: string;
  name: string;
  shortName: string | null;
  description: string | null;
  logoUrl: string | null;
  primaryColor: string | null;
  coursesLine: string | null;
  programsLine: string | null;
  iconKey: string | null;
  iconBackgroundColor: string | null;
  iconStrokeColor: string | null;
  sortOrder: number;
  href: string;
}
