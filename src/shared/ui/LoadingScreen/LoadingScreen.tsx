import React from 'react';
import logoSvg from '@/assets/logo.svg';
import './LoadingScreen.css';

export interface LoadingScreenProps {
  /**
   * If true or omitted, covers the entire viewport with a fixed overlay.
   * @default true
   */
  fullScreen?: boolean;
  /**
   * Optional custom status or loading message (retained for backward compatibility).
   */
  message?: string;
  /**
   * Whether to display the logo.
   * @default true
   */
  showLogo?: boolean;
  /**
   * Additional custom CSS class names.
   */
  className?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = React.memo(({
  fullScreen = true,
  className = '',
}) => {
  const containerClasses = [
    'loading-screen',
    fullScreen ? 'loading-screen--fullscreen' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={containerClasses}
      role="status"
      aria-live="polite"
      aria-label="Loading Jeevayurniketan"
    >
      <div className="loading-screen__logo-container">
        <img
          src={logoSvg}
          alt="Jeevayurniketan"
          className="loading-screen__logo"
          width={240}
          height={240}
        />
      </div>
    </div>
  );
});

LoadingScreen.displayName = 'LoadingScreen';
