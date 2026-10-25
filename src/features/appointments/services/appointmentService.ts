import type { Appointment, AppointmentConfirmation, BookingFormData } from '../types';

export const INITIAL_APPOINTMENTS: Appointment[] = [
  { id: 1, time: '10:00', meridian: 'AM', patient: 'Meera N', type: 'Consultation', status: 'next' },
  { id: 2, time: '11:30', meridian: 'AM', patient: 'Karan J', type: 'Follow up', status: 'upcoming' },
  { id: 3, time: '02:00', meridian: 'PM', patient: 'Priya D', type: 'Video Consult', status: 'upcoming', isVideo: true },
  { id: 4, time: '04:15', meridian: 'PM', patient: 'Arjun M', type: 'Therapy Session', status: 'upcoming' },
];

export const appointmentService = {
  async getAppointments(): Promise<Appointment[]> {
    return INITIAL_APPOINTMENTS;
  },

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
