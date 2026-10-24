import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import { ThemeProvider } from '@/shared/context/ThemeContext';
import { AppRoutes } from './routes';

const lenisOptions = {
  // Omit duration so Lenis uses pure physics frame-rate independent damping (damp())
  lerp: 0.04,
  smoothWheel: true,
  wheelMultiplier: 1.0,
  touchMultiplier: 1.4,
  infinite: false,
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

