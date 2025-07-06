import { ExtendedError, Socket } from 'socket.io';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

import { verifyToken } from '../utils/jwt';

const authorizeUser = (
  socket: Socket,
  next: (err?: ExtendedError | undefined) => void
) => {
  const req = socket.request.headers.cookie;

  const token = req?.split('=')[1];

  if (!token) {
    next(new Error('Not authorized'));
    return;
  }

  try {
    const tokenData = verifyToken(token);

    socket.data.userData = tokenData.userData;

    next();
  } catch (err: unknown) {
    if (err instanceof TokenExpiredError) {
      next(new Error('Token has expired'));
    } else if (err instanceof JsonWebTokenError) {
      next(new Error('Invalid token'));
    } else {
      next(new Error('Token verification error'));
    }
  }
}

export default authorizeUser;
