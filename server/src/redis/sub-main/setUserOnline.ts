import { redisClient } from '../../lib/redis';

export default async function setUserOnline(
  username: string,
  userId: string
) {
  try {
    await redisClient.hSet(
      `userid:${username}`,
      {
        id: userId,
        online: 'true',
      }
    );
  } catch (err) {
    throw err;
  }
}
