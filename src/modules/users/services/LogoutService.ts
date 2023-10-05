import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache';

interface IRequest {
  userId: number;
}

class LogoutService {
  public async execute({ userId }: IRequest): Promise<void> {
    const redisCache = new RedisCache();

    const validTokenKey = `api-vendas-VALID-TOKENS:${userId}`;
    const validToken = await redisCache.recover(validTokenKey);

    const expirationInSeconds = 24 * 60 * 60;

    if (validToken) {
      await redisCache.invalidate(validTokenKey);

      await redisCache.save(
        `api-vendas-INVALID-TOKENS:${userId}:${validToken}`,
        true,
        expirationInSeconds,
      );
    } else {
      throw new AppError('The user does not have a valid session', 401);
    }
  }
}

export default LogoutService;
