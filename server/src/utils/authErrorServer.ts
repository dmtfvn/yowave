import { ValidationError } from 'yup';

import { FailedAuthUserT } from '../types/response/FailedAuthUserT';

export default function authErrorServer(
  err: unknown,
  statusCode: number
) {
  const resError: FailedAuthUserT = {
    code: 400,
    error: ''
  };

  if (err instanceof Error) {
    resError.code = statusCode;
    resError.error = err.message;
  } else if (err instanceof ValidationError) {
    resError.code = 422;
    resError.error = err.errors[0];
  } else {
    resError.error = 'Unknown error occurred';
  }

  return resError;
}
