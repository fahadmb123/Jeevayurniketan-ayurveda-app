import type { Request, Response, NextFunction } from 'express';
import { BaseController } from '../../shared/controllers/BaseController.js';
import { ConsultationRequestService } from '../../application/services/ConsultationRequestService.js';
import type { UpdateConsultationStatusDTO } from '../../application/dtos/ConsultationRequestDTO.js';

export class ConsultationRequestController extends BaseController {
  constructor(private readonly service: ConsultationRequestService) {
    super();
  }

  public getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.service.getAllRequests();
      this.sendOk(res, data);
    } catch (error) {
      next(error);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = String(req.params.id);
      const data = await this.service.getRequestById(id);
      this.sendOk(res, data);
    } catch (error) {
      next(error);
    }
  };

  public updateStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = String(req.params.id);
      const dto = req.body as UpdateConsultationStatusDTO;
      const data = await this.service.updateRequestStatus(id, dto);
      this.sendOk(res, data);
    } catch (error) {
      next(error);
    }
  };
}
