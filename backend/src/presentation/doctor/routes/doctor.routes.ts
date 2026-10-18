import { BaseRoute } from '../../routes/BaseRoute.js';
import { DoctorController } from '../controllers/doctor.controller.js';

export class DoctorRoutes extends BaseRoute {
  constructor(private readonly doctorController: DoctorController) {
    super('/doctor');
    this.initializeRoutes();
  }

  protected initializeRoutes(): void {
    this.router.post('/login', this.doctorController.login);
  }
}
