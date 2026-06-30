import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly authenticated = signal(false);

  isAuthenticated(): boolean {
    return this.authenticated();
  }

  signIn(): void {
    this.authenticated.set(true);
  }

  signOut(): void {
    this.authenticated.set(false);
  }
}
