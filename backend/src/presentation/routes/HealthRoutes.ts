import { Router } from 'express';
import { HealthController } from '../controllers/HealthController.js';

export class HealthRoutes {
  public readonly router: Router;

  constructor(private readonly healthController: HealthController) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.healthController.getHealth);
  }
}
