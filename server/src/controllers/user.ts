import { Router } from 'express';
import { Request, Response } from 'express-serve-static-core';

import { AuthUserT } from '../types/response/AuthUserT';
import { SessionUserT } from '../types/session/SessionUserT';

const userController = Router();

userController.get('/user', async (
  req: Request<{}, {}, AuthUserT>,
  res: Response
) => {
  const user = (req.session as SessionUserT).user;
  console.log(user)

  if (user?.userData.userid) {
    res.status(200).json(user);
  } else {
    res.status(401).send();
  }
});

export default userController;
