import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@/shared/context/ThemeContext';
import { AppRoutes } from './routes';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <AppRoutes />
        </div>
      </Router>
    </ThemeProvider>
  );
};
