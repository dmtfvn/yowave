import { redisClient } from '../../lib/redis';

export default async function setUserOffline(
  username: string
) {
  try {
    await redisClient.hSet(
      `userid:${username}`,
      {
        online: 'false',
      }
    );
  } catch (err) {
    throw err;
  }
}
