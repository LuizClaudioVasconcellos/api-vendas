import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

/**
 /**
 * @swagger
 * components:
 *   schema:
 *     CreateCustumerInput:
 *       required:
 *         - name
 *         - email
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *       example:
 *        name: "Ariane"
 *        email: "Ariane@hotmail.com"
 *     CreateCustumerResponse:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         id:
 *           type: integer
 *         created_at:
 *           type: string
 *         updated_at:
 *           type: string
 *       example:
 *         name: "Ariane"
 *         email: "Ariane@hotmail.com"
 *         id: 6
 *         created_at: "2023-09-23T05:49:27.345Z"
 *         updated_at: "2023-09-23T05:49:27.345Z"
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
