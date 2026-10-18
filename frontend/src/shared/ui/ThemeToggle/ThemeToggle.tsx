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
      className={`contrast-theme-toggle ${isDark ? 'contrast-theme-toggle--dark' : 'contrast-theme-toggle--light'} ${className}`}
      onClick={(e) => toggleTheme(e)}
    >
      <div className="contrast-theme-toggle__disc">
        <svg
          viewBox="0 0 100 100"
          className="contrast-theme-toggle__svg"
          aria-hidden="true"
        >
          {/* Base outer circle: left half black, right half white */}
          <path
            d="M 50 3 A 47 47 0 0 0 50 97 Z"
            fill="#000000"
          />
          <path
            d="M 50 3 A 47 47 0 0 1 50 97 Z"
            fill="#FFFFFF"
          />

          {/* Inner core circle: inverted colors (left half white, right half black) */}
          <path
            d="M 50 26.5 A 23.5 23.5 0 0 0 50 73.5 Z"
            fill="#FFFFFF"
          />
          <path
            d="M 50 26.5 A 23.5 23.5 0 0 1 50 73.5 Z"
            fill="#000000"
          />

          {/* Outer perimeter outline */}
          <circle
            cx="50"
            cy="50"
            r="47"
            fill="none"
            stroke="#000000"
            strokeWidth="2.5"
          />
        </svg>
      </div>
    </button>
  );
};
