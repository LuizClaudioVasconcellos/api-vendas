import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Payment from '../typeorm/entities/Payment';
import { OrdersRepository } from '../../orders/typeorm/repositories/OrdersRepository';
import { PaymentsRepository } from '../typeorm/repositories/PaymentsRepository';

interface IRequest {
  order_id: number;
  amount: number;
  currency: string;
}

class CreatePaymentService {
  public async execute({
    order_id,
    amount,
    currency,
  }: IRequest): Promise<Payment> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const paymentsRepository = getCustomRepository(PaymentsRepository);
    const order = await ordersRepository.findById(order_id);

    if (!order) {
      throw new AppError('Could not find any order with the given ID');
    }

    const payment = paymentsRepository.createPayment({
      order,
      amount,
      currency,
    });

    return payment;
  }
}

export default CreatePaymentService;
