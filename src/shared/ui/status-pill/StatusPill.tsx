import React from 'react';
import './StatusPill.css';

export interface StatusPillProps {
  status: string;
  variant?: 'success' | 'pending' | 'info' | 'danger' | 'neutral';
  className?: string;
}

export const StatusPill: React.FC<StatusPillProps> = React.memo(({
  status,
  variant = 'info',
  className = '',
}) => {
  return (
    <span className={`app-status-pill app-status-pill--${variant} ${className}`}>
      {status}
    </span>
  );
});

StatusPill.displayName = 'StatusPill';
