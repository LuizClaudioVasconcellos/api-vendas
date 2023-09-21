import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ListUserService from '../services/ListUserService';
import { plainToClass } from 'class-transformer';
import UserResponseDTO from '../dtos/UserResponseDTO';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUser = new ListUserService();

    const users = await listUser.execute();

    const userResponseDTO = users.map(user => {
      const userDto = plainToClass(UserResponseDTO, user, {
        excludeExtraneousValues: true,
      });
      return {
        ...userDto,
        avatar: userDto.avatarUrl,
      };
    });

    return response.json({ userResponseDTO });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    const { avatar, ...userWithoutAvatar } = user;

    const userResponseDTO = plainToClass(UserResponseDTO, userWithoutAvatar, {
      excludeExtraneousValues: true,
    });

    return response.json(userResponseDTO);
  }
}
