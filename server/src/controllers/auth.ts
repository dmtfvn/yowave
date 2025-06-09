import { Request, Response, Router } from 'express';

import { RegisterInterface } from '../interfaces/RegisterInterface';

const authController = Router();

authController.post('/register', (
  req: Request<{}, {}, RegisterInterface>,
  res: Response
) => {
  const userData = req.body;

  console.log(userData)

  res.json(userData);
});

export default authController;
