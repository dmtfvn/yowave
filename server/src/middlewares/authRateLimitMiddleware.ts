import { Request, Response, NextFunction } from 'express-serve-static-core';

import { redisClient } from '../lib/resid';

export const authRateLimit = (count: number) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const ip = req.socket.remoteAddress;

    if (!ip) {
      console.log('No user ip')
      return;
    }

    const response = await redisClient.multi().incr(ip).expire(ip, 60).exec();
    if (Number(response[0]) > count) {
      res.status(429).send({ message: 'Try again after one minute' });
      return;
    }

    console.log('Redis', response[0])

    next();
  }
}
