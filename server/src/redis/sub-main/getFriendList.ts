import { redisClient } from '../../lib/redis';

export default async function getFriendList(
  username: string
): Promise<string[]> {
  const friendList = await redisClient.lRange(
    `friends:${username}`, 0, -1
  );

  return friendList || [];
}
