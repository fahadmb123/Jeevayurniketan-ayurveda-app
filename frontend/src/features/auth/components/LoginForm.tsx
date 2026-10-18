import React, { useState, useCallback } from 'react';
import { Mail, Lock, LogIn, ArrowRight } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import type { LoginCredentials } from '../types';

interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => Promise<void>;
  isLoading?: boolean;
  onSwitchToRegister?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = React.memo(({
  onSubmit,
  isLoading = false,
  onSwitchToRegister,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    onSubmit({ email, password, rememberMe });
  }, [email, password, rememberMe, onSubmit]);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, []);

  const handleRememberMeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="auth-form__group">
        <label htmlFor="loginEmail">Email Address</label>
        <div className="auth-form__input-wrap">
          <Mail size={18} className="auth-form__icon" />
          <input
            id="loginEmail"
            type="email"
            required
            placeholder="doctor@jeevayurniketan.com"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
      </div>

      <div className="auth-form__group">
        <div className="auth-form__label-row">
          <label htmlFor="loginPassword">Password</label>
          <a href="#forgot" className="auth-form__link" onClick={(e) => e.preventDefault()}>
            Forgot password?
          </a>
        </div>
        <div className="auth-form__input-wrap">
          <Lock size={18} className="auth-form__icon" />
          <input
            id="loginPassword"
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
      </div>

      <div className="auth-form__checkbox">
        <label>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={handleRememberMeChange}
          />
          <span>Remember me for 30 days</span>
        </label>
      </div>

      <Button type="submit" variant="primary" disabled={isLoading} className="auth-form__submit">
        {isLoading ? (
          'Signing in...'
        ) : (
          <>
            <LogIn size={18} />
            <span>Sign In</span>
          </>
        )}
      </Button>

      {onSwitchToRegister && (
        <div className="auth-form__footer">
          <span>Don't have an account?</span>
          <button type="button" onClick={onSwitchToRegister} className="auth-form__text-btn">
            Create an account <ArrowRight size={14} />
          </button>
        </div>
      )}
    </form>
  );
});

LoginForm.displayName = 'LoginForm';

