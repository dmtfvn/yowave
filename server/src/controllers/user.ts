import { Router } from 'express';
import { Request, Response } from 'express-serve-static-core';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

import { verifyToken } from '../utils/jwt';
import { cookieOptions } from '../config/cookieOptions';

const cookieName = process.env.AUTH_COOKIE as string;

const userController = Router();

userController.get('/user', async (
  req: Request,
  res: Response
) => {
  const token: string = req.cookies[cookieName];

  if (!token) {
    res.status(401).send();
    return;
  }

  try {
    const tokenData = verifyToken(token);

    res.status(200).json(tokenData);
  } catch (err: unknown) {
    res.clearCookie(cookieName, { ...cookieOptions, path: '/' });

    if (err instanceof TokenExpiredError) {
      res.status(401).send('Token has expired');
    } else if (err instanceof JsonWebTokenError) {
      res.status(401).send('Invalid token');
    } else {
      res.status(401).send('Token verification error');
    }
  }
});

export default userController;
