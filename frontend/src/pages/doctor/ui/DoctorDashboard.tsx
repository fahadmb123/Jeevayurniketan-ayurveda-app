import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './DoctorDashboard.css';
import { 
  Users, 
  Calendar, 
  FileText, 
  Settings, 
  Bell, 
  Search, 
  Plus, 
  Clock, 
  Activity, 
  Video,
  Menu,
  ChevronLeft,
  Moon,
  Sun,
  MoreVertical,
  CheckCircle2
} from 'lucide-react';

export const DoctorDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDark, setIsDark] = useState(true); // Default to dark theme as requested

  // Prevent body scrolling issues when sidebar is open on mobile
  useEffect(() => {
    if (isDark) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.removeAttribute('data-theme');
    }
  }, [isDark]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className={`doctor-dashboard-container ${isDark ? 'theme-black' : ''}`}>
      {/* Sidebar */}
      <motion.aside 
        className="doctor-sidebar"
        animate={{ width: isSidebarOpen ? 260 : 80 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="sidebar-logo-container">
          <div className="sidebar-logo">
            {isSidebarOpen ? (
              <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                Jeeva<span className="text-highlight">Ayur</span>
              </motion.h2>
            ) : (
              <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                J<span className="text-highlight">A</span>
              </motion.h2>
            )}
          </div>
          <button className="collapse-btn" onClick={toggleSidebar}>
            {isSidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          <NavItem icon={<Activity />} text="Dashboard" isOpen={isSidebarOpen} active />
          <NavItem icon={<Users />} text="Patients" isOpen={isSidebarOpen} />
          <NavItem icon={<Calendar />} text="Appointments" isOpen={isSidebarOpen} />
          <NavItem icon={<FileText />} text="Clinical Records" isOpen={isSidebarOpen} />
          <NavItem icon={<Settings />} text="Settings" isOpen={isSidebarOpen} />
        </nav>
        
        <div className="sidebar-footer">
          <div className="doctor-mini-profile">
            <div className="profile-avatar">S</div>
            {isSidebarOpen && (
              <motion.div className="profile-info" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <span className="profile-name">Dr. Sharma</span>
                <span className="profile-role">Specialist</span>
              </motion.div>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="doctor-main">
        {/* Header */}
        <header className="doctor-header">
          <div className="header-left">
            {!isSidebarOpen && (
              <button className="icon-btn mobile-menu-btn" onClick={toggleSidebar}>
                <Menu />
              </button>
            )}
            <div className="search-bar">
              <Search size={18} className="search-icon" />
              <input type="text" placeholder="Search patients, records..." />
            </div>
          </div>
          <div className="header-actions">
            <button className="icon-btn theme-toggle" onClick={() => setIsDark(!isDark)}>
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="icon-btn notification-btn">
              <Bell size={20} />
              <span className="notification-dot animate-pulse"></span>
            </button>
            <button className="primary-action-btn">
              <Plus size={18} />
              <span>New Patient</span>
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          <div className="greeting-section">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="greeting-title"
            >
              Good Morning, <span className="text-highlight">Dr. Sharma</span>
            </motion.h1>
            <p className="greeting-sub">Here is what's happening with your clinic today.</p>
          </div>

          {/* Stats Grid */}
          <motion.div 
            className="stats-grid"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <StatCard title="Total Patients" value="1,248" trend="+12% this month" icon={<Users />} variant="green" />
            <StatCard title="Today's Appointments" value="12" trend="4 Remaining" icon={<Calendar />} variant="blue" />
            <StatCard title="Pending Reports" value="5" trend="Needs attention" icon={<FileText />} variant="orange" />
          </motion.div>

          {/* Main Grid: Patients & Appointments */}
          <motion.div 
            className="dashboard-grid"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {/* Patient List */}
            <motion.section variants={itemVariants} className="interactive-card patient-section">
              <div className="card-header">
                <h2 className="card-title">Recent Patients</h2>
                <button className="view-all-btn">View All</button>
              </div>
              
              <div className="patient-list">
                {[
                  { id: 1, name: 'Ananya Patel', age: 34, lastVisit: 'Today', status: 'In treatment' },
                  { id: 2, name: 'Rahul Verma', age: 45, lastVisit: 'Yesterday', status: 'Recovered' },
                  { id: 3, name: 'Sunita Rao', age: 29, lastVisit: '18 Sep', status: 'In treatment' },
                  { id: 4, name: 'Vikram Singh', age: 52, lastVisit: '15 Sep', status: 'Consultation' }
                ].map((patient, i) => (
                  <motion.div 
                    key={patient.id} 
                    className="patient-item interactive-hover"
                    whileHover={{ scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="patient-info-wrap">
                      <div className={`patient-avatar bg-gradient-${(i % 3) + 1}`}>
                        {patient.name.charAt(0)}
                      </div>
                      <div className="patient-details">
                        <span className="patient-name">{patient.name}</span>
                        <div className="patient-meta">
                          <span>{patient.age} yrs</span>
                          <span className="dot-separator">•</span>
                          <span>{patient.lastVisit}</span>
                        </div>
                      </div>
                    </div>
                    <div className="patient-status-wrap">
                      <span className={`status-pill ${patient.status.includes('Recovered') ? 'success' : 'pending'}`}>
                        {patient.status}
                      </span>
                      <button className="icon-btn-small">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Upcoming Appointments */}
            <motion.section variants={itemVariants} className="interactive-card appointment-section">
              <div className="card-header">
                <h2 className="card-title">Today's Schedule</h2>
                <button className="view-all-btn">Calendar</button>
              </div>
              
              <div className="appointment-list">
                {[
                  { id: 1, time: '10:00', meridian: 'AM', patient: 'Meera N', type: 'Consultation', status: 'next' },
                  { id: 2, time: '11:30', meridian: 'AM', patient: 'Karan J', type: 'Follow up', status: 'upcoming' },
                  { id: 3, time: '02:00', meridian: 'PM', patient: 'Priya D', type: 'Video Consult', status: 'upcoming', isVideo: true },
                  { id: 4, time: '04:15', meridian: 'PM', patient: 'Arjun M', type: 'Therapy Session', status: 'upcoming' }
                ].map((apt) => (
                  <motion.div 
                    key={apt.id} 
                    className={`appointment-item ${apt.status === 'next' ? 'active-appointment' : ''} interactive-hover`}
                    whileHover={{ x: 4 }}
                  >
                    <div className="appointment-time-block">
                      <span className="time-main">{apt.time}</span>
                      <span className="time-meridian">{apt.meridian}</span>
                    </div>
                    <div className="appointment-details">
                      <div className="appointment-header-row">
                        <span className="appointment-name">{apt.patient}</span>
                        {apt.status === 'next' && <span className="pulse-indicator"></span>}
                      </div>
                      <span className="appointment-type">
                        {apt.isVideo ? <Video size={14} className="type-icon" /> : <Clock size={14} className="type-icon" />}
                        {apt.type}
                      </span>
                    </div>
                    {apt.status === 'next' ? (
                      <button className="start-btn">Start</button>
                    ) : (
                      <CheckCircle2 size={20} className="text-muted" />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

// Helper Components
const NavItem = ({ icon, text, isOpen, active = false }: { icon: React.ReactNode, text: string, isOpen: boolean, active?: boolean }) => (
  <a href="#" className={`nav-item ${active ? 'active' : ''} ${!isOpen ? 'collapsed' : ''}`}>
    <div className="nav-icon">{icon}</div>
    <AnimatePresence>
      {isOpen && (
        <motion.span 
          className="nav-text"
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 'auto' }}
          exit={{ opacity: 0, width: 0 }}
          transition={{ duration: 0.2 }}
        >
          {text}
        </motion.span>
      )}
    </AnimatePresence>
  </a>
);

const StatCard = ({ title, value, trend, icon, variant }: { title: string, value: string, trend: string, icon: React.ReactNode, variant: string }) => (
  <motion.div 
    variants={{
      hidden: { y: 20, opacity: 0 },
      show: { y: 0, opacity: 1 }
    }}
    className={`stat-card stat-${variant} interactive-hover`}
    whileHover={{ y: -5 }}
  >
    <div className="stat-content">
      <span className="stat-title">{title}</span>
      <span className="stat-value">{value}</span>
      <span className="stat-trend">{trend}</span>
    </div>
    <div className="stat-icon-wrapper">
      {icon}
    </div>
  </motion.div>
);

