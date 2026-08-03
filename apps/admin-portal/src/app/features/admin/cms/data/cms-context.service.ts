import { Injectable, computed, signal } from '@angular/core';

export type CmsContextSelection =
  | { kind: 'trust' }
  | { kind: 'institution'; institutionId: string };

export type CmsInstitutionTab = 'home' | 'chrome' | 'courses' | 'scholarships';

const STORAGE_KEY = 'ssrk.cms.context';
const TAB_STORAGE_KEY = 'ssrk.cms.institutionTab';

function readStoredSelection(): CmsContextSelection {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { kind: 'trust' };
    }

    const parsed = JSON.parse(raw) as CmsContextSelection;
    if (parsed?.kind === 'institution' && typeof parsed.institutionId === 'string') {
      return parsed;
    }
  } catch {
    // ignore bad storage
  }

  return { kind: 'trust' };
}

function readStoredInstitutionTab(): CmsInstitutionTab {
  try {
    const raw = sessionStorage.getItem(TAB_STORAGE_KEY);
    if (
      raw === 'home' ||
      raw === 'chrome' ||
      raw === 'courses' ||
      raw === 'scholarships'
    ) {
      return raw;
    }
  } catch {
    // ignore
  }

  return 'home';
}

@Injectable({ providedIn: 'root' })
export class CmsContextService {
  private readonly selection = signal<CmsContextSelection>(readStoredSelection());
  private readonly institutionTabSignal = signal<CmsInstitutionTab>(readStoredInstitutionTab());

  readonly context = this.selection.asReadonly();
  readonly institutionTab = this.institutionTabSignal.asReadonly();

  readonly isTrust = computed(() => this.selection().kind === 'trust');

  readonly selectedInstitutionId = computed(() => {
    const current = this.selection();
    return current.kind === 'institution' ? current.institutionId : null;
  });

  selectTrust(): void {
    this.persist({ kind: 'trust' });
  }

  selectInstitution(institutionId: string): void {
    this.persist({ kind: 'institution', institutionId });
  }

  setInstitutionTab(tab: CmsInstitutionTab): void {
    this.institutionTabSignal.set(tab);
    try {
      sessionStorage.setItem(TAB_STORAGE_KEY, tab);
    } catch {
      // ignore
    }
  }

  private persist(next: CmsContextSelection): void {
    this.selection.set(next);
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore quota / private mode
    }
  }
}
