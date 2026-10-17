import React from 'react';

export interface DoctorStatItem {
  id: string;
  title: string;
  value: string;
  trend: string;
  variant: 'green' | 'blue' | 'orange';
  icon: React.ReactNode;
}
