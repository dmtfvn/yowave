import { Socket } from 'socket.io';

import getSessionUserData from '../getSessionUserData';
import { redisClient } from '../../lib/resid';

import parseFriendListRedis from './parseFriendListRedis';

export default async function setUserRedis(socket: Socket) {
  const userData = getSessionUserData(socket);

  const username = userData.username;
  const userId = userData.userid;

  socket.join(userId);

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
    socket.to(friendRooms).emit('friendStatus', username, true);
  }

  socket.emit('friendList', parseFriendList);

  const chatData = await redisClient.lRange(
    `chat:${userId}`, 0, -1
  );

  const msgData = chatData.map(d => {
    const data = d.split(':');

    return {
      to: data[0],
      from: data[1],
      content: data[2],
    };
  });

  if (msgData && msgData.length) {
    socket.emit('messages', msgData);
  }
}
