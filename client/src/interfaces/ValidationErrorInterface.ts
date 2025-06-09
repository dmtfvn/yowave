export interface ValidationErrorDetails {
  path: string;
  message: string;
}

export interface ValidationError extends Error {
  name: 'ValidationError';
  inner: ValidationErrorDetails[];
}
