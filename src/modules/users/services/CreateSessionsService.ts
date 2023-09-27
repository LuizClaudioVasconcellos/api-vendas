import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

/**
 * @openapi
 *  components:
 *    schema:
 *      CreateSessionInput:
 *        required:
 *          -email
 *          -password
 *        properties:
 *          email:
 *            type: string
 *            default: Test@test.com
 *          password:
 *            type: string
 *            default: 1234Qz@
 *      CreateSessionResponse:
 *        type:
 *        properties:
 *          user:
 *            type: object
 *            properties:
 *              id:
 *                type: integer
 *              name:
 *                type: string
 *              email:
 *                type: string
 *              avatar:
 *                type: string
 *              created_at:
 *                type: string
 *              updated_at:
 *                type: string
 *          token:
 *            type: string
 */

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect e-mail/password combination', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect e-mail/password combination', 401);
    }

    const token = sign({ id: user.id }, authConfig.jwt.secret, {
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user, token };
  }
}

export default CreateSessionsService;
