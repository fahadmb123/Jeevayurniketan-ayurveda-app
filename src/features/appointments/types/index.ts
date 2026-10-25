export type AppointmentStatus = 'next' | 'upcoming' | 'completed';

export interface Appointment {
  id: number;
  time: string;
  meridian: 'AM' | 'PM';
  patient: string;
  type: string;
  status: AppointmentStatus;
  isVideo?: boolean;
}

export interface BookingFormData {
  fullName: string;
  phone: string;
  service: string;
  preferredDate: string;
  notes?: string;
}

export interface AppointmentConfirmation {
  id: string;
  referenceNumber: string;
  booking: BookingFormData;
  status: 'confirmed' | 'pending';
  createdAt: string;
}
