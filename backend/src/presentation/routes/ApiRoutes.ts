import { BaseRoute } from './BaseRoute.js';
import { RootController } from '../controllers/RootController.js';
import type { IRoute } from './IRoute.js';

export class ApiRoutes extends BaseRoute {
  private readonly subRoutes: IRoute[];

  constructor(
    private readonly rootController: RootController,
    subRoutes: IRoute[]
  ) {
    super('/api');
    this.subRoutes = subRoutes;
    this.initializeRoutes();
  }

  protected initializeRoutes(): void {
    this.router.get('/', this.rootController.getApiIndex);
    for (const subRoute of this.subRoutes) {
      this.router.use(subRoute.path, subRoute.router);
    }
  }
}
