import React, { useState, useCallback, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { DoctorSidebar, useDoctorSidebar, DoctorHeader, DoctorBottomNav } from '@/features/doctor';
import { usePatients, type Patient } from '@/features/patients';
import './DoctorLayout.css';

export interface DoctorOutletContext {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  handleAddPatient: (newPatient: Omit<Patient, 'id'>) => void;
}

export const DoctorLayout: React.FC = React.memo(() => {
  const [isSidebarOpen, toggleSidebar] = useDoctorSidebar();
  const [searchQuery, setSearchQuery] = useState('');
  const { addPatient } = usePatients();

  const handleAddPatient = useCallback(
    (newPatient: Omit<Patient, 'id'>) => {
      addPatient(newPatient);
    },
    [addPatient]
  );

  const outletContext = useMemo<DoctorOutletContext>(
    () => ({
      searchQuery,
      setSearchQuery,
      isSidebarOpen,
      toggleSidebar,
      handleAddPatient,
    }),
    [searchQuery, isSidebarOpen, toggleSidebar, handleAddPatient]
  );

  return (
    <div className="doctor-layout doctor-dashboard-layout doctor-page-layout">
      {/* Persistent Sidebar (Mounted Once) */}
      <DoctorSidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />

      {/* Main Content Area with Persistent Header Navbar */}
      <main className="doctor-layout__main doctor-dashboard-main doctor-page-main">
        <DoctorHeader
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={toggleSidebar}
        />

        {/* Dynamic Nested Route Content */}
        <Outlet context={outletContext} />
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <DoctorBottomNav />
    </div>
  );
});

DoctorLayout.displayName = 'DoctorLayout';
