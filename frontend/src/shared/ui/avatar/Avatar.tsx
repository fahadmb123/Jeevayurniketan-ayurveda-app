import React from 'react';
import './Avatar.css';

export interface AvatarProps {
  initials: string;
  gradientIndex?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  initials,
  gradientIndex = 0,
  size = 'md',
  className = '',
}) => {
  const gradientClass = `app-avatar--gradient-${(gradientIndex % 3) + 1}`;

  return (
    <div className={`app-avatar app-avatar--${size} ${gradientClass} ${className}`}>
      {initials}
    </div>
  );
};
