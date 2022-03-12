import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import { CustomersRepository } from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  user_id: number;
}

class ShowCustomerService {
  public async execute({ user_id }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(user_id);

    if (!customer) {
      throw new AppError('Customer not found');
    }

    return customer;
  }
}

export default ShowCustomerService;
