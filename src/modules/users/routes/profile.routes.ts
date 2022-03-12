import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UserProfileController from '../controllers/UserProfileController';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const profileRouter = Router();
const userProfileController = new UserProfileController();

profileRouter.use(isAuthenticated);

profileRouter.get('/', userProfileController.show);

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
