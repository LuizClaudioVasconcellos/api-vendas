import { EntityRepository, Repository } from 'typeorm';
import Customer from '../entities/Customer';

@EntityRepository(Customer)
export class UsersRepository extends Repository<Customer> {
  public async findByName(name: string): Promise<Customer | undefined> {
    const customer = await this.findOne({
      where: {
        name,
      },
    });

    return customer;
  }

  public async findById(id: number): Promise<Customer | undefined> {
    const customer = await this.findOne({
      where: {
        id,
      },
    });

    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = await this.findOne({
      where: {
        email,
      },
    });

    return customer;
  }
}
