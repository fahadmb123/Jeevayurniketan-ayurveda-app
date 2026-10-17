import React from 'react';
import { Users, Calendar, FileText } from 'lucide-react';
import type { Appointment, ClinicalRecord, DoctorStatItem, Patient } from '../types';

export const INITIAL_APPOINTMENTS: Appointment[] = [
  { id: 1, time: '10:00', meridian: 'AM', patient: 'Meera N', type: 'Consultation', status: 'next' },
  { id: 2, time: '11:30', meridian: 'AM', patient: 'Karan J', type: 'Follow up', status: 'upcoming' },
  { id: 3, time: '02:00', meridian: 'PM', patient: 'Priya D', type: 'Video Consult', status: 'upcoming', isVideo: true },
  { id: 4, time: '04:15', meridian: 'PM', patient: 'Arjun M', type: 'Therapy Session', status: 'upcoming' },
];

export const INITIAL_PATIENTS: Patient[] = [
  { id: 1, name: 'Ananya Patel', age: 34, lastVisit: 'Today', status: 'In treatment', phone: '+91 98765 11001', condition: 'Chronic Anxiety' },
  { id: 2, name: 'Rahul Verma', age: 45, lastVisit: 'Yesterday', status: 'Recovered', phone: '+91 98765 22002', condition: 'Tension Cephalea' },
  { id: 3, name: 'Sunita Rao', age: 29, lastVisit: '18 Sep', status: 'In treatment', phone: '+91 98765 33003', condition: 'Somatoform Disorder' },
  { id: 4, name: 'Vikram Singh', age: 52, lastVisit: '15 Sep', status: 'Consultation', phone: '+91 98765 44004', condition: 'Workplace Burnout' },
];

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

export const INITIAL_STATS: DoctorStatItem[] = [
  {
    id: 'total-patients',
    title: 'Total Patients',
    value: '1,248',
    trend: '+12% this month',
    variant: 'green',
    icon: React.createElement(Users, { size: 22 }),
  },
  {
    id: 'today-appointments',
    title: "Today's Appointments",
    value: '12',
    trend: '4 Remaining',
    variant: 'blue',
    icon: React.createElement(Calendar, { size: 22 }),
  },
  {
    id: 'pending-reports',
    title: 'Pending Reports',
    value: '5',
    trend: 'Needs attention',
    variant: 'orange',
    icon: React.createElement(FileText, { size: 22 }),
  },
];

export const doctorService = {
  async getStats(): Promise<DoctorStatItem[]> {
    return INITIAL_STATS;
  },

  async getAppointments(): Promise<Appointment[]> {
    return INITIAL_APPOINTMENTS;
  },

  async getPatients(): Promise<Patient[]> {
    return INITIAL_PATIENTS;
  },

  async getRecords(): Promise<ClinicalRecord[]> {
    return INITIAL_RECORDS;
  },

  async addPatient(patient: Omit<Patient, 'id'>): Promise<Patient> {
    const newPatient: Patient = {
      ...patient,
      id: Date.now(),
    };
    return newPatient;
  },
};
