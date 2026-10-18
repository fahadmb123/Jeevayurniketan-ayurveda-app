import type { Request, Response } from 'express';
import { BaseController } from './BaseController.js';
import { EnvironmentConfig } from '../../config/EnvironmentConfig.js';

export class RootController extends BaseController {
  constructor(private readonly config: EnvironmentConfig) {
    super();
  }

  public getRoot = (_req: Request, res: Response): void => {
    this.sendOk(res, {
      message: 'Welcome to Jeevayurniketan Ayurveda & Psychotherapy API',
      status: 'online',
      port: this.config.port,
      apiDocs: '/api',
      healthCheck: '/health',
    });
  };

  public getApiIndex = (_req: Request, res: Response): void => {
    this.sendOk(res, {
      name: 'Jeevayurniketan API',
      version: '1.0.0',
      description: 'Ayurveda & Psychotherapy Clinical Services Backend',
      endpoints: {
        health: '/api/health',
      },
    });
  };
}
