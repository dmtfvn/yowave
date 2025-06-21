import { ExtendedError, Socket } from 'socket.io';
import { RequestSessionT } from '../types/request/RequestSessionT';

const authorizeUser = (
  socket: Socket,
  next: (err?: ExtendedError | undefined) => void
) => {
  const req = socket.request as RequestSessionT

  if (!req.session || !req.session.user?.userData.username) {
    console.log('Bad request')

    next(new Error('Not authorized'));
  } else {
    next();

    console.log('Good request')
  }
}

export default authorizeUser;
