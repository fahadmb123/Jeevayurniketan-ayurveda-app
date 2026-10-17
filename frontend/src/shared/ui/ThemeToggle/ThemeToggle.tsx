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
      title={isDark ? 'Dark Theme (Click for Light)' : 'Light Theme (Click for Dark)'}
      className={`luxury-theme-toggle ${isDark ? 'luxury-theme-toggle--dark' : 'luxury-theme-toggle--light'} ${className}`}
      onClick={toggleTheme}
    >
      <span className="luxury-theme-toggle__track">
        <span className="luxury-theme-toggle__thumb" />
      </span>
    </button>
  );
};
