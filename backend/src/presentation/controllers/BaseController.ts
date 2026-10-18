import type { Response } from 'express';

export abstract class BaseController {
  protected sendOk<T>(res: Response, data: T): void {
    res.status(200).json(data);
  }

  protected sendCreated<T>(res: Response, data: T): void {
    res.status(201).json(data);
  }

  protected sendError(res: Response, message: string, statusCode = 500): void {
    res.status(statusCode).json({
      success: false,
      error: {
        message,
        statusCode,
        timestamp: new Date().toISOString(),
      },
    });
  }
}
