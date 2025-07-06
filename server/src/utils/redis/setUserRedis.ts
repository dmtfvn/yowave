import { Socket } from 'socket.io';

import { redisClient } from '../../lib/redis';
import parseFriendListRedis from './parseFriendListRedis';

import { UserDataT } from '../../types/user/UserDataT';

export default async function setUserRedis(socket: Socket) {
  const userData: UserDataT = socket.data.userData;

  const username = userData.username;
  const userId = userData.userid;

  socket.join(userId);

  await redisClient.hSet(
    `userid:${username}`,
    {
      id: userId,
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
    const data = d.split('<{~}>');

    return {
      to: data[0],
      from: data[1],
      id: data[2],
      content: data[3],
    };
  });

  if (msgData && msgData.length) {
    socket.emit('messages', msgData);
  }
}
