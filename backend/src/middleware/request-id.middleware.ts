import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

export interface RequestWithId extends Request {
  requestId?: string;
  startTime?: number;
}

export function requestIdMiddleware(req: RequestWithId, res: Response, next: NextFunction): void {
  const reqId = (req.headers['x-request-id'] as string) || `req_${randomUUID()}`;
  req.requestId = reqId;
  req.startTime = Date.now();
  res.setHeader('X-Request-Id', reqId);
  next();
}
