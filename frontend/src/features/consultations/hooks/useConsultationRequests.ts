import { useState, useEffect, useCallback } from 'react';
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

  const pendingCount = requests.filter((r) => r.status === 'pending').length;
  const acceptedCount = requests.filter((r) => r.status === 'accepted').length;
  const rejectedCount = requests.filter((r) => r.status === 'rejected').length;

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
