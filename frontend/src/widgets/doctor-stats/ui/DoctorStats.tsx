import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { DOCTOR_STATS } from '../model/mockData';
import type { DoctorStatItem } from '../model/types';
import './DoctorStats.css';

export interface DoctorStatsProps {
  stats?: DoctorStatItem[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export const DoctorStats: React.FC<DoctorStatsProps> = ({ stats = DOCTOR_STATS }) => {
  return (
    <motion.div
      className="doctor-stats-grid"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {stats.map((item) => (
        <motion.div
          key={item.id}
          variants={cardVariants}
          className={`doctor-stat-card doctor-stat-card--${item.variant}`}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
        >
          <div className="doctor-stat-card__content">
            <span className="doctor-stat-card__title">{item.title}</span>
            <span className="doctor-stat-card__value">{item.value}</span>
            <span className="doctor-stat-card__trend">{item.trend}</span>
          </div>
          <div className="doctor-stat-card__icon-wrapper">
            {item.icon}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
