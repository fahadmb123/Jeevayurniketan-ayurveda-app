import { Users, Calendar, FileText } from 'lucide-react';
import type { DoctorStatItem } from './types';

export const DOCTOR_STATS: DoctorStatItem[] = [
  {
    id: 'total-patients',
    title: 'Total Patients',
    value: '1,248',
    trend: '+12% this month',
    variant: 'green',
    icon: <Users size={22} />
  },
  {
    id: 'today-appointments',
    title: "Today's Appointments",
    value: '12',
    trend: '4 Remaining',
    variant: 'blue',
    icon: <Calendar size={22} />
  },
  {
    id: 'pending-reports',
    title: 'Pending Reports',
    value: '5',
    trend: 'Needs attention',
    variant: 'orange',
    icon: <FileText size={22} />
  }
];
