import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, LockKeyhole } from 'lucide-react';
import { motion } from 'framer-motion';
import { ROUTES } from '@/shared/config/routes';
import { BrandLogo } from '@/shared/ui/BrandLogo';
import { Button } from '@/shared/ui/button';
import './AuthPages.css';

export const ResetPasswordPage: React.FC = React.memo(() => {
  const [completed, setCompleted] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password.length >= 8 && password === confirmation) setCompleted(true);
  };

  return (
    <div className="auth-page">
      <motion.div className="auth-card auth-recovery-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Link to={ROUTES.LOGIN} className="auth-recovery-back"><ArrowLeft size={16} /> Back to sign in</Link>
        <div className="auth-header"><BrandLogo linkTo={ROUTES.HOME} size="lg" className="auth-brand-logo" /><h1 className="auth-title">Create a new password</h1><p className="auth-subtitle">Choose a strong password to protect your clinical account.</p></div>
        {completed ? <div className="auth-recovery-success"><CheckCircle2 size={22} /><strong>Password updated</strong><span>Your password has been changed successfully.</span><Link to={ROUTES.LOGIN} className="auth-form__text-btn">Continue to sign in</Link></div> : <form className="auth-form auth-recovery-form" onSubmit={handleSubmit} noValidate><div className="auth-form__group"><label htmlFor="newPassword">New Password</label><div className="auth-form__input-wrap"><LockKeyhole size={18} className="auth-form__icon" /><input id="newPassword" type="password" minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} required /></div></div><div className="auth-form__group"><label htmlFor="confirmPassword">Confirm Password</label><div className="auth-form__input-wrap"><LockKeyhole size={18} className="auth-form__icon" /><input id="confirmPassword" type="password" minLength={8} value={confirmation} onChange={(event) => setConfirmation(event.target.value)} required /></div></div><Button type="submit" variant="primary" className="auth-form__submit">Update password</Button></form>}
      </motion.div>
    </div>
  );
});

ResetPasswordPage.displayName = 'ResetPasswordPage';
