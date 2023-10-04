import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UserProfileController from '../controllers/UserProfileController';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const profileRouter = Router();
const userProfileController = new UserProfileController();

profileRouter.use(isAuthenticated);

/**
 * @openapi
 * tags:
 *   name: Profile
 *   description: Profile management
 */

/**
 * @openapi
 * /profile:
 *   get:
 *     summary: Show profile
 *     tags: [Profile]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schema/ShowProfileResponse'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '429':
 *         description: Too Many Requests
 *       '500':
 *         description: Internal Server Error
 */

profileRouter.get('/', userProfileController.show);

/**
 * @openapi
 * /profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schema/UpdateProfileRequest'
 *     responses:
 *       '200':
 *         description: User profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schema/UpdateProfileResponse'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: User not found
 *       '429':
 *         description: Too Many Requests
 *       '500':
 *         description: Internal Server Error
 */

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string().optional(),
      password_confirmation: Joi.string()
        .valid(Joi.ref('password'))
        .when('password', {
          is: Joi.exist(),
          then: Joi.required(),
        }),
    },
  }),
  userProfileController.update,
);

export default profileRouter;
