import { useState, useCallback } from 'react';
import { contactService } from '../services/contactService';
import type { ContactMessage } from '../types';

export const useContact = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (message: ContactMessage) => {
    setLoading(true);
    setError(null);
    try {
      await contactService.sendMessage(message);
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setSuccess(false);
    setError(null);
    setLoading(false);
  }, []);

  return { sendMessage, loading, success, error, reset };
};
