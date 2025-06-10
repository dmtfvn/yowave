import { Router } from 'express';

import authController from './controllers/auth';

const routes = Router();

routes.use('/auth', authController);

export default routes;