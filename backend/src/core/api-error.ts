export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly errors: any;

  constructor(statusCode: number, message: string, errors: any = null) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends ApiError {
  constructor(message = 'Bad Request', errors: any = null) {
    super(400, message, errors);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = 'Unauthorized Access', errors: any = null) {
    super(401, message, errors);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = 'Forbidden Resource', errors: any = null) {
    super(403, message, errors);
  }
}

export class NotFoundError extends ApiError {
  constructor(message = 'Resource Not Found', errors: any = null) {
    super(404, message, errors);
  }
}

export class ValidationError extends ApiError {
  constructor(errors: any) {
    super(422, 'Validation Failed', errors);
  }
}

export class InternalServerError extends ApiError {
  constructor(message = 'Internal Server Error', errors: any = null) {
    super(500, message, errors);
  }
}
