/** Generic wrapper for all backend API responses */
export interface ApiResponse<T = unknown> {
  success: boolean;
  error?: string;
  data?: T;
}

/** Error shape returned by the Flask backend */
export interface ApiError {
  success: false;
  error: string;
}
