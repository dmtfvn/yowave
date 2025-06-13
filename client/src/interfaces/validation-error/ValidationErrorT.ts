import { ValidationErrorDetailsT } from './ValidationErrorDetailsT';

export interface ValidationErrorT extends Error {
  name: 'ValidationError';
  inner: ValidationErrorDetailsT[];
}
