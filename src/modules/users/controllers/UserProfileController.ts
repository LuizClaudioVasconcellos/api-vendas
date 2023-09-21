import { Request, Response } from 'express';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';
import { plainToClass } from 'class-transformer';
import UserResponseDTO from '../dtos/UserResponseDTO';

export default class UserProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showProfile = new ShowProfileService();
    const user_id = request.userId.id;

    const user = await showProfile.execute({ user_id });

    const userResponseDTO = plainToClass(UserResponseDTO, user, {
      excludeExtraneousValues: true,
    });
    const userWithAvatarUrl = {
      ...userResponseDTO,
      avatar: userResponseDTO.avatarUrl,
    };

    return response.json(userWithAvatarUrl);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.userId.id;
    const { name, email, password, old_password } = request.body;

    const updateProfile = new UpdateProfileService();

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });

    const userResponseDTO = plainToClass(UserResponseDTO, user, {
      excludeExtraneousValues: true,
    });
    const userWithAvatarUrl = {
      ...userResponseDTO,
      avatar: userResponseDTO.avatarUrl,
    };

    return response.json(userWithAvatarUrl);
  }
}
