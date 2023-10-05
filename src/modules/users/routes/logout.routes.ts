import { Router } from 'express';
import LogoutController from '../controllers/LogoutController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const logoutRouter = Router();
const logoutController = new LogoutController();

logoutRouter.use(isAuthenticated);

/**
 * @openapi
 * /logout:
 *   post:
 *     summary: Logs out the authenticated user
 *     tags: [Auth]
 *     responses:
 *        '204':
 *          description: Logout completed successfully.
 *        '400':
 *          description: Bad Request
 *        '401':
 *          description: Unauthorized (unauthenticated user or invalid token).
 *        '429':
 *          description: Too Many Requests
 *        '500':
 *          description: Internal Server Error
 */

logoutRouter.post('/', logoutController.logout);

export default logoutRouter;
