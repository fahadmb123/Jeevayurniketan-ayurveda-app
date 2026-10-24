import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import { ThemeProvider } from '@/shared/context/ThemeContext';
import { AppRoutes } from './routes';

const lenisOptions = {
  lerp: 0.05,
  duration: 1.5,
  smoothWheel: true,
  wheelMultiplier: 0.7,
  touchMultiplier: 1.2,
};

export const App: React.FC = React.memo(() => {
  return (
    <ReactLenis root options={lenisOptions}>
      <ThemeProvider>
        <Router>
          <div className="app">
            <AppRoutes />
          </div>
        </Router>
      </ThemeProvider>
    </ReactLenis>
  );
});

App.displayName = 'App';

