import React from 'react';

export type AppointmentStatus = 'next' | 'upcoming' | 'completed';

export interface Appointment {
  id: number;
  time: string;
  meridian: 'AM' | 'PM';
  patient: string;
  type: string;
  status: AppointmentStatus;
  isVideo?: boolean;
}

export type PatientStatus = 'In treatment' | 'Recovered' | 'Consultation';

export interface Patient {
  id: number;
  name: string;
  age: number;
  lastVisit: string;
  status: PatientStatus;
  phone?: string;
  email?: string;
  gender?: string;
  condition?: string;
}

export interface DoctorStatItem {
  id: string;
  title: string;
  value: string;
  trend: string;
  variant: 'green' | 'blue' | 'orange';
  icon: React.ReactNode;
}

export interface ClinicalRecord {
  id: string;
  patientName: string;
  date: string;
  condition: string;
  therapy: string;
  status: 'Complete' | 'Active';
}

export interface DoctorNavItem {
  id: string;
  label: string;
  path: string;
  icon: React.ReactNode;
}

export interface DoctorProfile {
  name: string;
  specialty: string;
  email: string;
  phone: string;
  consultDuration: string;
  emailAlerts: boolean;
  smsAlerts: boolean;
}
