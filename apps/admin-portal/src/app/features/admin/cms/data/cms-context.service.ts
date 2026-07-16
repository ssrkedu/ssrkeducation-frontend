import { Injectable, computed, signal } from '@angular/core';

export type CmsContextSelection =
  | { kind: 'trust' }
  | { kind: 'institution'; institutionId: string };

@Injectable({ providedIn: 'root' })
export class CmsContextService {
  private readonly selection = signal<CmsContextSelection>({ kind: 'trust' });

  readonly context = this.selection.asReadonly();

  readonly isTrust = computed(() => this.selection().kind === 'trust');

  readonly selectedInstitutionId = computed(() => {
    const current = this.selection();
    return current.kind === 'institution' ? current.institutionId : null;
  });

  selectTrust(): void {
    this.selection.set({ kind: 'trust' });
  }

  selectInstitution(institutionId: string): void {
    this.selection.set({ kind: 'institution', institutionId });
  }
}
