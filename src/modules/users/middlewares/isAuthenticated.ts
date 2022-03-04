import { NextFunction, Request, Response } from 'express';
// import { verify } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

export default function isAuthenticated(
  request: Request,
  reponse: Response,
  next: NextFunction,
): void {
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

  jwt.verify(token, authConfig.jwt.secret, (err, decoded) => {
    if (err) {
      throw new AppError('Token invalid', 401);
    }
    console.log(decoded);
    return next();
  });
}
