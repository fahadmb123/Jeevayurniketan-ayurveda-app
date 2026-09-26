import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/home';
import { DoctorDashboard } from '@/pages/doctor';

export const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/doctor" element={<DoctorDashboard />} />
        </Routes>
      </div>
    </Router>
  );
};
