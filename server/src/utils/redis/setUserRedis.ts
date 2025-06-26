import { Socket } from 'socket.io';

import getSessionUserData from '../getSessionUserData';
import { redisClient } from '../../lib/resid';

import parseFriendListRedis from './parseFriendListRedis';

export default async function setUserRedis(socket: Socket) {
  const userData = getSessionUserData(socket);

  socket.join(userData.userid);

  const username = userData.username;

  await redisClient.hSet(
    `userid:${username}`,
    {
      id: userData.userid,
      online: 'true',
    }
  );

  const friendList = await redisClient.lRange(
    `friends:${username}`, 0, -1
  );

  const parseFriendList = await parseFriendListRedis(friendList);
  const friendRooms = parseFriendList.map(f => f.id);

  if (friendRooms.length) {
    socket.to(friendRooms).emit('status', true, username);
  }

  socket.emit('friends', parseFriendList);
}
