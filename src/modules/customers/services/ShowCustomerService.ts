import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  customer_id: number;
}

/**
 * @swagger
 * components:
 *   schema:
 *     ShowCustomerResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         created_at:
 *           type: string
 *         updated_at:
 *           type: string
 *       example:
 *         id: 3
 *         name: "Patrick"
 *         email: "Patrick@hotmail.com"
 *         created_at: "2023-09-19T20:19:56.975Z"
 *         updated_at: "2023-09-19T20:19:56.975Z"
 */

class ShowCustomerService {
  public async execute({ customer_id }: IRequest): Promise<Customer> {
    if (isNaN(customer_id)) {
      throw new AppError('Invalid customer_id');
    }

    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(customer_id);

    if (!customer) {
      throw new AppError('Customer not found');
    }

    return customer;
  }
}

export default ShowCustomerService;
