import { useState, useEffect } from 'react';
import { treatmentService } from '../services/treatmentService';
import type { AyurvedaService, FaqItem } from '../types';

export const useTreatments = () => {
  const [services, setServices] = useState<AyurvedaService[]>([]);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    Promise.all([treatmentService.getServices(), treatmentService.getFaqs()]).then(
      ([svcData, faqData]) => {
        if (mounted) {
          setServices(svcData);
          setFaqs(faqData);
          setLoading(false);
        }
      }
    );
    return () => {
      mounted = false;
    };
  }, []);

  return { services, faqs, loading };
};
