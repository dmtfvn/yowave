import { Socket } from 'socket.io';

import { redisClient } from '../../lib/redis';
import getFriendList from '../sub-main/getFriendList';
import emitStoreError from '../utils/emitStoreError';

import { UserDataT } from '../../types/user/UserDataT';

export default async function rmFriendRedis(
  socket: Socket,
  data: string
) {
  const userData: UserDataT = socket.data.userData;

  const username = userData.username;

  try {
    const friendList = await getFriendList(username);

    if (!friendList.length) {
      socket.emit('friendList', friendList);
      return;
    }

    const friendToRemove = friendList.find(f => f.endsWith(data));

    if (friendToRemove) {
      await redisClient.lRem(
        `friends:${username}`, 1, friendToRemove
      );

      await redisClient.hDel(
        `userid:${username}`, 'friendId'
      );

      const curFriendList = await getFriendList(username);
      socket.emit('friendList', curFriendList);
    }
  } catch (err: unknown) {
    emitStoreError(socket, err);
  }
}
