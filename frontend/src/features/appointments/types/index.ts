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
