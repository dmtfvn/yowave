import { ExtendedError, Socket } from 'socket.io';

import { AuthorizedUserT } from '../types/request/AuthorizedUserT';

const authorizeUser = (
  socket: Socket,
  next: (err?: ExtendedError | undefined) => void
) => {
  const req = socket.request as AuthorizedUserT;

  if (!req.session || !req.session.user?.userData.username) {
    next(new Error('Not authorized'));
  } else {
    next();
  }
}

export default authorizeUser;
