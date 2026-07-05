import { environment } from '../../../environments/environment';
import { LanguageResolutionDto } from './dtos/public-api.dtos';

export function logLanguageFallback(
  endpoint: string,
  language: LanguageResolutionDto,
): void {
  if (environment.production || !language.fallbackApplied) {
    return;
  }

  console.warn(
    `[PublicContent] Translation fallback for ${endpoint}`,
    {
      requested: language.requested,
      resolved: language.resolved,
      reason: language.fallbackReason,
    },
  );
}
