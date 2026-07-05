export interface AdminAppEnvironment {
  name: 'local' | 'dev' | 'qa' | 'uat' | 'production';
  production: boolean;
  apiBaseUrl: string;
}
