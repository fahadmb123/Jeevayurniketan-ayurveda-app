export class ApiError extends Error {
  public readonly status: number;
  public readonly payload?: { message: string; statusCode: number; timestamp?: string; code?: string; details?: unknown };

  constructor(status: number, message: string, payload?: ApiError['payload']) {
    super(message);
    this.status = status;
    this.payload = payload;
    this.name = 'ApiError';
  }
}
