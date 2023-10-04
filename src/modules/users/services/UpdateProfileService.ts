import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  user_id: number;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

/**
 * @openapi
 * components:
 *   schema:
 *     UpdateProfileRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         old_password:
 *           type: string
 *         password:
 *           type: string
 *           minLength: 6
 *         password_confirmation:
 *           type: string
 *           minLength: 6
 *       required:
 *         - name
 *         - email
 *       example:
 *         name: "luiz"
 *         email: "luiz@gmail.com"
 *         old_password: "123"
 *         password: "123456"
 *         password_confirmation: "123456"
 *         description: |
 *           Optional fields for changing password only. If you want to change the password, provide the old (old_password) and the new (password and password_confirmation).
 *
 *     UpdateProfileResponse:
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

class UpdateProfileService {
  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const userUpdateEmail = await usersRepository.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id !== user_id) {
      throw new AppError('There is already one user with email');
    }

    if (password && !old_password) {
      throw new AppError('Old password is required');
    }

    if (password && user.password) {
      const checkCurrentPassword = await compare(password, user.password);

      if (checkCurrentPassword) {
        throw new AppError(
          'The new password must be different from the current password.',
        );
      }
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('Old password does no match.');
      }

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
