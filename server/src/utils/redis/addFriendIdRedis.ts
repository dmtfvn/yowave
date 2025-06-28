import { FriendIdSocketT } from '../../types/request/FriendIdSocketT';

import getSessionUserData from '../getSessionUserData';
import { redisClient } from '../../lib/resid';

export default async function addFriendIdRedis({
  socket,
  id,
  callback
}: FriendIdSocketT): Promise<void> {
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

  if (friendId) {
    callback(friendId);
  }
}
