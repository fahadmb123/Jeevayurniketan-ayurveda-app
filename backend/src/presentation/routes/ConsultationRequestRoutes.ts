import { BaseRoute } from './BaseRoute.js';
import { ConsultationRequestController } from '../controllers/ConsultationRequestController.js';

export class ConsultationRequestRoutes extends BaseRoute {
  constructor(private readonly controller: ConsultationRequestController) {
    super('/consultation-requests');
    this.initializeRoutes();
  }

  protected initializeRoutes(): void {
    this.router.get('/', this.controller.getAll);
    this.router.get('/:id', this.controller.getById);
    this.router.patch('/:id/status', this.controller.updateStatus);
  }
}
