import { EntityRepository, Repository } from 'typeorm';
import Payment from '../entities/Payment';

@EntityRepository(Payment)
export class PaymentsRepository extends Repository<Payment> {
  public async findById(id: number): Promise<Payment | undefined> {
    // const payment = this.findOne(id, {
    //   relations: ['order'],
    // });
    const payment = this.findOne(id);
    return payment;
  }

  public async createPayment(data: Partial<Payment>): Promise<Payment> {
    const payment = this.create(data);

    return this.save(payment);
  }
}

export default PaymentsRepository;
