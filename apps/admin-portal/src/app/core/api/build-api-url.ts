import { environment } from '../../../environments/environment';

export const API_BASE_URL = environment.apiBaseUrl;

export function buildApiUrl(
  path: string,
  pathParams?: Record<string, string | number>,
): string {
  let segment = path.startsWith('/') ? path.slice(1) : path;

  if (pathParams) {
    segment = segment.replace(/{(\w+)}/g, (_, key: string) => {
      const value = pathParams[key];
      if (value === undefined) {
        throw new Error(`Missing path parameter: ${key}`);
      }
      return encodeURIComponent(String(value));
    });
  }

  const base = API_BASE_URL.replace(/\/$/, '');
  return `${base}/${segment}`;
}
