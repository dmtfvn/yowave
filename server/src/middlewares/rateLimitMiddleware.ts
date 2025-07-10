import { Request, Response, NextFunction } from 'express-serve-static-core';

import { redisClient } from '../lib/redis';
import authErrorServer from '../utils/authErrorServer';

export const rateLimit = (
  count: number
) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const ip = req.socket.remoteAddress;

    if (!ip) return;

    const response = await redisClient.multi().incr(ip).expire(ip, 60).exec();
    if (Number(response[0]) > count) {
      const error = authErrorServer(new Error('Try again after one minute'), 429);

      res.status(error.code).json(error);

      return;
    }

    next();
  }
}
