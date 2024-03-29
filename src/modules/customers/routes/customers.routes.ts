import { Router } from 'express';
import CustomersController from '../controllers/CustomersController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const customersRouter = Router();
const customersController = new CustomersController();

/**
 * @openapi
 * tags:
 *   name: Customers
 *   description: Customer management
 */

/**
 * @openapi
 * /customers:
 *   get:
 *     summary: List all customers
 *     tags: [Customers]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of customers
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schema/ListCustomerResponse'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '429':
 *         description: Too Many Requests
 *       '500':
 *         description: Internal Server Error
 */

customersRouter.get('/', isAuthenticated, customersController.index);

/**
 * @openapi
 * /customers/id:
 *   get:
 *     summary: Get a customer by ID
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the customer
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Customer details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schema/ShowCustomerResponse'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Customer not found
 *       '429':
 *         description: Too Many Requests
 *       '500':
 *         description: Internal Server Error
 */

customersRouter.get(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  customersController.show,
);

/**
 * @openapi
 *  /customers:
 *    post:
 *      summary: Create a new customer
 *      tags: [Customers]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            type: object
 *            schema:
 *              $ref: '#components/schema/CreateCustumerInput'
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#components/schema/CreateCustumerResponse'
 *        '400':
 *          description: Bad Request
 *        '401':
 *          description: Unauthorized
 *        '429':
 *          description: Too Many Requests
 *        '500':
 *          description: Internal Server Error
 */

customersRouter.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  customersController.create,
);

/**
 * @openapi
 * /customers/id:
 *   put:
 *     summary: Update a customer by ID
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Customer ID to be updated
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schema/UpdateCustomerRequest'
 *     responses:
 *       '200':
 *         description: Customer updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schema/UpdateCustomerResponse'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Customer not found
 *       '429':
 *         description: Too Many Requests
 *       '500':
 *         description: Internal Server Error
 */

customersRouter.put(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  customersController.update,
);

/**
 * @openapi
 * /customers/id:
 *   delete:
 *     summary: Delete a customer by ID
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Customer ID to be deleted
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       '200':
 *         description: Customer deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Customer not found
 *       '429':
 *         description: Too Many Requests
 *       '500':
 *         description: Internal Server Error
 */

customersRouter.delete(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  customersController.delete,
);

export default customersRouter;
