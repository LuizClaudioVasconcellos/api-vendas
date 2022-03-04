import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersReposirory = getCustomRepository(UsersRepository);
    const emailExists = await usersReposirory.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already use');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersReposirory.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersReposirory.save(user);

    return user;
  }
}

export default CreateUserService;
