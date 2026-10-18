export type ConsultationRequestStatus = 'pending' | 'accepted' | 'rejected';

export type ConsultationMode = 'In-Person' | 'Video Call' | 'Phone';

export interface ConsultationRequest {
  id: string;
  patientName: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  email: string;
  city?: string;
  service: string;
  mode: ConsultationMode;
  preferredDate: string;
  preferredTimeSlot: string;
  primaryConcern: string;
  symptoms: string[];
  notes?: string;
  requestedAt: string;
  status: ConsultationRequestStatus;
  rejectionReason?: string;
  acceptedAt?: string;
}

export type ConsultationFilterOption = 'All' | 'Pending' | 'Accepted' | 'Rejected';
