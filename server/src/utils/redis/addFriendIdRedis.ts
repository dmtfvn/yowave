import { Socket } from 'socket.io';

import getSessionUserData from '../getSessionUserData';
import { redisClient } from '../../lib/resid';

type FriendSocketIdT = {
  socket: Socket;
  id: string;
  callback: (res: string) => void;
};

export default async function addFriendIdRedis({
  socket,
  id,
  callback
}: FriendSocketIdT) {
  const userData = getSessionUserData(socket);

  const username = userData.username;

  await redisClient.hSet(
    `userid:${username}`,
    {
      friendId: id,
    }
  );

  const friendId = await redisClient.hGet(
    `userid:${username}`, 'friendId'
  );
  console.log(friendId)

  if (friendId) {
    console.log('Id send to the client')
    callback(friendId);
  }
}
