export const API_ROUTES = {
  public: {
    trust: {
      home: '/api/public/trust/home',
    },
  },
} as const;

export function buildApiUrl(path: string): string {
  return path;
}
