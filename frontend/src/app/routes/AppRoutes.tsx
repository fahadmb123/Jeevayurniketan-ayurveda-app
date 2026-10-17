import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '@/shared/config/routes';
import { HomePage } from '@/pages/home';
import { AboutPage } from '@/pages/about';
import { ServicesPage } from '@/pages/services';
import { TeamPage } from '@/pages/team';
import { BlogPage } from '@/pages/blog';
import { ContactPage } from '@/pages/contact';
import { NotFoundPage } from '@/pages/not-found';

import { DoctorDashboardPage } from '@/pages/doctor';
import { DoctorPatientsPage } from '@/pages/doctor-patients';
import { DoctorAppointmentsPage } from '@/pages/doctor-appointments';
import { DoctorRecordsPage } from '@/pages/doctor-records';
import { DoctorSettingsPage } from '@/pages/doctor-settings';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.SERVICES} element={<ServicesPage />} />
      <Route path={ROUTES.TEAM} element={<TeamPage />} />
      <Route path={ROUTES.BLOG} element={<BlogPage />} />
      <Route path={ROUTES.CONTACT} element={<ContactPage />} />

      {/* Doctor Portal Pages */}
      <Route path={ROUTES.DOCTOR} element={<DoctorDashboardPage />} />
      <Route path={ROUTES.DOCTOR_PATIENTS} element={<DoctorPatientsPage />} />
      <Route path={ROUTES.DOCTOR_APPOINTMENTS} element={<DoctorAppointmentsPage />} />
      <Route path={ROUTES.DOCTOR_RECORDS} element={<DoctorRecordsPage />} />
      <Route path={ROUTES.DOCTOR_SETTINGS} element={<DoctorSettingsPage />} />

      {/* 404 Fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
