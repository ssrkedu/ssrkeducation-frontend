import { MobileEnquireBarConfig } from '@ssrk/shared/ui';
import { buildTrustEnquiryUrl } from '../../../site-context/public-site-url.utils';

export function buildInstitutionMobileEnquireConfig(
  tenantKey: string | undefined,
): MobileEnquireBarConfig | null {
  const href = buildTrustEnquiryUrl(tenantKey);

  if (!href) {
    return null;
  }

  return {
    label: 'Enquire Now',
    href,
  };
}
