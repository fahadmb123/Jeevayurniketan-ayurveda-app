import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactLenis } from '@studio-freight/react-lenis';
import { ThemeProvider } from '@/shared/context/ThemeContext';
import { AppRoutes } from './routes';

const lenisOptions = {
  lerp: 0.1,
  duration: 1.2,
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 1.5,
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

