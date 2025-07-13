import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

export default function handleJwtError(
  err: unknown
) {
  const error = {
    message: ''
  };

  if (err instanceof TokenExpiredError) {
    error.message = 'Token has expired';
  } else if (err instanceof JsonWebTokenError) {
    error.message = 'Invalid token';
  } else {
    error.message = 'Token verification error';
  }

  return error;
}
