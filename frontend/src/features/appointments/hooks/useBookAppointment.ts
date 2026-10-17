import { useState } from 'react';
import { appointmentService } from '../services/appointmentService';
import type { AppointmentConfirmation, BookingFormData } from '../types';

export const useBookAppointment = () => {
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState<AppointmentConfirmation | null>(null);
  const [error, setError] = useState<string | null>(null);

  const book = async (data: BookingFormData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await appointmentService.bookAppointment(data);
      setConfirmation(result);
      return result;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to book appointment';
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setConfirmation(null);
    setError(null);
    setLoading(false);
  };

  return {
    book,
    confirmation,
    loading,
    error,
    reset,
  };
};
