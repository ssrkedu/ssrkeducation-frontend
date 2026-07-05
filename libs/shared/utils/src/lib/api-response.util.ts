import { ApiError, ApiResponse } from '@ssrk/shared/types';

export function unwrapApiResponse<T>(response: ApiResponse<T>): T {
  if (!response.success || response.data === undefined || response.data === null) {
    const message =
      response.error?.message ??
      response.message ??
      'The server returned an unexpected response.';
    throw new ApiResponseError(message, response.error);
  }

  return response.data;
}

export class ApiResponseError extends Error {
  readonly apiError?: ApiError | null;

  constructor(message: string, apiError?: ApiError | null) {
    super(message);
    this.name = 'ApiResponseError';
    this.apiError = apiError;
  }
}

export function toUserFacingError(error: unknown): string {
  if (error instanceof ApiResponseError) {
    return error.message;
  }

  if (typeof error === 'object' && error !== null && 'message' in error) {
    return String((error as ApiError).message);
  }

  return 'Something went wrong. Please try again.';
}
