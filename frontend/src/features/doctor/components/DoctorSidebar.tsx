import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, ChevronLeft, Activity, Users, Calendar, Sparkles, FileText, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '@/shared/config/routes';
import type { DoctorNavItem } from '../types';
import './DoctorSidebar.css';

export interface DoctorSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const DOCTOR_NAV_ITEMS: DoctorNavItem[] = [
  { id: 'dashboard', label: 'Dashboard', path: ROUTES.DOCTOR, icon: <Activity size={20} /> },
  { id: 'patients', label: 'Patients', path: ROUTES.DOCTOR_PATIENTS, icon: <Users size={20} /> },
  { id: 'appointments', label: 'Appointments', path: ROUTES.DOCTOR_APPOINTMENTS, icon: <Calendar size={20} /> },
  { id: 'yoga', label: 'Yoga Schedule', path: ROUTES.DOCTOR_YOGA, icon: <Sparkles size={20} /> },
  { id: 'records', label: 'Clinical Records', path: ROUTES.DOCTOR_RECORDS, icon: <FileText size={20} /> },
  { id: 'settings', label: 'Settings', path: ROUTES.DOCTOR_SETTINGS, icon: <Settings size={20} /> },
];

export const DoctorSidebar: React.FC<DoctorSidebarProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();

  return (
    <motion.aside
      className="doctor-sidebar"
      animate={{ width: isOpen ? 260 : 80 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="doctor-sidebar__logo-container">
        <div className="doctor-sidebar__logo">
          {isOpen ? (
            <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              Jeeva<span className="doctor-sidebar__highlight">Ayur</span>
            </motion.h2>
          ) : (
            <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              J<span className="doctor-sidebar__highlight">A</span>
            </motion.h2>
          )}
        </div>
        <button
          className="doctor-sidebar__collapse-btn"
          onClick={onToggle}
          aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <nav className="doctor-sidebar__nav">
        {DOCTOR_NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.id}
              to={item.path}
              className={`doctor-sidebar__nav-item ${isActive ? 'doctor-sidebar__nav-item--active' : ''} ${!isOpen ? 'doctor-sidebar__nav-item--collapsed' : ''}`}
            >
              <div className="doctor-sidebar__nav-icon">{item.icon}</div>
              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    className="doctor-sidebar__nav-text"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      <div className="doctor-sidebar__footer">
        <div className="doctor-sidebar__profile">
          <div className="doctor-sidebar__profile-avatar">S</div>
          {isOpen && (
            <motion.div
              className="doctor-sidebar__profile-info"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="doctor-sidebar__profile-name">Dr. Sharma</span>
              <span className="doctor-sidebar__profile-role">Specialist</span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.aside>
  );
};
