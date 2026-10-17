import React, { useState } from 'react';
import { DoctorSidebar } from '../components/DoctorSidebar';
import { DoctorHeader } from '../components/DoctorHeader';
import { Card } from '@/shared/ui/card';
import { AppointmentListItem } from '../components/AppointmentListItem';
import { StartConsultationModal } from '../components/StartConsultationModal';
import { useDoctorAppointments } from '../hooks/useDoctorAppointments';
import type { Appointment } from '../types';
import './DoctorAppointmentsPage.css';

export const DoctorAppointmentsPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [tab, setTab] = useState<'today' | 'upcoming'>('today');

  const { appointments: todayAppointments } = useDoctorAppointments();

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const upcomingAppointments: Appointment[] = [
    { id: 10, time: '09:30', meridian: 'AM', patient: 'Deepak Nambiar', type: 'Smriti Follow-up', status: 'upcoming' },
    { id: 11, time: '11:00', meridian: 'AM', patient: 'Fathima Zahra', type: 'Diet Evaluation', status: 'upcoming' },
    { id: 12, time: '03:30', meridian: 'PM', patient: 'Dr. Suresh Raj', type: 'Clinical Consultation', status: 'upcoming', isVideo: true },
  ];

  const currentList = tab === 'today' ? todayAppointments : upcomingAppointments;

  return (
    <div className="doctor-page-layout">
      <DoctorSidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />

      <main className="doctor-page-main">
        <DoctorHeader
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={toggleSidebar}
        />

        <div className="doctor-page-content">
          <div className="doctor-page-heading">
            <h1 className="doctor-page-title">Appointment Schedule</h1>
            <p className="doctor-page-sub">Consultations, follow-ups, and Smriti meditation therapy sessions</p>
          </div>

          <Card className="doctor-appointments-card">
            <div className="doctor-appointments-tabs">
              <button
                className={`doctor-tab ${tab === 'today' ? 'doctor-tab--active' : ''}`}
                onClick={() => setTab('today')}
              >
                Today's Queue ({todayAppointments.length})
              </button>
              <button
                className={`doctor-tab ${tab === 'upcoming' ? 'doctor-tab--active' : ''}`}
                onClick={() => setTab('upcoming')}
              >
                Upcoming Dates ({upcomingAppointments.length})
              </button>
            </div>

            <div className="doctor-appointments-list">
              {currentList.map((apt) => (
                <AppointmentListItem
                  key={apt.id}
                  appointment={apt}
                  onStart={(item) => setSelectedAppointment(item)}
                />
              ))}
            </div>
          </Card>
        </div>
      </main>

      <StartConsultationModal
        appointment={selectedAppointment}
        isOpen={Boolean(selectedAppointment)}
        onClose={() => setSelectedAppointment(null)}
      />
    </div>
  );
};
