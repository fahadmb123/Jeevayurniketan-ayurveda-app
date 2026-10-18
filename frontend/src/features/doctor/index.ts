export * from './types';
export * from './services/doctorService';
export * from './hooks/useDoctorStats';
export * from './components/DoctorHeader';
export * from './components/DoctorSidebar';
export * from './components/DoctorStats';
export { DoctorLayout, type DoctorOutletContext } from '@/shared/layout';
export * from './pages/DoctorDashboardPage';
export * from './pages/DoctorSettingsPage';

// Domain feature re-exports for backwards compatibility
export { DoctorRequestsPage, DoctorRequestsPage as DoctorConsultationRequestsPage } from '@/features/requests';
export { DoctorPatientsPage } from '@/features/patients';
export { DoctorYogaSchedulePage } from '@/features/yoga';
