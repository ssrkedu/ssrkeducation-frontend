import { SiteLanguage } from '../site-context/site-language.service';

export type ApiLanguageCode = 'en' | 'or';

export function toApiLanguage(language: SiteLanguage): ApiLanguageCode {
  return language === 'od' ? 'or' : 'en';
}

export function fromApiLanguage(code: string): SiteLanguage {
  return code === 'or' ? 'od' : 'en';
}
