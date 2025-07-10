import { redisClient } from '../../lib/redis';

export default async function setUserOffline(
  username: string
) {
  await redisClient.hSet(
    `userid:${username}`,
    {
      online: 'false'
    }
  );
}
