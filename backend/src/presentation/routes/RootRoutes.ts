import { Router } from 'express';
import { RootController } from '../controllers/RootController.js';

export class RootRoutes {
  public readonly router: Router;

  constructor(private readonly rootController: RootController) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/', this.rootController.getRoot);
  }
}
