import { redisClient } from '../../lib/redis';

import { FriendIdSocketT } from '../../types/request/FriendIdSocketT';
import { UserDataT } from '../../types/user/UserDataT';

export default async function addFriendIdRedis({
  socket,
  id,
  callback
}: FriendIdSocketT): Promise<void> {
  const userData: UserDataT = socket.data.userData;

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

  if (friendId) {
    callback(friendId);
  }
}
