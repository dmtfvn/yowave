import { redisClient } from '../../lib/redis';

export default async function getFriendId(
  username: string
): Promise<string | undefined> {
  try {
    const friendId = await redisClient.hGet(
      `userid:${username}`, 'friendId'
    );

    if (friendId) {
      return friendId;
    }
  } catch (err) {
    throw err;
  }
}
