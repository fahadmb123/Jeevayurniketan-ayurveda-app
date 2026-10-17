import React, { useState } from 'react';
import { Mail, Lock, User as UserIcon, Phone, UserPlus, ArrowLeft } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import type { RegisterData } from '../types';

interface RegisterFormProps {
  onSubmit: (data: RegisterData) => Promise<void>;
  isLoading?: boolean;
  onSwitchToLogin?: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  isLoading = false,
  onSwitchToLogin,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'patient' | 'doctor'>('patient');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    onSubmit({ name, email, phone, password, role });
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <div className="auth-form__group">
        <label htmlFor="regName">Full Name</label>
        <div className="auth-form__input-wrap">
          <UserIcon size={18} className="auth-form__icon" />
          <input
            id="regName"
            type="text"
            required
            placeholder="Dr. / Mr. / Ms. Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>

      <div className="auth-form__group">
        <label htmlFor="regEmail">Email Address</label>
        <div className="auth-form__input-wrap">
          <Mail size={18} className="auth-form__icon" />
          <input
            id="regEmail"
            type="email"
            required
            placeholder="you@jeevayurniketan.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="auth-form__group">
        <label htmlFor="regPhone">Phone Number</label>
        <div className="auth-form__input-wrap">
          <Phone size={18} className="auth-form__icon" />
          <input
            id="regPhone"
            type="tel"
            placeholder="+91 98765 43210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>

      <div className="auth-form__group">
        <label htmlFor="regRole">Account Type</label>
        <div className="auth-form__role-selector">
          <button
            type="button"
            className={`auth-form__role-btn ${role === 'patient' ? 'active' : ''}`}
            onClick={() => setRole('patient')}
          >
            Patient / Client
          </button>
          <button
            type="button"
            className={`auth-form__role-btn ${role === 'doctor' ? 'active' : ''}`}
            onClick={() => setRole('doctor')}
          >
            Doctor / Practitioner
          </button>
        </div>
      </div>

      <div className="auth-form__group">
        <label htmlFor="regPassword">Password</label>
        <div className="auth-form__input-wrap">
          <Lock size={18} className="auth-form__icon" />
          <input
            id="regPassword"
            type="password"
            required
            placeholder="At least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <Button type="submit" variant="primary" disabled={isLoading} className="auth-form__submit">
        {isLoading ? (
          'Creating Account...'
        ) : (
          <>
            <UserPlus size={18} />
            <span>Create Account</span>
          </>
        )}
      </Button>

      {onSwitchToLogin && (
        <div className="auth-form__footer">
          <button type="button" onClick={onSwitchToLogin} className="auth-form__text-btn">
            <ArrowLeft size={14} /> Back to Sign In
          </button>
        </div>
      )}
    </form>
  );
};
