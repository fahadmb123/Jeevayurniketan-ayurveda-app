import type { IConsultationRequestRepository } from '../../core/repositories/IConsultationRequestRepository.js';
import type { ConsultationRequestDTO } from '../dtos/ConsultationRequestDTO.js';

export class GetConsultationRequestsUseCase {
  constructor(private readonly repository: IConsultationRequestRepository) {}

  public async execute(): Promise<ConsultationRequestDTO[]> {
    const requests = await this.repository.findAll();
    return requests.map((request) => request.toJSON());
  }
}
