import type { Patient } from '../types';

export const INITIAL_PATIENTS: Patient[] = [
  { id: 1, name: 'Ananya Patel', age: 34, lastVisit: 'Today', status: 'In treatment', phone: '+91 98765 11001', condition: 'Chronic Anxiety' },
  { id: 2, name: 'Rahul Verma', age: 45, lastVisit: 'Yesterday', status: 'Recovered', phone: '+91 98765 22002', condition: 'Tension Cephalea' },
  { id: 3, name: 'Sunita Rao', age: 29, lastVisit: '18 Sep', status: 'In treatment', phone: '+91 98765 33003', condition: 'Somatoform Disorder' },
  { id: 4, name: 'Vikram Singh', age: 52, lastVisit: '15 Sep', status: 'Consultation', phone: '+91 98765 44004', condition: 'Workplace Burnout' },
];

export const patientService = {
  async getPatients(): Promise<Patient[]> {
    return INITIAL_PATIENTS;
  },

  async addPatient(patient: Omit<Patient, 'id'>): Promise<Patient> {
    const newPatient: Patient = {
      ...patient,
      id: Date.now(),
    };
    return newPatient;
  },
};
