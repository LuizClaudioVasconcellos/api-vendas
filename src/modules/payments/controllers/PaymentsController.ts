import { Request, Response } from 'express';
import CreatePaymentService from '../services/CreatePaymentService';
import ShowPaymentService from '../services/ShowPaymentService';
import AppError from '@shared/errors/AppError';

class PaymentsController {
  public async show(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const showPaymentService = new ShowPaymentService();

      const payment = await showPaymentService.execute({
        payment_id: Number(id),
      });

      if (!payment) {
        throw new AppError('Payment not found', 404);
      }

      return response.json(payment);
    } catch (error: any) {
      return response
        .status(error.statusCode || 500)
        .json({ error: error.message });
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { order_id, amount, currency } = request.body;

      const createPaymentService = new CreatePaymentService();

      const payment = await createPaymentService.execute({
        order_id,
        amount,
        currency,
      });

      return response.status(201).json(payment);
    } catch (error) {
      return response
        .status(400)
        .json({ error: 'Failed to create payment. Check the provided data.' });
    }
  }
}

export default PaymentsController;
