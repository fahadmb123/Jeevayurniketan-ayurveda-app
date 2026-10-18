import React from 'react';
import logoSvg from '@/assets/logo.svg';
import './LoadingScreen.css';

export interface LoadingScreenProps {
  /**
   * If true, covers the entire viewport with a fixed overlay.
   * If false, renders inline within the current layout container.
   * @default true
   */
  fullScreen?: boolean;
  /**
   * Optional custom status or loading message.
   * @default 'Loading experience...'
   */
  message?: string;
  /**
   * Whether to display the animated logo.
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
  message = 'Loading experience...',
  showLogo = true,
  className = '',
}) => {
  const containerClasses = [
    'loading-screen',
    fullScreen ? 'loading-screen--fullscreen' : 'loading-screen--inline',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={containerClasses}
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <div className="loading-screen__backdrop" />

      <div className="loading-screen__card">
        {showLogo && (
          <div className="loading-screen__logo-wrapper">
            <div className="loading-screen__aura" />
            <img
              src={logoSvg}
              alt="Jeevayurniketan Loading"
              className="loading-screen__logo"
              width={180}
              height={180}
            />
          </div>
        )}

        <div className="loading-screen__indicator-wrap">
          <div className="loading-screen__progress-track">
            <div className="loading-screen__progress-bar" />
          </div>

          <div className="loading-screen__status">
            <span className="loading-screen__dots">
              <span className="loading-screen__dot" />
              <span className="loading-screen__dot" />
              <span className="loading-screen__dot" />
            </span>
            <p className="loading-screen__message">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

LoadingScreen.displayName = 'LoadingScreen';
