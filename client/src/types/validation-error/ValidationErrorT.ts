import { ValidationErrorDetailsT } from './ValidationErrorDetailsT';

export type ValidationErrorT = Error & {
  name: 'ValidationError';
  inner: ValidationErrorDetailsT[];
};
