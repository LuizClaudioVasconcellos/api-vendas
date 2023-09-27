import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

/**
 * @openapi
 *  components:
 *    schema:
 *      CreateCustumerInput:
 *        required:
 *          -name
 *          -email
 *        properties:
 *          name:
 *            type: string
 *            default: Test
 *          email:
 *            type: string
 *            default: test@example.com
 *      CreateCustumerResponse:
 *        type:
 *        properties:
 *          name:
 *            type: string
 *          email:
 *            type: string
 *          id:
 *            type: integer
 *          created_at:
 *            type: string
 *          updated_at:
 *            type: string
 */

interface IRequest {
  name: string;
  email: string;
}

class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const emailExists = await customersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already use');
    }

    const customer = customersRepository.create({
      name,
      email,
    });

    await customersRepository.save(customer);

    return customer;
  }
}

export default CreateCustomerService;
