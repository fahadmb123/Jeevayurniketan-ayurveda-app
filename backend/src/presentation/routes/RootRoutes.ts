import { BaseRoute } from './BaseRoute.js';
import { RootController } from '../controllers/RootController.js';

export class RootRoutes extends BaseRoute {
  constructor(private readonly rootController: RootController) {
    super('/');
    this.initializeRoutes();
  }

  protected initializeRoutes(): void {
    this.router.get('/', this.rootController.getRoot);
  }
}
