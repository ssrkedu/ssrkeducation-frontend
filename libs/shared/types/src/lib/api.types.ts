export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: ApiError | null;
}

export interface ApiError {
  message: string;
  code?: string;
  fieldErrors?: Record<string, string[]>;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
}
