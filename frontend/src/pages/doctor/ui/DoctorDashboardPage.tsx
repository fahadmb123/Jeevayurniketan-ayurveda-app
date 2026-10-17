import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { DoctorSidebar } from '@/widgets/doctor-sidebar';
import { DoctorHeader } from '@/widgets/doctor-header';
import { DoctorStats } from '@/widgets/doctor-stats';
import { RecentPatientsWidget } from '@/widgets/recent-patients';
import { TodayScheduleWidget } from '@/widgets/today-schedule';
import { RECENT_PATIENTS, type Patient } from '@/entities/patient';
import type { NewPatientData } from '@/features/add-patient';
import './DoctorDashboardPage.css';

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardItemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export const DoctorDashboardPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [patients, setPatients] = useState<Patient[]>(RECENT_PATIENTS);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleAddPatient = (newPatient: NewPatientData) => {
    const created: Patient = {
      id: Date.now(),
      name: newPatient.name,
      age: newPatient.age,
      lastVisit: 'Today',
      status: newPatient.status,
    };
    setPatients((prev) => [created, ...prev]);
  };

  return (
    <div className="doctor-dashboard-layout">
      <DoctorSidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />

      <main className="doctor-dashboard-main">
        <DoctorHeader
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={toggleSidebar}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAddPatient={handleAddPatient}
        />

        <div className="doctor-dashboard-content">
          <div className="doctor-greeting-section">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="doctor-greeting-title"
            >
              Good Morning, <span className="doctor-greeting-highlight">Dr. Sharma</span>
            </motion.h1>
            <p className="doctor-greeting-sub">
              Here is what's happening with your clinic today.
            </p>
          </div>

          <DoctorStats />

          <motion.div
            className="doctor-dashboard-grid"
            variants={gridVariants}
            initial="hidden"
            animate="show"
          >
            <RecentPatientsWidget
              patients={patients}
              searchFilter={searchQuery}
              variants={cardItemVariants}
            />
            <TodayScheduleWidget variants={cardItemVariants} />
          </motion.div>
        </div>
      </main>
    </div>
  );
};
