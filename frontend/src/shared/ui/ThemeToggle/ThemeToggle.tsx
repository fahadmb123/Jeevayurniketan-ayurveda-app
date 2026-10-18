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
      className={`bulb-theme-toggle ${isDark ? 'bulb-theme-toggle--dark' : 'bulb-theme-toggle--light'} ${className}`}
      onClick={(e) => toggleTheme(e)}
    >
      <div className="bulb-theme-toggle__disc">
        <svg
          viewBox="0 0 100 100"
          className="bulb-theme-toggle__svg"
          aria-hidden="true"
        >
          {/* 5 Radiating Light Rays (Active in Light Mode) */}
          <g className="bulb-theme-toggle__rays">
            {/* Left horizontal ray */}
            <line x1="16" y1="41" x2="26" y2="41" />
            {/* Top-left 45° ray */}
            <line x1="25" y1="18" x2="33" y2="26" />
            {/* Top vertical ray */}
            <line x1="50" y1="9" x2="50" y2="19" />
            {/* Top-right 45° ray */}
            <line x1="75" y1="18" x2="67" y2="26" />
            {/* Right horizontal ray */}
            <line x1="84" y1="41" x2="74" y2="41" />
          </g>

          {/* Bulb Outer Glass Silhouette */}
          <path
            className="bulb-theme-toggle__glass"
            d="M 37.5 55.5 C 34.5 51.5 33 46.5 33 41 C 33 31.6 40.6 24 50 24 C 59.4 24 67 31.6 67 41 C 67 46.5 65.5 51.5 62.5 55.5 C 59.8 59.2 58 63 57.5 66.5 L 42.5 66.5 C 42 63 40.2 59.2 37.5 55.5 Z"
          />

          {/* Filament Coils (Active in Light Mode) */}
          <g className="bulb-theme-toggle__filament">
            {/* Two vertical leads from base connected to looped filament curls */}
            <path
              d="M 47.5 66.5 L 47.5 52 C 47.5 45.5 40 44 40 49 C 40 53.5 47.5 53.5 50 53.5 C 52.5 53.5 60 53.5 60 49 C 60 44 52.5 45.5 52.5 52 L 52.5 66.5"
            />
          </g>

          {/* Base Screw Thread Lines */}
          <g className="bulb-theme-toggle__base">
            <line x1="43" y1="71" x2="57" y2="71" />
            <line x1="43" y1="75.5" x2="57" y2="75.5" />
            <line x1="44" y1="80" x2="56" y2="80" />
          </g>
        </svg>
      </div>
    </button>
  );
};
