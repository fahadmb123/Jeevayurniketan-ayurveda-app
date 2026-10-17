import type { Appointment } from './types';

export const TODAY_APPOINTMENTS: Appointment[] = [
  { id: 1, time: '10:00', meridian: 'AM', patient: 'Meera N', type: 'Consultation', status: 'next' },
  { id: 2, time: '11:30', meridian: 'AM', patient: 'Karan J', type: 'Follow up', status: 'upcoming' },
  { id: 3, time: '02:00', meridian: 'PM', patient: 'Priya D', type: 'Video Consult', status: 'upcoming', isVideo: true },
  { id: 4, time: '04:15', meridian: 'PM', patient: 'Arjun M', type: 'Therapy Session', status: 'upcoming' }
];
