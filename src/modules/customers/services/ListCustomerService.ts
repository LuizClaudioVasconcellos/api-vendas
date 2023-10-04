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
 * @swagger
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
 *       example:
 *         from: 1
 *         to: 4
 *         per_page: 15
 *         total: 4
 *         current_page: 1
 *         prev_page: null
 *         next_page: null
 *         last_page: 1
 *         data:
 *           - id: 3
 *             name: "Patrick"
 *             email: "Patrick@hotmail.com"
 *             created_at: "2023-09-19T20:19:56.975Z"
 *             updated_at: "2023-09-19T20:19:56.975Z"
 *           - id: 5
 *             name: "Luiz"
 *             email: "Luiz@hotmail.com"
 *             created_at: "2023-09-19T20:51:18.650Z"
 *             updated_at: "2023-09-19T20:51:18.650Z"
 *           - id: 6
 *             name: "Ariane"
 *             email: "Ariane@hotmail.com"
 *             created_at: "2023-09-23T05:49:27.345Z"
 *             updated_at: "2023-09-23T05:49:27.345Z"
 *           - id: 7
 *             name: "João"
 *             email: "Joao@hotmail.com"
 *             created_at: "2023-09-30T23:25:43.894Z"
 *             updated_at: "2023-09-30T23:25:43.894Z"
 */

class ListCustomerService {
  public async execute(): Promise<IPaginateCustomer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customers = await customersRepository.createQueryBuilder().paginate();

    return customers as IPaginateCustomer;
  }
}

export default ListCustomerService;
