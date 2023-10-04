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
/**
 * @swagger
 * components:
 *   schema:
 *     CreateSessionInput:
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       example:
 *         email: "shrek@gmail.com"
 *         password: "123456"
 *     CreateSessionResponse:
 *       type: object
 *       properties:
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             avatar:
 *               type: string
 *             created_at:
 *               type: string
 *             updated_at:
 *               type: string
 *           example:
 *             id: 3
 *             name: "Shrek"
 *             email: "shrek@gmail.com"
 *             avatar: "http://localhost:3333/files/67f7d6dfe43a264477cc-1da10a8e132211ee8c68c6b1f2e619e4.png"
 *             created_at: "2023-09-21T00:15:05.373Z"
 *             updated_at: "2023-09-21T00:15:05.373Z"
 *         token:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNjk2MzgxMjM1LCJleHAiOjE2OTY0Njc2MzV9.ZwtLfNadf5p3W4AWSUZPUrZYwPrVy9vYZJV_uR-_Zf4"
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
