import { Response } from 'express';

export interface ApiResponsePayload<T = any> {
  success: boolean;
  message: string;
  data: T | null;
  meta?: any;
  errors?: any;
  timestamp: string;
  requestId?: string;
}

export class ApiResponse {
  public static success<T>(
    res: Response,
    data: T,
    message = 'Operation successful',
    statusCode = 200,
    meta: any = null
  ): Response {
    const payload: ApiResponsePayload<T> = {
      success: true,
      message,
      data,
      meta,
      errors: null,
      timestamp: new Date().toISOString(),
      requestId: (res.req as any)?.requestId || undefined,
    };
    return res.status(statusCode).json(payload);
  }

  public static error(
    res: Response,
    message = 'An error occurred',
    statusCode = 500,
    errors: any = null
  ): Response {
    const payload: ApiResponsePayload = {
      success: false,
      message,
      data: null,
      errors,
      timestamp: new Date().toISOString(),
      requestId: (res.req as any)?.requestId || undefined,
    };
    return res.status(statusCode).json(payload);
  }
}
