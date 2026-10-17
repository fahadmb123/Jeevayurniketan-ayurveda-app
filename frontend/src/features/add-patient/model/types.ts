import type { PatientStatus } from '@/entities/patient';

export interface NewPatientData {
  name: string;
  age: number;
  status: PatientStatus;
  notes?: string;
}
