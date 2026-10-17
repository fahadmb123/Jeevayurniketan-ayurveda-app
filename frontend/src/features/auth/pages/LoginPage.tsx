import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES } from '@/shared/config/routes';
import { LoginForm } from '../components/LoginForm';
import { useAuth } from '../hooks/useAuth';
import type { LoginCredentials } from '../types';
import './AuthPages.css';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, loading, error: authError } = useAuth();
  const [localError, setLocalError] = useState<string | null>(null);

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      setLocalError(null);
      const user = await login(credentials);
      if (user.role === 'doctor') {
        navigate(ROUTES.DOCTOR);
      } else {
        navigate(ROUTES.HOME);
      }
    } catch (err: unknown) {
      setLocalError(err instanceof Error ? err.message : 'Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="auth-page">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="auth-card"
      >
        <div className="auth-header">
          <Link to={ROUTES.HOME} className="auth-logo">
            <img src="/android-chrome-512x512.png" alt="Jeevayurniketan Logo" />
            <span>Jeevayurniketan</span>
          </Link>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your practitioner or patient account</p>
        </div>

        {(localError || authError) && (
          <div className="auth-alert-error">{localError || authError}</div>
        )}

        <LoginForm
          onSubmit={handleLogin}
          isLoading={loading}
          onSwitchToRegister={() => navigate(ROUTES.REGISTER || '/register')}
        />
      </motion.div>
    </div>
  );
};
