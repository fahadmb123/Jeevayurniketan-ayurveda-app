import { Activity, Users, Calendar, FileText, Settings } from 'lucide-react';
import { ROUTES } from '@/shared/config/routes';
import type { DoctorNavItem } from './types';

export const DOCTOR_NAV_ITEMS: DoctorNavItem[] = [
  { id: 'dashboard', label: 'Dashboard', path: ROUTES.DOCTOR, icon: <Activity size={20} /> },
  { id: 'patients', label: 'Patients', path: ROUTES.DOCTOR_PATIENTS, icon: <Users size={20} /> },
  { id: 'appointments', label: 'Appointments', path: ROUTES.DOCTOR_APPOINTMENTS, icon: <Calendar size={20} /> },
  { id: 'records', label: 'Clinical Records', path: ROUTES.DOCTOR_RECORDS, icon: <FileText size={20} /> },
  { id: 'settings', label: 'Settings', path: ROUTES.DOCTOR_SETTINGS, icon: <Settings size={20} /> }
];
