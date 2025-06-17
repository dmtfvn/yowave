import { Response } from 'express-serve-static-core';

export interface ResponseValidationT extends Response {
  message: string;
  errors: string[];
}
