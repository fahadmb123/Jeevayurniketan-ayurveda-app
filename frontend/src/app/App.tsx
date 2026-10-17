import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './routes';

export const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <AppRoutes />
      </div>
    </Router>
  );
};
