import type { IConsultationRequestRepository } from '../../core/repositories/IConsultationRequestRepository.js';
import type { ConsultationRequestDTO, UpdateConsultationStatusDTO } from '../dtos/ConsultationRequestDTO.js';
import { GetConsultationRequestsUseCase } from '../use-cases/GetConsultationRequestsUseCase.js';
import { UpdateConsultationStatusUseCase } from '../use-cases/UpdateConsultationStatusUseCase.js';
import { AppError } from '../errors/AppError.js';

export class ConsultationRequestService {
  private readonly getConsultationRequestsUseCase: GetConsultationRequestsUseCase;
  private readonly updateConsultationStatusUseCase: UpdateConsultationStatusUseCase;

  constructor(private readonly repository: IConsultationRequestRepository) {
    this.getConsultationRequestsUseCase = new GetConsultationRequestsUseCase(this.repository);
    this.updateConsultationStatusUseCase = new UpdateConsultationStatusUseCase(this.repository);
  }

  public async getAllRequests(): Promise<ConsultationRequestDTO[]> {
    return this.getConsultationRequestsUseCase.execute();
  }

  public async getRequestById(id: string): Promise<ConsultationRequestDTO> {
    const request = await this.repository.findById(id);
    if (!request) {
      throw new AppError(`Consultation request with ID ${id} not found`, 404);
    }
    return request.toJSON();
  }

  public async updateRequestStatus(id: string, dto: UpdateConsultationStatusDTO): Promise<ConsultationRequestDTO> {
    return this.updateConsultationStatusUseCase.execute(id, dto);
  }
}
