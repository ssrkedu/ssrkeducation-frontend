import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SKIP_AUTH } from './auth-context';
import { TokenStorage } from './token-storage';

function isAdminApiRequest(url: string): boolean {
  const apiBase = environment.apiBaseUrl.replace(/\/$/, '');
  return url.startsWith(apiBase) || url.startsWith('/api/');
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (!isAdminApiRequest(req.url) || req.context.get(SKIP_AUTH)) {
    return next(req);
  }

  const access = inject(TokenStorage).getAccess();
  if (!access) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: { Authorization: `Bearer ${access}` },
    }),
  );
};
