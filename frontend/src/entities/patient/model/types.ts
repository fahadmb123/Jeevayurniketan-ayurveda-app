export type PatientStatus = 'In treatment' | 'Recovered' | 'Consultation';

export interface Patient {
  id: number;
  name: string;
  age: number;
  lastVisit: string;
  status: PatientStatus;
}
