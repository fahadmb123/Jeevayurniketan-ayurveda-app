import React from 'react';
import { useTheme } from '@/shared/context/ThemeContext';
import './ThemeToggle.css';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Dark Mode (Click for Light Mode)' : 'Light Mode (Click for Dark Mode)'}
      className={`astro-theme-toggle ${isDark ? 'astro-theme-toggle--dark' : 'astro-theme-toggle--light'} ${className}`}
      onClick={toggleTheme}
    >
      <div className="astro-theme-toggle__track" />
      <div className="astro-theme-toggle__thumb">
        {isDark ? (
          /* Moon with stars (Dark mode state) */
          <svg
            className="astro-theme-toggle__icon astro-theme-toggle__icon--moon"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {/* Crescent Moon */}
            <path
              d="M11.5 3a8.6 8.6 0 1 0 8.6 8.6c0-.52-.05-1.03-.15-1.53a7.3 7.3 0 0 1-6.92-6.92c-.5-.1-1.01-.15-1.53-.15z"
              fill="currentColor"
            />
            {/* Top Star */}
            <path
              d="M17.5 5.5c0 1.1-.7 1.8-1.8 1.8 1.1 0 1.8.7 1.8 1.8 0-1.1.7-1.8 1.8-1.8-1.1 0-1.8-.7-1.8-1.8z"
              fill="currentColor"
            />
            {/* Bottom Star */}
            <path
              d="M19.8 10.4c0 .85-.6 1.35-1.35 1.35.75 0 1.35.5 1.35 1.35 0-.85.6-1.35 1.35-1.35-.75 0-1.35-.5-1.35-1.35z"
              fill="currentColor"
            />
          </svg>
        ) : (
          /* Radiant Sun (Light mode state) */
          <svg
            className="astro-theme-toggle__icon astro-theme-toggle__icon--sun"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {/* Central Sun Circle */}
            <circle cx="12" cy="12" r="4.6" fill="currentColor" />
            {/* 8 Sharp Triangular Rays */}
            <polygon points="12,1.5 10.3,6.4 13.7,6.4" fill="currentColor" />
            <polygon points="12,22.5 10.3,17.6 13.7,17.6" fill="currentColor" />
            <polygon points="1.5,12 6.4,10.3 6.4,13.7" fill="currentColor" />
            <polygon points="22.5,12 17.6,10.3 17.6,13.7" fill="currentColor" />
            <polygon points="19.4,4.6 14.4,6.9 17.1,9.6" fill="currentColor" />
            <polygon points="19.4,19.4 17.1,14.4 14.4,17.1" fill="currentColor" />
            <polygon points="4.6,19.4 9.6,17.1 6.9,14.4" fill="currentColor" />
            <polygon points="4.6,4.6 6.9,9.6 9.6,6.9" fill="currentColor" />
          </svg>
        )}
      </div>
    </button>
  );
};
