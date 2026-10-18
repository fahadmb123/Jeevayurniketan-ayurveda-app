import { useState, useEffect } from 'react';
import type { ClinicalRecord } from '../types';
import { recordsService } from '../services/recordsService';

export const useClinicalRecords = () => {
  const [records, setRecords] = useState<ClinicalRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    recordsService.getRecords().then((data) => {
      setRecords(data);
      setLoading(false);
    });
  }, []);

  return {
    records,
    loading,
  };
};
