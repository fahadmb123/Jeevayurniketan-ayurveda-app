import type { ClinicalRecord } from '../types';

export const INITIAL_RECORDS: ClinicalRecord[] = [
  {
    id: 'REC-2026-001',
    patientName: 'Ananya Patel',
    date: '17 Oct 2026',
    condition: 'Chronic Anxiety & Insomnia',
    therapy: 'Smriti Meditation Session 3 + Brahmi Rasayana',
    status: 'Active',
  },
  {
    id: 'REC-2026-002',
    patientName: 'Rahul Verma',
    date: '16 Oct 2026',
    condition: 'Tension Cephalea (Vata-Pitta)',
    therapy: 'Shirodhara protocol + Herbal decoctions',
    status: 'Complete',
  },
  {
    id: 'REC-2026-003',
    patientName: 'Sunita Rao',
    date: '18 Sep 2026',
    condition: 'Somatoform Gastrointestinal Distress',
    therapy: 'Satvavajaya Chikitsa + Takradhara',
    status: 'Active',
  },
  {
    id: 'REC-2026-004',
    patientName: 'Vikram Singh',
    date: '15 Sep 2026',
    condition: 'Workplace Burnout & Stress',
    therapy: 'Preliminary Psychosomatic Assessment',
    status: 'Complete',
  },
];

export const recordsService = {
  async getRecords(): Promise<ClinicalRecord[]> {
    return INITIAL_RECORDS;
  },
};
