import { Request, Response } from 'express';
import CreateSessionsService from '../services/CreateSessionsService';

export default class SessionsController {
  public async auth(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSession = new CreateSessionsService();

    const userAuthenticated = await createSession.execute({
      email,
      password,
    });

    return response.json(userAuthenticated);
  }
}
