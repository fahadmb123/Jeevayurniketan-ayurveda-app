import React, { useState, useMemo } from 'react';
import { DoctorSidebar, DoctorHeader } from '@/features/doctor';
import { Card } from '@/shared/ui/card';
import { PatientListItem } from '../components/PatientListItem';
import { PatientFilterTabs, type PatientFilterOption } from '../components/PatientFilterTabs';
import { usePatients } from '../hooks/usePatients';
import type { Patient } from '../types';
import './DoctorPatientsPage.css';

export const DoctorPatientsPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<PatientFilterOption>('All');

  const { patients, addPatient } = usePatients();

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleAddPatient = (newPatient: Omit<Patient, 'id'>) => {
    addPatient(newPatient);
  };

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const matchesStatus = activeFilter === 'All' || patient.status === activeFilter;
      const matchesSearch = !searchQuery || patient.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [patients, activeFilter, searchQuery]);

  const counts = useMemo(() => {
    return {
      All: patients.length,
      'In treatment': patients.filter((p) => p.status === 'In treatment').length,
      Recovered: patients.filter((p) => p.status === 'Recovered').length,
      Consultation: patients.filter((p) => p.status === 'Consultation').length,
    };
  }, [patients]);

  return (
    <div className="doctor-page-layout">
      <DoctorSidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />

      <main className="doctor-page-main">
        <DoctorHeader
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={toggleSidebar}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAddPatient={handleAddPatient}
        />

        <div className="doctor-page-content">
          <div className="doctor-page-heading">
            <h1 className="doctor-page-title">Patient Management</h1>
            <p className="doctor-page-sub">Comprehensive clinical registry and diagnostic histories</p>
          </div>

          <Card className="doctor-patients-card">
            <div className="doctor-patients-card__toolbar">
              <PatientFilterTabs
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                counts={counts}
              />
            </div>

            <div className="doctor-patients-list">
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient, index) => (
                  <PatientListItem key={patient.id} patient={patient} index={index} />
                ))
              ) : (
                <div className="doctor-patients-empty">
                  No patient records match the current filter.
                </div>
              )}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};
