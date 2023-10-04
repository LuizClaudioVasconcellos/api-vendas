import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import { OrdersRepository } from '../typeorm/repositories/OrdersRepository';
import { CustomersRepository } from '@modules/customers/typeorm/repositories/CustomersRepository';
import { ProductRepository } from '@modules/products/typeorm/repositories/ProductsRepository';

interface IProduct {
  id: number;
  quantity: number;
}

interface IRequest {
  customer_id: number;
  products: IProduct[];
}

/**
 * @openapi
 * components:
 *   schema:
 *     CreateOrderInput:
 *       type: object
 *       properties:
 *         customer_id:
 *           type: integer
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *       example:
 *         customer_id: 5
 *         products:
 *           - id: 1
 *             quantity: 1
 *           - id: 3
 *             quantity: 1
 *
 *     CreateOrderResponse:
 *       type: object
 *       properties:
 *         customer:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             created_at:
 *               type: string
 *               format: date-time
 *             updated_at:
 *               type: string
 *               format: date-time
 *         order_products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *               price:
 *                 type: string
 *               quantity:
 *                 type: integer
 *               order_id:
 *                 type: integer
 *               id:
 *                 type: integer
 *               created_at:
 *                 type: string
 *                 format: date-time
 *               updated_at:
 *                 type: string
 *                 format: date-time
 *         id:
 *           type: integer
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *       example:
 *         customer:
 *           id: 5
 *           name: "Luiz"
 *           email: "Luiz@hotmail.com"
 *           created_at: "2023-09-19T20:51:18.650Z"
 *           updated_at: "2023-09-19T20:51:18.650Z"
 *         order_products:
 *           - product_id: 1
 *             price: "14.20"
 *             quantity: 16
 *             order_id: 6
 *             id: 10
 *             created_at: "2023-10-02T20:23:56.696Z"
 *             updated_at: "2023-10-02T20:23:56.696Z"
 *           - product_id: 3
 *             price: "13.00"
 *             quantity: 2
 *             order_id: 6
 *             id: 11
 *             created_at: "2023-10-02T20:23:56.696Z"
 *             updated_at: "2023-10-02T20:23:56.696Z"
 *         id: 6
 *         created_at: "2023-10-02T20:23:56.696Z"
 *         updated_at: "2023-10-02T20:23:56.696Z"
 */

class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const customersRpository = getCustomRepository(CustomersRepository);
    const productsRepository = getCustomRepository(ProductRepository);

    const customersExists = await customersRpository.findById(customer_id);

    if (!customersExists) {
      throw new AppError('Could not find any customer with the given id');
    }

    const existsProducts = await productsRepository.findAllByIds(products);

    if (!existsProducts.length) {
      throw new AppError('Could not find any products with the given ids');
    }

    const existsProductsIds = existsProducts.map(product => product.id);

    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    );

    if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find product ${checkInexistentProducts[0].id}`,
      );
    }

    const quantityAvailable = products.filter(
      product =>
        existsProducts.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );

    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}`,
      );
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price,
    }));

    const order = await ordersRepository.createOrder({
      customer: customersExists,
      products: serializedProducts,
    });

    const { order_products } = order;

    const updatedProductsQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        existsProducts.filter(p => p.id === product.product_id)[0].quantity -
        product.quantity,
    }));

    await productsRepository.save(updatedProductsQuantity);

    return order;
  }
}

export default CreateOrderService;
