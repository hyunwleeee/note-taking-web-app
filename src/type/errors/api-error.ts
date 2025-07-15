export interface IAPIError {
  message: string;
  statusCode: number;
  code: string;
  details?: string | string[];
}

export class APIError extends Error {
  readonly statusCode: number;
  readonly code: string;
  readonly details?: string | string[];

  constructor({ message, statusCode, code, details }: IAPIError) {
    super(message);
    this.name = 'APIError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

