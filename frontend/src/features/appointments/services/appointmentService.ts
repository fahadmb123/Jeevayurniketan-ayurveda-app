import type { AppointmentConfirmation, BookingFormData } from '../types';

export const appointmentService = {
  async bookAppointment(data: BookingFormData): Promise<AppointmentConfirmation> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const confirmation: AppointmentConfirmation = {
      id: 'apt_' + Date.now(),
      referenceNumber: 'JEV-' + Math.floor(100000 + Math.random() * 900000),
      booking: data,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    return confirmation;
  },
};
