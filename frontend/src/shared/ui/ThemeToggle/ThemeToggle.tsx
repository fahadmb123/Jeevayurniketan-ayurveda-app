import React from 'react';
import { useTheme } from '@/shared/context/ThemeContext';
import './ThemeToggle.css';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = React.memo(({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Dark Mode (Click for Light Mode)' : 'Light Mode (Click for Dark Mode)'}
      className={`neumorphic-toggle ${isDark ? 'neumorphic-toggle--dark' : 'neumorphic-toggle--light'} ${className}`}
      onClick={toggleTheme}
    >
      <div className="neumorphic-toggle__track">
        <div className="neumorphic-toggle__thumb" />
      </div>
    </button>
  );
});

ThemeToggle.displayName = 'ThemeToggle';
