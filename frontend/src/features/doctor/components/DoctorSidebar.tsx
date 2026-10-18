import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Menu, ChevronLeft, Activity, Users, Calendar, Sparkles, FileText, Settings, Inbox } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '@/shared/config/routes';
import { useRequests } from '@/features/requests';
import type { DoctorNavItem } from '../types';
import './DoctorSidebar.css';

export interface DoctorSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

// Shared persistent state so sidebar state is preserved across route changes without re-animation
let globalSidebarOpen = true;
const sidebarListeners = new Set<(open: boolean) => void>();

export const useDoctorSidebar = () => {
  const [isOpen, setIsOpen] = useState(globalSidebarOpen);

  useEffect(() => {
    const listener = (open: boolean) => setIsOpen(open);
    sidebarListeners.add(listener);
    return () => {
      sidebarListeners.delete(listener);
    };
  }, []);

  const toggle = useCallback(() => {
    globalSidebarOpen = !globalSidebarOpen;
    sidebarListeners.forEach((l) => l(globalSidebarOpen));
  }, []);

  return [isOpen, toggle] as const;
};

export const DoctorSidebar: React.FC<DoctorSidebarProps> = React.memo(({ isOpen, onToggle }) => {
  const location = useLocation();
  const { pendingCount } = useRequests();

  const navItems = useMemo<DoctorNavItem[]>(
    () => [
      { id: 'dashboard', label: 'Dashboard', path: ROUTES.DOCTOR, icon: <Activity size={20} /> },
      {
        id: 'requests',
        label: 'Requests',
        path: ROUTES.DOCTOR_REQUESTS,
        icon: <Inbox size={20} />,
        badge: pendingCount > 0 ? pendingCount : undefined,
      },
      { id: 'patients', label: 'Patients', path: ROUTES.DOCTOR_PATIENTS, icon: <Users size={20} /> },
      { id: 'appointments', label: 'Appointments', path: ROUTES.DOCTOR_APPOINTMENTS, icon: <Calendar size={20} /> },
      { id: 'yoga', label: 'Yoga Schedule', path: ROUTES.DOCTOR_YOGA, icon: <Sparkles size={20} /> },
      { id: 'records', label: 'Clinical Records', path: ROUTES.DOCTOR_RECORDS, icon: <FileText size={20} /> },
      { id: 'settings', label: 'Settings', path: ROUTES.DOCTOR_SETTINGS, icon: <Settings size={20} /> },
    ],
    [pendingCount]
  );

  return (
    <aside className={`doctor-sidebar ${!isOpen ? 'doctor-sidebar--collapsed' : ''}`}>
      <div className={`doctor-sidebar__logo-container ${!isOpen ? 'doctor-sidebar__logo-container--collapsed' : ''}`}>
        <div className="doctor-sidebar__logo">
          <h2 className="doctor-sidebar__logo-full">
            Jeeva<span className="doctor-sidebar__highlight">Ayur</span>
          </h2>
          <h2 className="doctor-sidebar__logo-short">
            J<span className="doctor-sidebar__highlight">A</span>
          </h2>
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
        {navItems.map((item: DoctorNavItem) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.id}
              to={item.path}
              className={`doctor-sidebar__nav-item ${isActive ? 'doctor-sidebar__nav-item--active' : ''} ${!isOpen ? 'doctor-sidebar__nav-item--collapsed' : ''}`}
              title={!isOpen ? item.label : undefined}
            >
              <div className="doctor-sidebar__nav-icon">{item.icon}</div>
              <span className="doctor-sidebar__nav-text">{item.label}</span>
              {item.badge !== undefined && (
                <span className="doctor-sidebar__nav-badge">{item.badge}</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="doctor-sidebar__footer">
        <div className="doctor-sidebar__profile">
          <div className="doctor-sidebar__profile-avatar">S</div>
          <div className="doctor-sidebar__profile-info">
            <span className="doctor-sidebar__profile-name">Dr. Sharma</span>
            <span className="doctor-sidebar__profile-role">Specialist</span>
          </div>
        </div>
      </div>
    </aside>
  );
});

DoctorSidebar.displayName = 'DoctorSidebar';
