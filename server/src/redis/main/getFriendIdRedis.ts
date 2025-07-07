import { Socket } from 'socket.io';

import { redisClient } from '../../lib/redis';
import emitStoreError from '../utils/emitStoreError';

import { UserDataT } from '../../types/user/UserDataT';

export default async function getFriendIdRedis(
  socket: Socket
) {
  const userData: UserDataT = socket.data.userData;

  const username = userData.username;

  try {
    const friendId = await redisClient.hGet(
      `userid:${username}`, 'friendId'
    );

    if (friendId) {
      socket.emit('getFriendId', friendId);
    }
  } catch (err: unknown) {
    emitStoreError(socket, err);
  }
}
