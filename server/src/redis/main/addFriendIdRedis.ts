import { redisClient } from '../../lib/redis';

import getFriendId from '../sub-main/getFriendId';
import emitStoreError from '../utils/emitStoreError';

import { FriendIdSocketT } from '../../types/request/FriendIdSocketT';
import { UserDataT } from '../../types/user/UserDataT';

export default async function addFriendIdRedis({
  socket,
  id,
  callback
}: FriendIdSocketT) {
  const userData: UserDataT = socket.data.userData;

  const username = userData.username;

  try {
    await redisClient.hSet(
      `userid:${username}`,
      {
        friendId: id,
      }
    );

    const friendId = await getFriendId(username);

    if (friendId) {
      callback(friendId);
    }
  } catch (err: unknown) {
    emitStoreError(socket, err);
  }
}
