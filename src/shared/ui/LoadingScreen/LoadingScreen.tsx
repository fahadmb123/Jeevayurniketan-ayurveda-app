import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/shared/context/ThemeContext';
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
  let isDarkTheme = false;
  try {
    const themeContext = useTheme();
    isDarkTheme = themeContext.isDark;
  } catch {
    if (typeof document !== 'undefined') {
      isDarkTheme =
        document.documentElement.getAttribute('data-theme') === 'dark' ||
        document.documentElement.classList.contains('dark');
    }
  }

  // Dynamic theme background logic:
  // If website theme is dark -> loading screen background is WHITE (#FFFFFF)
  // If website theme is white/light -> loading screen background is LIGHT GREEN (#bfe4c9)
  const isScreenLightGreen = !isDarkTheme;

  const containerClasses = [
    'loading-screen',
    fullScreen ? 'loading-screen--fullscreen' : '',
    isScreenLightGreen ? 'loading-screen--shutter-light-green' : 'loading-screen--shutter-white',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <motion.div
      className={containerClasses}
      role="status"
      aria-live="polite"
      aria-label="Loading Jeevayurniketan"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
    >
      {/* Top half shutter (carries top half of paper and top half of logo upward) */}
      <motion.div
        className="loading-screen__shutter loading-screen__shutter--top"
        initial={{ y: '0%' }}
        animate={{ y: '0%' }}
        exit={{
          y: '-100%',
          transition: { duration: 1.1, ease: [0.77, 0, 0.175, 1] },
        }}
      >
        <div className="loading-screen__half-viewport loading-screen__half-viewport--top">
          <img
            src={logoSvg}
            alt="Jeevayurniketan"
            className="loading-screen__logo"
            width={240}
            height={240}
          />
        </div>
      </motion.div>

      {/* Bottom half shutter (carries bottom half of paper and bottom half of logo downward slowly) */}
      <motion.div
        className="loading-screen__shutter loading-screen__shutter--bottom"
        initial={{ y: '0%' }}
        animate={{ y: '0%' }}
        exit={{
          y: '100%',
          transition: { duration: 1.25, ease: [0.77, 0, 0.175, 1] },
        }}
      >
        <div className="loading-screen__half-viewport loading-screen__half-viewport--bottom">
          <img
            src={logoSvg}
            alt=""
            aria-hidden="true"
            className="loading-screen__logo"
            width={240}
            height={240}
          />
        </div>
      </motion.div>
    </motion.div>
  );
});

LoadingScreen.displayName = 'LoadingScreen';
