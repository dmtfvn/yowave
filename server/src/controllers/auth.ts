import { Router } from 'express';
import { Request, Response } from 'express-serve-static-core';

import { RegisterUserInterface } from '../interfaces/request/RegisterUserInterface';
import { CreatedUserInterface } from '../interfaces/response/CreatedUserInterface';

const authController = Router();

authController.post('/register', (
  req: Request<{}, {}, RegisterUserInterface>,
  res: Response<CreatedUserInterface>
) => {
  const { password, ...userData } = req.body;

  console.log(userData)

  const newUser: CreatedUserInterface = {
    ...userData,
    id: 'u1',
  };

  res.json(newUser);
});

export default authController;
