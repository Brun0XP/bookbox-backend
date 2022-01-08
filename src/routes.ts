import { Router } from 'express';
import authMiddleware from './middlewares/auth'

import UsersController from './controllers/UsersController';
import AccountsController from './controllers/AccountsController';

const routes = Router();

routes.post('/auth/register', UsersController.create)
routes.post('/auth/login', UsersController.login)

routes.use(authMiddleware)
routes.get('/api/v1/users', UsersController.index);

routes.get('/api/v1/users/:id', UsersController.show);
routes.post('/api/v1/account', AccountsController.create);

export default routes;