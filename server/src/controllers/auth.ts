import { Router } from 'express';
import { Request, Response } from 'express-serve-static-core';
import { ValidationError } from 'yup';

import { RegisterUserInterface } from '../interfaces/request/RegisterUserInterface';
import { LoginUserInterface } from '../interfaces/request/LoginUserInterface';

import { AuthUserInterface } from '../interfaces/response/AuthUserInterface';

import authService from '../services/authService';

const authController = Router();

authController.post('/register', (
  req: Request<{}, {}, RegisterUserInterface>,
  res: Response<AuthUserInterface>
) => {
  const { password, ...userData } = req.body;

  console.log(userData)

  const newUser: AuthUserInterface = {
    ...userData,
    id: 'u1',
  };

  res.json(newUser);
});

authController.post('/login', async (
  req: Request<{}, {}, LoginUserInterface>,
  res: Response<AuthUserInterface>
) => {
  const formData = req.body;

  try {
    const userData = await authService.login(formData);

    console.log('Form is good')

    res.json({
      email: userData.email,
      username: 'Rick',
      id: 'u1'
    })
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message)
    } else if (err instanceof ValidationError) {
      console.log(err.errors)
    } else {
      console.log('Unknown error')
    }

    res.status(422).send();
  }
});

export default authController;
