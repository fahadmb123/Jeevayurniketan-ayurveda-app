import React from 'react';
import './Card.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = React.memo(({
  children,
  interactive = false,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`app-card ${interactive ? 'app-card--interactive' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';
