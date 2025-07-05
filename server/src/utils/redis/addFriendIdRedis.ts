import { FriendIdSocketT } from '../../types/request/FriendIdSocketT';

import getCookieUserData from '../getCookieUserData';
import { redisClient } from '../../lib/redis';

export default async function addFriendIdRedis({
  socket,
  id,
  callback
}: FriendIdSocketT): Promise<void> {
  const userData = getCookieUserData(socket);

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
