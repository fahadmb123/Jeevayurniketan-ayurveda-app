import { useState, useEffect } from 'react';
import { doctorService } from '../services/doctorService';
import type { ClinicalRecord } from '../types';

export const useDoctorRecords = () => {
  const [records, setRecords] = useState<ClinicalRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    doctorService.getRecords().then((data) => {
      if (mounted) {
        setRecords(data);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return { records, setRecords, loading };
};
