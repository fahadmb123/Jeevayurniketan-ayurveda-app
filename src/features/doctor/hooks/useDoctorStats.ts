import { useState, useEffect } from 'react';
import { doctorService } from '../services/doctorService';
import type { DoctorStatItem } from '../types';

export const useDoctorStats = () => {
  const [stats, setStats] = useState<DoctorStatItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    doctorService.getStats().then((data) => {
      if (mounted) {
        setStats(data);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return { stats, loading };
};
