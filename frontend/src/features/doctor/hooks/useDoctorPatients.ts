import { useState, useEffect } from 'react';
import { doctorService } from '../services/doctorService';
import type { Patient } from '../types';

export const useDoctorPatients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    doctorService.getPatients().then((data) => {
      if (mounted) {
        setPatients(data);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const addPatient = async (patientData: Omit<Patient, 'id'>) => {
    const newPt = await doctorService.addPatient(patientData);
    setPatients((prev) => [newPt, ...prev]);
    return newPt;
  };

  return { patients, setPatients, addPatient, loading };
};
