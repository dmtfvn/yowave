import { Router } from 'express';
import { Request, Response } from 'express-serve-static-core';

// import { AuthUserT } from '../types/response/AuthUserT';
// import { SessionUserT } from '../types/session/SessionUserT';

import { verifyToken } from '../utils/jwt';
import { JwtPayload } from 'jsonwebtoken';

const cookieName = process.env.AUTH_COOKIE as string;

const userController = Router();

userController.get('/user', async (
  req: Request,
  res: Response
) => {
  const token: string = req.cookies[cookieName];
  // console.log(token)

  if (!token) {
    res.status(401).send();
    return;
  }

  try {
    const sessionData = verifyToken(token);

    res.status(200).json({ ...sessionData, token });
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(401).send(err.message);
    } else {
      res.status(401).send('Unknown error');
    }
  }
});

export default userController;
