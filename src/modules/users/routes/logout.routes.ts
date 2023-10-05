import { Router } from 'express';
import LogoutController from '../controllers/LogoutController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const logoutRouter = Router();
const logoutController = new LogoutController();

logoutRouter.use(isAuthenticated);

logoutRouter.post('/', logoutController.logout);

export default logoutRouter;
