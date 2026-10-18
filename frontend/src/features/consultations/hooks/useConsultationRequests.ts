import { useState, useEffect, useCallback, useMemo } from 'react';
import type { ConsultationRequest } from '../types';
import { consultationService } from '../services/consultationService';

export const useConsultationRequests = () => {
  const [requests, setRequests] = useState<ConsultationRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    consultationService.getRequests().then((data) => {
      setRequests(data);
      setLoading(false);
    });

    const unsubscribe = consultationService.subscribe((updated) => {
      setRequests(updated);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const acceptRequest = useCallback(async (id: string) => {
    return await consultationService.acceptRequest(id);
  }, []);

  const rejectRequest = useCallback(async (id: string, reason?: string) => {
    return await consultationService.rejectRequest(id, reason);
  }, []);

  const { pendingCount, acceptedCount, rejectedCount } = useMemo(() => {
    let pending = 0;
    let accepted = 0;
    let rejected = 0;
    for (const r of requests) {
      if (r.status === 'pending') pending++;
      else if (r.status === 'accepted') accepted++;
      else if (r.status === 'rejected') rejected++;
    }
    return {
      pendingCount: pending,
      acceptedCount: accepted,
      rejectedCount: rejected,
    };
  }, [requests]);

  return {
    requests,
    loading,
    pendingCount,
    acceptedCount,
    rejectedCount,
    acceptRequest,
    rejectRequest,
  };
};
