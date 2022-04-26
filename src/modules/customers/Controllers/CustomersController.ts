import { Request, Response } from 'express';
import CreateCustomerService from '../services/CreateCustomerService';
import DeleteCustomerService from '../services/DeleteCustomerService';
import ListCustomerService from '../services/ListCustomerService';
import ShowCustomerService from '../services/ShowCustomerService';
import UpdateCustomerService from '../services/UpdateCustomerService';

export default class CustomersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCustomers = new ListCustomerService();

    const customers = await listCustomers.execute();

    return response.json(customers);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { customer_id } = request.params;

    const showCustomer = new ShowCustomerService();

    const customer = await showCustomer.execute({ customer_id });

    return response.json(customer);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const createCustomer = new CreateCustomerService();

    const customer = await createCustomer.execute({
      name,
      email,
    });

    return response.json(customer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const { customer_id } = request.params;

    const updateCustomer = new UpdateCustomerService();

    const customer = await updateCustomer.execute({
      customer_id: Number(customer_id),
      name,
      email,
    });

    return response.json(customer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { customer_id } = request.params;

    const deleteCustomer = new DeleteCustomerService();

    await deleteCustomer.execute({ customer_id });

    return response.json([]);
  }
}
