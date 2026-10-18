import type { ConsultationRequest } from '../domain/entities/ConsultationRequest.js';

export interface IConsultationRequestRepository {
  findAll(): Promise<ConsultationRequest[]>;
  findById(id: string): Promise<ConsultationRequest | null>;
  save(request: ConsultationRequest): Promise<void>;
}
