import { redisClient } from '../../lib/redis';

export default async function setUserOnline(
  username: string,
  userId: string
) {
  await redisClient.hSet(
    `userid:${username}`,
    {
      id: userId,
      online: 'true'
    }
  );
}
