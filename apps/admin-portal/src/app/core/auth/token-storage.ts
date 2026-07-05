import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenStorage {
  private readonly accessKey = 'ssrk.admin.access';
  private readonly refreshKey = 'ssrk.admin.refresh';

  getAccess(): string | null {
    return localStorage.getItem(this.accessKey);
  }

  getRefresh(): string | null {
    return localStorage.getItem(this.refreshKey);
  }

  setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.accessKey, accessToken);
    localStorage.setItem(this.refreshKey, refreshToken);
  }

  clear(): void {
    localStorage.removeItem(this.accessKey);
    localStorage.removeItem(this.refreshKey);
  }
}
