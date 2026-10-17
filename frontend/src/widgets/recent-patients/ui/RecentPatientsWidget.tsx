import React, { useState, useMemo } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Card } from '@/shared/ui/card';
import { RECENT_PATIENTS, PatientListItem, type Patient } from '@/entities/patient';
import { PatientFilterTabs, type PatientFilterOption } from '@/features/filter-patients';
import './RecentPatientsWidget.css';

export interface RecentPatientsWidgetProps {
  patients?: Patient[];
  onViewAll?: () => void;
  onSelectPatient?: (patient: Patient) => void;
  variants?: Variants;
  searchFilter?: string;
}

export const RecentPatientsWidget: React.FC<RecentPatientsWidgetProps> = ({
  patients = RECENT_PATIENTS,
  onViewAll,
  onSelectPatient,
  variants,
  searchFilter = '',
}) => {
  const [activeFilter, setActiveFilter] = useState<PatientFilterOption>('All');

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const matchesStatus = activeFilter === 'All' || patient.status === activeFilter;
      const matchesSearch = !searchFilter || patient.name.toLowerCase().includes(searchFilter.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [patients, activeFilter, searchFilter]);

  const counts = useMemo(() => {
    return {
      All: patients.length,
      'In treatment': patients.filter((p) => p.status === 'In treatment').length,
      Recovered: patients.filter((p) => p.status === 'Recovered').length,
      Consultation: patients.filter((p) => p.status === 'Consultation').length,
    };
  }, [patients]);

  return (
    <motion.section variants={variants} className="recent-patients-widget">
      <Card className="recent-patients-widget__card">
        <div className="recent-patients-widget__header">
          <div>
            <h2 className="recent-patients-widget__title">Recent Patients</h2>
          </div>
          <button className="recent-patients-widget__view-all-btn" onClick={onViewAll}>
            View All
          </button>
        </div>

        <div className="recent-patients-widget__filter-bar">
          <PatientFilterTabs
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            counts={counts}
          />
        </div>

        <div className="recent-patients-widget__list">
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient, index) => (
              <PatientListItem
                key={patient.id}
                patient={patient}
                index={index}
                onSelect={onSelectPatient}
              />
            ))
          ) : (
            <div className="recent-patients-widget__empty">
              No patients found matching this criteria.
            </div>
          )}
        </div>
      </Card>
    </motion.section>
  );
};
