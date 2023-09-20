import { Router } from 'express';
import OrdersController from '../controllers/OrdersController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.use(isAuthenticated);

ordersRouter.get(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  ordersController.show,
);

ordersRouter.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.number().integer().required(),
      products: Joi.required(),
    },
  }),
  ordersController.create,
);

export default ordersRouter;
