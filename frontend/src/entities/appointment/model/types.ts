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
