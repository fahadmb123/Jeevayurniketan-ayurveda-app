import type { Patient } from './types';

export const RECENT_PATIENTS: Patient[] = [
  { id: 1, name: 'Ananya Patel', age: 34, lastVisit: 'Today', status: 'In treatment' },
  { id: 2, name: 'Rahul Verma', age: 45, lastVisit: 'Yesterday', status: 'Recovered' },
  { id: 3, name: 'Sunita Rao', age: 29, lastVisit: '18 Sep', status: 'In treatment' },
  { id: 4, name: 'Vikram Singh', age: 52, lastVisit: '15 Sep', status: 'Consultation' }
];
