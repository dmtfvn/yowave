import { Router } from 'express';
import { Request, Response } from 'express-serve-static-core';

import { SessionUserT } from '../interfaces/session/SessionUserT';

const userController = Router();

userController.get('/user', async (
  req: Request,
  res: Response
) => {
  const userData = (req.session as SessionUserT).user;
  console.log(userData)

  if (userData?.user.username) {
    res.status(200).json(userData);
  } else {
    res.status(401).send();
  }
});

export default userController;
