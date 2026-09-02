import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../core/api-error';
import { ApiResponse } from '../utils/api-response';
import { logger } from '../core/logger';
import { env } from '../config/env.config';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  logger.error(`[API Error] ${err.name}: ${err.message}\nStack: ${err.stack}`);

  if (err instanceof ApiError) {
    ApiResponse.error(res, err.message, err.statusCode, err.errors);
    return;
  }

  const message = env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message;
  ApiResponse.error(res, message, 500, env.NODE_ENV === 'production' ? null : err.stack);
}
