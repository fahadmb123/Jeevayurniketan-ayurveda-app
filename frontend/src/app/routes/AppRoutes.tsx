import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '@/shared/config/routes';

// Public & Marketing Feature Pages
import { HomePage, NotFoundPage } from '@/features/home';
import { AboutPage } from '@/features/about';
import { ServicesPage } from '@/features/services';
import { YogaSchedulePage, DoctorYogaSchedulePage } from '@/features/yoga';
import { TeamPage } from '@/features/team';
import { BlogPage } from '@/features/blog';
import { ContactPage } from '@/features/contact';

// Auth Feature Pages
import { LoginPage, RegisterPage } from '@/features/auth';

// Layouts
import { DoctorLayout } from '@/shared/layout';

// Domain-Specific Portal Feature Pages
import { DoctorDashboardPage, DoctorSettingsPage } from '@/features/doctor';
import { DoctorPatientsPage } from '@/features/patients';
import { DoctorAppointmentsPage } from '@/features/appointments';
import { DoctorRecordsPage } from '@/features/records';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.SERVICES} element={<ServicesPage />} />
      <Route path={ROUTES.YOGA} element={<YogaSchedulePage />} />
      <Route path={ROUTES.TEAM} element={<TeamPage />} />
      <Route path={ROUTES.BLOG} element={<BlogPage />} />
      <Route path={ROUTES.CONTACT} element={<ContactPage />} />

      {/* Auth Pages */}
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />

      {/* Doctor Portal Routes (Structured with persistent DoctorLayout & Outlet) */}
      <Route element={<DoctorLayout />}>
        <Route path={ROUTES.DOCTOR} element={<DoctorDashboardPage />} />
        <Route path={ROUTES.DOCTOR_PATIENTS} element={<DoctorPatientsPage />} />
        <Route path={ROUTES.DOCTOR_APPOINTMENTS} element={<DoctorAppointmentsPage />} />
        <Route path={ROUTES.DOCTOR_YOGA} element={<DoctorYogaSchedulePage />} />
        <Route path={ROUTES.DOCTOR_RECORDS} element={<DoctorRecordsPage />} />
        <Route path={ROUTES.DOCTOR_SETTINGS} element={<DoctorSettingsPage />} />
      </Route>

      {/* 404 Fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
