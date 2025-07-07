import { redisClient } from '../../lib/redis';

export default async function getFriendList(
  username: string
): Promise<string[]> {
  try {
    const friendList = await redisClient.lRange(
      `friends:${username}`, 0, -1
    );

    return friendList || [];
  } catch (err) {
    throw err;
  }
}
