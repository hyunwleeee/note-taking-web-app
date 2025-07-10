export type ResponseError =
  | 'Bad credentials'
  | 'Moved permanently'
  | 'Resource not found'
  | 'Validation failed, or the endpoint had been spammed.';

export type ResponseStatusCode = 301 | 401 | 404 | 422;

export type APIErrorType = {
  error: ResponseError;
  message?: string[] | string;
  statusCode: ResponseStatusCode;
};

export class APIError extends Error {
  readonly error: string;
  readonly statusCode: number;

  constructor({ error, message = '', statusCode }: APIErrorType) {
    super();
    this.error = error;
    this.message = Array.isArray(message) ? message.join('\n') : message;
    this.statusCode = statusCode;
  }
}

