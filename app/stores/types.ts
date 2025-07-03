// Common API error interface for all endpoints
export interface ApiError {
  errorType: string;
  message: string;
}

// Common loading state interface
export interface LoadingState {
  loading: boolean;
  error: ApiError | null;
}

// Common API response interface
export interface ApiResponse<T> {
  data: T;
  success: boolean;
} 