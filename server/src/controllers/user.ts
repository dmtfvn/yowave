import { Router } from 'express';
import { Request, Response } from 'express-serve-static-core';

import renewJwtAccess from '../utils/renewJwtAccess';

const userController = Router();

userController.get('/user', async (
  req: Request,
  res: Response
) => {
  return renewJwtAccess(req, res);
});

export default userController;
