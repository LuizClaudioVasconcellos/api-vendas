import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  user_id: number;
}

/**
 * @openapi
 * components:
 *   schema:
 *     ShowProfileResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         avatar:
 *           type: string
 *           format: uri
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *       example:
 *         id: 2
 *         name: "luiz"
 *         email: "luiz@gmail.com"
 *         avatar: "http://localhost:3333/files/620526eff47e300fc240-00bf60c4153911ee97e076634f4cece5.jpg"
 *         created_at: "2023-09-20T23:55:08.390Z"
 *         updated_at: "2023-09-21T01:26:47.723Z"
 */

class ShowProfileService {
  public async execute({ user_id }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    return user;
  }
}

export default ShowProfileService;
