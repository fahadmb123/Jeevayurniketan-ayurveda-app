import { useState, useEffect } from 'react';
import type { Appointment } from '../types';
import { appointmentService } from '../services/appointmentService';

export const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    appointmentService.getAppointments().then((data) => {
      setAppointments(data);
      setLoading(false);
    });
  }, []);

  return {
    appointments,
    loading,
  };
};
