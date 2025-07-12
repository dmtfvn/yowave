import { Socket } from 'socket.io';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

import { verifyToken } from '../utils/jwt';

const access = process.env.JWT_ACCESS_SECRET as string;

const authorizeUser = (
  socket: Socket,
  next: (err?: Error | undefined) => void
) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    next(new Error('Not authorized'));
    return;
  }

  try {
    const tokenData = verifyToken(token, access);

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
