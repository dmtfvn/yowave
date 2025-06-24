import { Socket } from 'socket.io';

import { AuthorizedUserT } from '../types/request/AuthorizedUserT';
import { redisClient } from '../lib/resid';

export default async function setUserRedis(socket: Socket) {
  const req = socket.request as AuthorizedUserT;

  if (req.session?.user) {
    req.user = { ...req.session.user };
  }

  const username = req.user.userData.username;

  await redisClient.hSet(`userid:${username}`, {
    id: req.user.userData.userid,
  });

  const friendList = await redisClient.lRange(
    `friends:${username}`, 0, -1
  );
  console.log(friendList)

  socket.emit('friends', friendList);

  console.log('Session:', req.user.userData.username)
  console.log('Socket id:', socket.id)
  console.log('Socket userid:', req.user.userData.userid)
}
