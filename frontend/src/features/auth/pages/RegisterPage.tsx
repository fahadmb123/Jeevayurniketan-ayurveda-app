import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES } from '@/shared/config/routes';
import { RegisterForm } from '../components/RegisterForm';
import { useAuth } from '../hooks/useAuth';
import type { RegisterData } from '../types';
import { BrandLogo } from '@/shared/ui/BrandLogo';
import './AuthPages.css';

export const RegisterPage: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const { register, loading, error: authError } = useAuth();
  const [localError, setLocalError] = useState<string | null>(null);

  const handleRegister = useCallback(async (data: RegisterData) => {
    try {
      setLocalError(null);
      const user = await register(data);
      if (user.role === 'doctor') {
        navigate(ROUTES.DOCTOR);
      } else {
        navigate(ROUTES.HOME);
      }
    } catch (err: unknown) {
      setLocalError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    }
  }, [register, navigate]);

  const handleSwitchToLogin = useCallback(() => {
    navigate(ROUTES.LOGIN || '/login');
  }, [navigate]);

  return (
    <div className="auth-page">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="auth-card"
      >
        <div className="auth-header">
          <BrandLogo linkTo={ROUTES.HOME} size="lg" className="auth-brand-logo" />
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join the Jeevayurniketan healing portal</p>
        </div>

        {(localError || authError) && (
          <div className="auth-alert-error">{localError || authError}</div>
        )}

        <RegisterForm
          onSubmit={handleRegister}
          isLoading={loading}
          onSwitchToLogin={handleSwitchToLogin}
        />
      </motion.div>
    </div>
  );
});

RegisterPage.displayName = 'RegisterPage';

