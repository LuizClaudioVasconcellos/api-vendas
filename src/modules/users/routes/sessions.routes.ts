import { Router } from 'express';
import SessionsController from '../controllers/SessionsController';
import { celebrate, Joi, Segments } from 'celebrate';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

/**
 * @openapi
 * tags:
 *   name: Auth
 *   description: Session Authenticate
 */

/**
 * @openapi
 * /auth:
 *   post:
 *     summary: Authenticate and obtain a JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schema/CreateSessionInput'
 *     responses:
 *        '200':
 *          description: Authentication successful, returns a JWT token
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#components/schema/CreateSessionResponse'
 *        '400':
 *          description: Bad Request
 *        '401':
 *          description: Incorrect email/password combination
 *        '429':
 *          description: Too Many Requests
 */

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.auth,
);

export default sessionsRouter;
