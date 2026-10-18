import { Router } from 'express';
import { RootController } from '../controllers/RootController.js';
import { HealthRoutes } from './HealthRoutes.js';

export class ApiRoutes {
  public readonly router: Router;

  constructor(
    private readonly rootController: RootController,
    private readonly healthRoutes: HealthRoutes
  ) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.rootController.getApiIndex);
    this.router.use('/health', this.healthRoutes.router);
  }
}
