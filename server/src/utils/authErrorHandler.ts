import { ValidationError } from 'yup';

import { AuthErrorT } from '../types/response/AuthErrorT';
import { FailedQueryT } from '../types/response/FailedQueryT';
import { ResponseErrorT } from '../types/response/ResponseErrorT';

export default function authErrorHandler(
  err: unknown,
  statusCode: number
) {
  const resError: ResponseErrorT = {
    code: 400,
    body: { loggedIn: false } as FailedQueryT
  };

  if (err instanceof Error && 'errorData' in err) {
    const authError = err as AuthErrorT;

    resError.code = statusCode;
    resError.body.status = authError.errorData.status;
  } else if (err instanceof Error) {
    resError.body.status = err.message;
  } else if (err instanceof ValidationError) {
    resError.code = 422;
    resError.body.status = err.errors[0];
  } else {
    resError.body.status = 'Unknown error';
  }

  return resError;
}
