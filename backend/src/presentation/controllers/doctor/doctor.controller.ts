import type { NextFunction, Request, Response } from 'express';
import { BaseController } from '../BaseController.js';

export class DoctorController extends BaseController {
  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email } = req.body as { email?: string };
      this.sendOk(res, { message: 'Doctor login endpoint', email: email ?? null });
    } catch (error) {
      next(error);
    }
  };
}
