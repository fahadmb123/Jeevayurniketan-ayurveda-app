import { useState, useEffect } from 'react';
import { doctorService } from '../services/doctorService';
import type { Appointment } from '../types';

export const useDoctorAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    doctorService.getAppointments().then((data) => {
      if (mounted) {
        setAppointments(data);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return { appointments, setAppointments, loading };
};
