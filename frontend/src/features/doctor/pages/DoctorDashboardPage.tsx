import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { DoctorStats } from '../components/DoctorStats';
import { RecentPatientsWidget, usePatients } from '@/features/patients';
import { TodayScheduleWidget } from '@/features/appointments';
import type { DoctorOutletContext } from '@/shared/layout';
import './DoctorDashboardPage.css';

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardItemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

export const DoctorDashboardPage: React.FC = () => {
  const context = useOutletContext<DoctorOutletContext>();
  const searchQuery = context?.searchQuery ?? '';
  const { patients } = usePatients();

  return (
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
  );
};
