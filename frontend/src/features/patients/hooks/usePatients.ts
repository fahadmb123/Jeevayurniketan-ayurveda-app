import { useState, useEffect, useCallback } from 'react';
import type { Patient } from '../types';
import { patientService } from '../services/patientService';

export const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    patientService.getPatients().then((data) => {
      setPatients(data);
      setLoading(false);
    });
  }, []);

  const addPatient = useCallback(async (newPatient: Omit<Patient, 'id'>) => {
    const created = await patientService.addPatient(newPatient);
    setPatients((prev) => [created, ...prev]);
    return created;
  }, []);

  return {
    patients,
    loading,
    addPatient,
  };
};
