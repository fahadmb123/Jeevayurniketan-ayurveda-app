import { BaseRoute } from '../BaseRoute.js';
import type { DoctorController } from '../../controllers/doctor/doctor.controller.js';

export class DoctorRoutes extends BaseRoute {
  constructor(private readonly doctorController: DoctorController) {
    super('/doctor');
    this.initializeRoutes();
  }

  protected initializeRoutes(): void {
    this.router.post('/login', this.doctorController.login);
  }
}
