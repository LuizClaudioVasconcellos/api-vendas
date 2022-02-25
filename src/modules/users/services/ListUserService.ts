import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersReposirory } from '../typeorm/repositories/UsersRepository';

class ListUserService {
  public async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersReposirory);

    const users = await usersRepository.find();

    return users;
  }
}

export default ListUserService;
