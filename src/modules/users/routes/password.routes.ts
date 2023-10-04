import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import { celebrate, Joi, Segments } from 'celebrate';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

/**
 * @openapi
 * tags:
 *   name: Password
 *   description: Password management
 */

/**
 * @openapi
 * /password/forgot:
 *   post:
 *     summary: Forgot Password
 *     tags: [Password]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schema/ForgotPasswordRequest'
 *     responses:
 *        '204':
 *          description: No Content
 *        '400':
 *          description: Bad Request
 *        '429':
 *          description: Too Many Requests
 */

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPasswordController.create,
);

/**
 * @openapi
 * /password/reset:
 *   post:
 *     summary: Reset Password
 *     tags: [Password]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schema/ResetPasswordRequest'
 *     responses:
 *        '204':
 *          description: No Content
 *        '400':
 *          description: Bad Request
 *        '429':
 *          description: Too Many Requests
 */

passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetPasswordController.create,
);

export default passwordRouter;
