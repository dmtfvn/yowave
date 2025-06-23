import { Socket } from 'socket.io';

import { AuthorizedUserT } from '../types/request/AuthorizedUserT';
import { redisClient } from '../lib/resid';

export default function setUserRedis(socket: Socket) {
  const req = socket.request as AuthorizedUserT;

  if (req.session?.user) {
    req.user = { ...req.session.user };

    redisClient.hSet(`userid:${req.user.userData.username}`, {
      id: req.user.userData.userid,
    });

    console.log('Session:', req.session.user.userData.username)
    console.log('Socket id:', socket.id)
    console.log('Socket userid:', req.user.userData.userid)
  }
}
