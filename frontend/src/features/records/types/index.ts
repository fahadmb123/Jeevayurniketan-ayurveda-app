export interface ClinicalRecord {
  id: string;
  patientName: string;
  date: string;
  condition: string;
  therapy: string;
  status: 'Complete' | 'Active';
}
