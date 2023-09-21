import { Request, Response } from 'express';
import CreateSessionsService from '../services/CreateSessionsService';
import { plainToClass } from 'class-transformer';
import UserResponseDTO from '../dtos/UserResponseDTO';

export default class SessionsController {
  public async auth(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSession = new CreateSessionsService();

    const userAuthenticated = await createSession.execute({
      email,
      password,
    });

    const userResponseDTO = plainToClass(
      UserResponseDTO,
      userAuthenticated.user,
      {
        excludeExtraneousValues: true,
      },
    );
    const userWithAvatarUrl = {
      ...userResponseDTO,
      avatar: userResponseDTO.avatarUrl,
    };

    return response.json({
      user: userWithAvatarUrl,
      token: userAuthenticated.token,
    });
  }
}
