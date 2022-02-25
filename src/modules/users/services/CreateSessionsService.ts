import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersReposirory } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  email: string;
  password: string;
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<User> {
    const usersReposirory = getCustomRepository(UsersReposirory);
    const user = await usersReposirory.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect e-mail/password combination', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect e-mail/password combination', 401);
    }

    return user;
  }
}

export default CreateSessionsService;
