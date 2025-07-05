import { createClient } from 'redis';

import 'dotenv/config';

export const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on('error', (err: unknown) => {
  if (err instanceof Error) {
    console.log('Redis Client Error:', err.message)
  } else {
    console.log('Redis Client Error:', err)
  }
});

redisClient.connect();
