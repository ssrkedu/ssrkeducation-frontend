import { inject, provideAppInitializer } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';
import { TokenStorage } from './token-storage';

export function provideAuthInit() {
  return provideAppInitializer(() => {
    const auth = inject(AuthService);
    const tokens = inject(TokenStorage);

    if (!tokens.getAccess()) {
      return Promise.resolve();
    }

    return firstValueFrom(auth.restoreSession()).then(() => undefined);
  });
}
