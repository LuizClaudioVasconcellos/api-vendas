import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  customer_id: number;
  name: string;
  email: string;
}

/**
 * @openapi
 * components:
 *   schema:
 *     UpdateCustomerRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *       example:
 *        name: "Patrick"
 *        email: "patrick@gmail.com"
 *     UpdateCustomerResponse:
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
 *         id: 2
 *         name: "Patrick"
 *         email: "patrick@gmail.com"
 *         created_at: "2023-09-19T18:45:39.196Z"
 *         updated_at: "2023-09-19T20:12:10.646Z"
 */

class UpdateCustomerService {
  public async execute({
    customer_id,
    name,
    email,
  }: IRequest): Promise<Customer> {
    if (isNaN(customer_id)) {
      throw new AppError('Invalid customer_id');
    }
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(customer_id);

    if (!customer) {
      throw new AppError('Customer not found');
    }

    const customerExists = await customersRepository.findByEmail(email);

    if (customerExists && email !== customer.email) {
      throw new AppError('There is already one customer with this email');
    }

    customer.name = name;
    customer.email = email;

    await customersRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
