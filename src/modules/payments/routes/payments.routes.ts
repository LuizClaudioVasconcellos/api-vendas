import { Router } from 'express';
import PaymentsController from '../controllers/PaymentsController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const paymentRouter = Router();
const paymentsController = new PaymentsController();

paymentRouter.use(isAuthenticated);

// Validação do parâmetro "id" na rota GET /payments/:id
paymentRouter.get(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  paymentsController.show,
);

paymentRouter.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      order_id: Joi.number().integer().required(),
      amount: Joi.number().precision(2).required(),
      currency: Joi.string().valid('USD', 'EUR', 'BRL').required(),
    },
  }),
  paymentsController.create,
);

export default paymentRouter;
