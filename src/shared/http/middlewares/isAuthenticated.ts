import { NextFunction, Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import RedisCache from '@shared/cache/RedisCache';

interface ITokenPayload {
  id: number;
  iat: number;
  exp: number;
}

export default async function isAuthenticated(
  request: Request,
  reponse: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing.');
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    throw new AppError('Token error', 401);
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    throw new AppError('Token malformated', 401);
  }

  try {
    const decoded = jwt.verify(token, authConfig.jwt.secret as Secret);

    const { id } = decoded as ITokenPayload;

    request.userId = {
      id: id,
    };

    const redisCache = new RedisCache();

    const isValidToken = await redisCache.exists(
      `api-vendas-VALID-TOKENS:${request.userId.id}`,
    );

    if (!isValidToken) {
      throw new AppError('Token is invalid', 401);
    }

    const isInvalidToken = await redisCache.exists(
      `api-vendas-INVALID-TOKENS:${request.userId.id}:${token}`,
    );

    if (isInvalidToken) {
      throw new AppError('Token is invalid', 401);
    }

    return next();
  } catch (err) {
    throw new AppError('Token invalid', 401);
  }
}
