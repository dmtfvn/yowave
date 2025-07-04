import { ExtendedError, Socket } from 'socket.io';

import { AuthorizedUserT } from '../types/request/AuthorizedUserT';

const authorizeUser = (
  socket: Socket,
  next: (err?: ExtendedError | undefined) => void
) => {
  const req = socket.request.headers.cookie;

  const token = req?.split('=')[1];

  if (!token) {
    next(new Error('Not authorized'));
  } else {
    next();
  }
}

export default authorizeUser;
