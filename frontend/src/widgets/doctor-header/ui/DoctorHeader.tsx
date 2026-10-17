import React from 'react';
import { Bell, Menu } from 'lucide-react';
import { SearchPatientsInput } from '@/features/search-patients';
import { AddPatientButton, type NewPatientData } from '@/features/add-patient';
import './DoctorHeader.css';

export interface DoctorHeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onAddPatient?: (patient: NewPatientData) => void;
}

export const DoctorHeader: React.FC<DoctorHeaderProps> = ({
  isSidebarOpen,
  onToggleSidebar,
  searchQuery = '',
  onSearchChange,
  onAddPatient,
}) => {
  return (
    <header className="doctor-header">
      <div className="doctor-header__left">
        {!isSidebarOpen && (
          <button
            className="doctor-header__mobile-menu-btn"
            onClick={onToggleSidebar}
            aria-label="Toggle Navigation"
          >
            <Menu size={20} />
          </button>
        )}
        <SearchPatientsInput
          value={searchQuery}
          onChange={(query) => onSearchChange?.(query)}
        />
      </div>
      <div className="doctor-header__actions">
        <button
          className="doctor-header__icon-btn"
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="doctor-header__notification-dot" />
        </button>
        <AddPatientButton onAddPatient={onAddPatient} />
      </div>
    </header>
  );
};
