import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Send, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { ROUTES } from '@/shared/config/routes';
import { BrandLogo } from '@/shared/ui/BrandLogo';
import { Button } from '@/shared/ui/button';
import './AuthPages.css';

export const ForgotPasswordPage: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="auth-page">
      <motion.div className="auth-card auth-recovery-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Link to={ROUTES.LOGIN} className="auth-recovery-back"><ArrowLeft size={16} /> Back to sign in</Link>
        <div className="auth-header">
          <BrandLogo linkTo={ROUTES.HOME} size="lg" className="auth-brand-logo" />
          <h1 className="auth-title">Reset your password</h1>
          <p className="auth-subtitle">Enter your account email and we’ll help you regain access to your sanctuary.</p>
        </div>
        {submitted ? (
          <div className="auth-recovery-success"><ShieldCheck size={22} /><strong>Check your inbox</strong><span>If an account exists for {email}, password reset instructions will be sent shortly.</span><button type="button" onClick={() => navigate(ROUTES.LOGIN)} className="auth-form__text-btn">Return to sign in</button></div>
        ) : (
          <form className="auth-form auth-recovery-form" onSubmit={handleSubmit} noValidate>
            <div className="auth-form__group"><label htmlFor="recoveryEmail">Email Address</label><div className="auth-form__input-wrap"><Mail size={18} className="auth-form__icon" /><input id="recoveryEmail" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required /></div></div>
            <Button type="submit" variant="primary" className="auth-form__submit"><Send size={17} /> Send reset instructions</Button>
          </form>
        )}
      </motion.div>
    </div>
  );
});

ForgotPasswordPage.displayName = 'ForgotPasswordPage';
