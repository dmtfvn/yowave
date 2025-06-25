import { Socket } from 'socket.io';

import { UserDataT } from '../types/user/UserDataT';
import { AuthorizedUserT } from '../types/request/AuthorizedUserT';

export default function getSessionUserData(socket: Socket): UserDataT {
  const req = socket.request as AuthorizedUserT;

  if (req.session?.user) {
    req.user = { ...req.session.user };
  }

  const userData = req.user.userData;

  return userData;
}
