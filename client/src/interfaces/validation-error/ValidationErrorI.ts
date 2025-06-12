import { ValidationErrorDetailsI } from './ValidationErrorDetailsI';

export interface ValidationErrorI extends Error {
  name: 'ValidationError';
  inner: ValidationErrorDetailsI[];
}
