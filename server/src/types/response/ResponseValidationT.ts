import { Response } from 'express-serve-static-core';

export type ResponseValidationT = Response & {
  message: string;
  errors: string[];
};
