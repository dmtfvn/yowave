import { redisClient } from '../../lib/redis';

export default async function getUserId(
  name: string
): Promise<string | null> {
  try {
    const friendId = await redisClient.hGet(
      `userid:${name}`, 'id'
    );

    return friendId;
  } catch (err) {
    throw err;
  }
}
