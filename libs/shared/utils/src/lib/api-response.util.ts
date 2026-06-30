import { ApiError, ApiResponse } from '@ssrk/shared/types';

export function unwrapApiResponse<T>(response: ApiResponse<T>): T {
  return response.data;
}

export function toUserFacingError(error: unknown): string {
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return String((error as ApiError).message);
  }

  return 'Something went wrong. Please try again.';
}
