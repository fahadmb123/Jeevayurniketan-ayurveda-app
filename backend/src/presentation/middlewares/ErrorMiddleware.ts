import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../../application/errors/AppError.js';
import { EnvironmentConfig } from '../../config/EnvironmentConfig.js';

export class ErrorMiddleware {
  constructor(private readonly config: EnvironmentConfig) {}

  public handle = (
    err: Error | AppError,
    _req: Request,
    res: Response,
    _next: NextFunction
  ): void => {
    const statusCode = err instanceof AppError ? err.statusCode : 500;
    const message = err.message || 'Internal Server Error';

    console.error(`[Error] ${statusCode} - ${message}`);
    if (statusCode === 500 && err.stack) {
      console.error(err.stack);
    }

    res.status(statusCode).json({
      success: false,
      error: {
        message,
        statusCode,
        timestamp: new Date().toISOString(),
        ...(this.config.nodeEnv === 'development' && { stack: err.stack }),
      },
    });
  };
}
