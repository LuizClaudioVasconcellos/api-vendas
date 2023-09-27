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
 *     summary: Autenticar e obter um token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schema/CreateSessionInput'
 *     responses:
 *        '200':
 *          description: Autenticação bem-sucedida, retorna um token JWT
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#components/schema/CreateSessionResponse'
 *        '400':
 *          description: Requisição inválida
 *        '401':
 *          description: Combinação de e-mail/senha incorreta
 *        '429':
 *          description: Muitas solicitações
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
