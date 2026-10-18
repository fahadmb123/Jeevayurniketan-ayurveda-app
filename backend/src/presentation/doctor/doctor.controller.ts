import type { Request, Response, NextFunction } from 'express';
import { BaseController } from '../../shared/controllers/BaseController.js';

export class DoctorController extends BaseController {
  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email } = req.body as { email?: string; password?: string };
      this.sendOk(res, {
        message: 'Doctor login endpoint',
        email: email ?? null,
      });
    } catch (error) {
      next(error);
    }
  };
}
