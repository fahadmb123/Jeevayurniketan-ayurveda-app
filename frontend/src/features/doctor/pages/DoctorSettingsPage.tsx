import React, { useState } from 'react';
import { DoctorSidebar } from '../components/DoctorSidebar';
import { DoctorHeader } from '../components/DoctorHeader';
import { Card } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { CheckCircle2, User, Bell, Shield, Clock } from 'lucide-react';
import type { DoctorProfile } from '../types';
import './DoctorSettingsPage.css';

export const DoctorSettingsPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [profile, setProfile] = useState<DoctorProfile>({
    name: 'Dr. Sharma',
    specialty: 'Ayurvedic Psychotherapy & Smriti Meditation',
    email: 'dr.sharma@jeevayurniketan.com',
    phone: '+91 9544 260 145',
    consultDuration: '45 mins',
    emailAlerts: true,
    smsAlerts: false,
  });

  const [saved, setSaved] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

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
            <h1 className="doctor-page-title">Clinic Settings</h1>
            <p className="doctor-page-sub">Practitioner preferences, consultation durations, and notification channels</p>
          </div>

          <form onSubmit={handleSave} className="doctor-settings-grid">
            <Card className="settings-section-card">
              <div className="settings-section-header">
                <User size={20} className="settings-icon" />
                <div>
                  <h3>Practitioner Profile</h3>
                  <p>Public identification and specialty details</p>
                </div>
              </div>

              <div className="settings-fields">
                <div className="settings-field">
                  <label htmlFor="name">Display Name</label>
                  <input
                    id="name"
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>

                <div className="settings-field">
                  <label htmlFor="specialty">Clinical Specialty</label>
                  <input
                    id="specialty"
                    type="text"
                    value={profile.specialty}
                    onChange={(e) => setProfile({ ...profile, specialty: e.target.value })}
                  />
                </div>

                <div className="settings-field">
                  <label htmlFor="email">Official Email</label>
                  <input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
              </div>
            </Card>

            <Card className="settings-section-card">
              <div className="settings-section-header">
                <Clock size={20} className="settings-icon" />
                <div>
                  <h3>Consultation Protocols</h3>
                  <p>Session timing and scheduling preferences</p>
                </div>
              </div>

              <div className="settings-fields">
                <div className="settings-field">
                  <label htmlFor="duration">Standard Session Duration</label>
                  <select
                    id="duration"
                    value={profile.consultDuration}
                    onChange={(e) => setProfile({ ...profile, consultDuration: e.target.value })}
                  >
                    <option value="30 mins">30 minutes</option>
                    <option value="45 mins">45 minutes (Standard Smriti)</option>
                    <option value="60 mins">60 minutes (Comprehensive)</option>
                  </select>
                </div>
              </div>
            </Card>

            <Card className="settings-section-card">
              <div className="settings-section-header">
                <Bell size={20} className="settings-icon" />
                <div>
                  <h3>Notifications</h3>
                  <p>Reminders for appointments and emergency consults</p>
                </div>
              </div>

              <div className="settings-fields">
                <label className="settings-toggle">
                  <input
                    type="checkbox"
                    checked={profile.emailAlerts}
                    onChange={(e) => setProfile({ ...profile, emailAlerts: e.target.checked })}
                  />
                  <span>Email notifications for appointment requests</span>
                </label>

                <label className="settings-toggle">
                  <input
                    type="checkbox"
                    checked={profile.smsAlerts}
                    onChange={(e) => setProfile({ ...profile, smsAlerts: e.target.checked })}
                  />
                  <span>SMS alert for patient check-in</span>
                </label>
              </div>
            </Card>

            <div className="settings-save-bar">
              {saved && (
                <div className="settings-saved-message">
                  <CheckCircle2 size={18} />
                  <span>Settings updated successfully</span>
                </div>
              )}
              <Button type="submit" variant="primary">
                <Shield size={16} />
                <span>Save Configuration</span>
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
