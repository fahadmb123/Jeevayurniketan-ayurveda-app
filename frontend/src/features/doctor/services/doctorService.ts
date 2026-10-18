import React from 'react';
import { Users, Calendar, FileText, Inbox } from 'lucide-react';
import type { DoctorStatItem } from '../types';
import { appointmentService, type Appointment } from '@/features/appointments';
import { patientService, type Patient } from '@/features/patients';
import { recordsService, type ClinicalRecord } from '@/features/records';

export const INITIAL_STATS: DoctorStatItem[] = [
  {
    id: 'consultation-requests',
    title: 'Inbound Requests',
    value: '3',
    trend: 'Pending review',
    variant: 'orange',
    icon: React.createElement(Inbox, { size: 22 }),
  },
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
    title: 'Clinical Records',
    value: '28',
    trend: 'Updated today',
    variant: 'green',
    icon: React.createElement(FileText, { size: 22 }),
  },
];

export const doctorService = {
  async getStats(): Promise<DoctorStatItem[]> {
    return INITIAL_STATS;
  },

  async getAppointments(): Promise<Appointment[]> {
    return appointmentService.getAppointments();
  },

  async getPatients(): Promise<Patient[]> {
    return patientService.getPatients();
  },

  async getRecords(): Promise<ClinicalRecord[]> {
    return recordsService.getRecords();
  },

  async addPatient(patient: Omit<Patient, 'id'>): Promise<Patient> {
    return patientService.addPatient(patient);
  },
};
