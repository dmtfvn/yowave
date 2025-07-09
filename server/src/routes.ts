import { Router } from 'express';

import authController from './controllers/auth';
import userController from './controllers/user';

const routes = Router();

routes.use('/auth', authController);
routes.use('/account', userController);

export default routes;
