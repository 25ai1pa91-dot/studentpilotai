import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../../../config/env.config';
import { UnauthorizedError, ForbiddenError } from '../../../core/api-error';
import { userRepository } from '../../user/repository/user.repository';
import { IUserDocument } from '../../user/model/user.model';

export interface AuthenticatedRequest extends Request {
  user?: IUserDocument;
}

export async function authenticate(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Authentication token missing or invalid');
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, env.JWT_SECRET) as { userId: string; role: string };

    const user = await userRepository.findById(decoded.userId);
    if (!user || user.isDeleted || user.status !== 'active') {
      throw new UnauthorizedError('User account suspended or not found');
    }

    req.user = user;
    next();
  } catch (error) {
    next(new UnauthorizedError('Invalid or expired authentication token'));
  }
}

export function authorize(...roles: string[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      next(new ForbiddenError('You do not have permission to perform this action'));
      return;
    }
    next();
  };
}

export function requireVerifiedEmail(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  if (!req.user?.isEmailVerified) {
    next(new ForbiddenError('Please verify your email address to access this resource'));
    return;
  }
  next();
}
