import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const productsRouter = Router();
const productsController = new ProductsController();

/**
 * @openapi
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @openapi
 * /products:
 *   get:
 *     summary: List all products
 *     tags: [Products]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schema/ListProductResponse'
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '429':
 *         description: Too Many Requests
 *       '500':
 *         description: Internal Server Error
 */

productsRouter.get('/', isAuthenticated, productsController.index);

/**
 * @openapi
 * /products/id:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schema/ShowProductResponse'
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

productsRouter.get(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  productsController.show,
);

/**
 * @openapi
 *  /products:
 *    post:
 *      summary: Create a new product
 *      tags: [Products]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            type: object
 *            schema:
 *              $ref: '#components/schema/CreateProductInput'
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#components/schema/CreateProductResponse'
 *        '400':
 *          description: Bad Request
 *        '401':
 *          description: Unauthorized
 *        '429':
 *          description: Too Many Requests
 *        '500':
 *          description: Internal Server Error
 */

productsRouter.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    },
  }),
  productsController.create,
);

/**
 * @openapi
 * /products/id:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID to be updated
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schema/UpdateProductRequest'
 *     responses:
 *       '200':
 *         description: Customer updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schema/UpdateProductResponse'
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

productsRouter.put(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  productsController.update,
);

/**
 * @openapi
 * /products/id:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID to be deleted
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

productsRouter.delete(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().integer().required(),
    },
  }),
  productsController.delete,
);

export default productsRouter;
