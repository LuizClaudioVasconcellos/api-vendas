import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import RedisCache from '@shared/cache/RedisCache';

/**
 * @openapi
 * components:
 *   schema:
 *     ListProductResponse:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           id:
 *             type: integer
 *           name:
 *             type: string
 *           price:
 *             type: string
 *           quantity:
 *             type: integer
 *           created_at:
 *             type: string
 *             format: date-time
 *           updated_at:
 *             type: string
 *             format: date-time
 *       example:
 *         - id: 1
 *           name: "Book 666"
 *           price: "14.20"
 *           quantity: 47
 *           created_at: "2023-09-19T18:30:55.893Z"
 *           updated_at: "2023-09-20T03:37:15.006Z"
 *         - id: 3
 *           name: "Book 777"
 *           price: "13.00"
 *           quantity: 8
 *           created_at: "2023-09-20T03:35:28.797Z"
 *           updated_at: "2023-09-20T03:37:15.006Z"
 *         - id: 2
 *           name: "Book 555"
 *           price: "15.99"
 *           quantity: 100
 *           created_at: "2023-09-19T18:31:08.608Z"
 *           updated_at: "2023-09-21T23:15:35.841Z"
 */

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository);

    const redisCache = new RedisCache();

    let products = await redisCache.recover<Product[]>(
      'api-vendas-PRODUCT_LIST',
    );

    if (!products) {
      products = await productsRepository.find();

      await redisCache.save('api-vendas-PRODUCT_LIST', products);
    }

    return products;
  }
}

export default ListProductService;
