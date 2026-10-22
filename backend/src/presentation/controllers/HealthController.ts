import type { Request, Response, NextFunction } from 'express';
import { BaseController } from './BaseController.js';
import { HealthService } from '../../application/services/health.service.js';

export class HealthController extends BaseController {
  constructor(private readonly healthService: HealthService) {
    super();
  }

  public getHealth = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const healthData = await this.healthService.getHealth();
      this.sendOk(res, healthData);
    } catch (error) {
      next(error);
    }
  };
}
