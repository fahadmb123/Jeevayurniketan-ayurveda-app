import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { DoctorSidebar, useDoctorSidebar, DoctorHeader } from '@/features/doctor';
import { usePatients, type Patient } from '@/features/patients';
import './DoctorLayout.css';

export interface DoctorOutletContext {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  handleAddPatient: (newPatient: Omit<Patient, 'id'>) => void;
}

export const DoctorLayout: React.FC = () => {
  const [isSidebarOpen, toggleSidebar] = useDoctorSidebar();
  const [searchQuery, setSearchQuery] = useState('');
  const { addPatient } = usePatients();

  const handleAddPatient = (newPatient: Omit<Patient, 'id'>) => {
    addPatient(newPatient);
  };

  return (
    <div className="doctor-layout doctor-dashboard-layout doctor-page-layout">
      {/* Persistent Sidebar (Mounted Once) */}
      <DoctorSidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />

      {/* Main Content Area with Persistent Header Navbar */}
      <main className="doctor-layout__main doctor-dashboard-main doctor-page-main">
        <DoctorHeader
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={toggleSidebar}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAddPatient={handleAddPatient}
        />

        {/* Dynamic Nested Route Content */}
        <Outlet
          context={{
            searchQuery,
            setSearchQuery,
            isSidebarOpen,
            toggleSidebar,
            handleAddPatient,
          } satisfies DoctorOutletContext}
        />
      </main>
    </div>
  );
};
