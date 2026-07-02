import { Injectable, signal } from '@angular/core';

export type SiteLanguage = 'en' | 'od';

const STORAGE_KEY = 'ssrk-site-lang';

@Injectable({ providedIn: 'root' })
export class SiteLanguageService {
  readonly language = signal<SiteLanguage>(this.readStoredLanguage());

  constructor() {
    document.documentElement.lang = this.language() === 'od' ? 'or' : 'en';
  }

  setLanguage(language: SiteLanguage): void {
    this.language.set(language);
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language === 'od' ? 'or' : 'en';
  }

  private readStoredLanguage(): SiteLanguage {
    const stored = localStorage.getItem(STORAGE_KEY);

    return stored === 'od' ? 'od' : 'en';
  }
}
