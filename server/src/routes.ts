import { Router } from 'express';

import authController from './controllers/auth';

const routes = Router();

routes.use('/api/auth', authController);

export default routes;