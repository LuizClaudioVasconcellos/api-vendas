import { Request, Response } from 'express';
import LogoutService from '../services/LogoutService';

class LogoutController {
  public async logout(request: Request, response: Response): Promise<Response> {
    const userId = request.userId.id;

    const logoutService = new LogoutService();

    await logoutService.execute({ userId });

    return response.status(204).json();
  }
}

export default LogoutController;
