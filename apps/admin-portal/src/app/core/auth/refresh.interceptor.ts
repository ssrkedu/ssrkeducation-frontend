import {
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { SKIP_AUTH } from './auth-context';
import { AuthService } from './auth.service';
import { TokenStorage } from './token-storage';

let refreshing = false;
const refreshed$ = new BehaviorSubject<string | null>(null);

export function cancelInFlightRefresh(): void {
  refreshing = false;
  refreshed$.next(null);
}

export const refreshInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const tokens = inject(TokenStorage);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401 || req.context.get(SKIP_AUTH)) {
        return throwError(() => error);
      }

      if (!refreshing) {
        refreshing = true;
        refreshed$.next(null);

        return auth.refresh().pipe(
          switchMap((tokenPair) => {
            tokens.setTokens(tokenPair.accessToken, tokenPair.refreshToken);
            refreshing = false;
            refreshed$.next(tokenPair.accessToken);

            return next(
              req.clone({
                setHeaders: { Authorization: `Bearer ${tokenPair.accessToken}` },
              }),
            );
          }),
          catchError((refreshError) => {
            refreshing = false;
            auth.hardLogout();
            return throwError(() => refreshError);
          }),
        );
      }

      return refreshed$.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap((token) =>
          next(
            req.clone({
              setHeaders: { Authorization: `Bearer ${token}` },
            }),
          ),
        ),
      );
    }),
  );
};
