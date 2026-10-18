import type { ConsultationRequestProps } from '../../core/domain/entities/ConsultationRequest.js';

export type ConsultationRequestDTO = ConsultationRequestProps;

export interface UpdateConsultationStatusDTO {
  status: 'accepted' | 'rejected';
  rejectionReason?: string;
}
