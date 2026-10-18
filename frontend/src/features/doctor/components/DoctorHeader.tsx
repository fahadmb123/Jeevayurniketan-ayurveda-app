import React from 'react';
import { Menu } from 'lucide-react';
import { SearchPatientsInput, AddPatientButton, type Patient } from '@/features/patients';
import { ThemeToggle } from '@/shared/ui/ThemeToggle';
import './DoctorHeader.css';

export interface DoctorHeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onAddPatient?: (patient: Omit<Patient, 'id'>) => void;
}

export const DoctorHeader: React.FC<DoctorHeaderProps> = React.memo(({
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
          onChange={onSearchChange || (() => {})}
        />
      </div>
      <div className="doctor-header__actions">
        <ThemeToggle />
        <AddPatientButton onAddPatient={onAddPatient} />
      </div>
    </header>
  );
});

DoctorHeader.displayName = 'DoctorHeader';
