import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

interface IPaginateCustomer {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: Customer[];
}

/**
 * @openapi
 * components:
 *   schema:
 *     ListCustomerResponse:
 *       type: object
 *       properties:
 *         from:
 *           type: integer
 *         to:
 *           type: integer
 *         per_page:
 *           type: integer
 *         total:
 *           type: integer
 *         current_page:
 *           type: integer
 *         prev_page:
 *           type: integer | null
 *         next_page:
 *           type: integer | null
 *         last_page:
 *           type: integer | null
 *         data:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               created_at:
 *                 type: string
 *               updated_at:
 *                 type: string
 */

class ListCustomerService {
  public async execute(): Promise<IPaginateCustomer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customers = await customersRepository.createQueryBuilder().paginate();

    return customers as IPaginateCustomer;
  }
}

export default ListCustomerService;
