import { Socket } from 'socket.io';

import getCookieUserData from '../getCookieUserData';
import { redisClient } from '../../lib/redis';

import parseFriendListRedis from './parseFriendListRedis';

export default async function clearUserRedis(socket: Socket) {
  const userData = getCookieUserData(socket);

  const username = userData.username;

  await redisClient.hSet(
    `userid:${username}`,
    {
      online: 'false',
    }
  );

  const friendList = await redisClient.lRange(
    `friends:${username}`, 0, -1
  );

  const friendRooms = await parseFriendListRedis(friendList).then((friends) => {
    return friends.map(f => f.id);
  });

  socket.to(friendRooms).emit('friendStatus', username, false);
}
