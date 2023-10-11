import { getCustomRepository } from 'typeorm';
import { PaymentsRepository } from '../typeorm/repositories/PaymentsRepository';
import { OrdersRepository } from '@modules/orders/typeorm/repositories/OrdersRepository';
import Payment from '../typeorm/entities/Payment';
import Order from '@modules/orders/typeorm/entities/Order';
import AppError from '@shared/errors/AppError';

interface IRequest {
  payment_id: number;
}

class ShowPaymentService {
  public async execute({ payment_id }: IRequest): Promise<{
    payment: Payment | undefined;
    order: Order | undefined;
  }> {
    const paymentsRepository = getCustomRepository(PaymentsRepository);
    const ordersRepository = getCustomRepository(OrdersRepository);

    const payment = await paymentsRepository.findById(payment_id);

    const order = await ordersRepository.findById(Number(payment?.order_id));

    if (!payment) {
      throw new AppError('Payment not found', 404);
    }

    return { payment, order };
  }
}

export default ShowPaymentService;
