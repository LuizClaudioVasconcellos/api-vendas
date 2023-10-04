import { Router } from 'express';
import OrdersController from '../controllers/OrdersController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.use(isAuthenticated);

/**
 * @openapi
 * tags:
 *   name: Orders
 *   description: Orders management
 */

/**
 * @openapi
 * /orders/id:
 *   get:
 *     summary: Get a order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Order details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schema/ShowOrderResponse'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Order not found
 *       '429':
 *         description: Too Many Requests
 *       '500':
 *         description: Internal Server Error
 */

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

/**
 * @openapi
 *  /orders:
 *    post:
 *      summary: Create a new order
 *      tags: [Orders]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            type: object
 *            schema:
 *              $ref: '#components/schema/CreateOrderInput'
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#components/schema/CreateOrderResponse'
 *        '400':
 *          description: Bad Request
 *        '401':
 *          description: Unauthorized
 *        '429':
 *          description: Too Many Requests
 *        '500':
 *          description: Internal Server Error
 */

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
