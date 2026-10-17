import React, { useState } from 'react';
import { DoctorSidebar } from '@/widgets/doctor-sidebar';
import { DoctorHeader } from '@/widgets/doctor-header';
import { Card } from '@/shared/ui/card';
import { StatusPill } from '@/shared/ui/status-pill';
import { FileText, Download, Calendar, User } from 'lucide-react';
import './DoctorRecordsPage.css';

interface ClinicalRecord {
  id: string;
  patientName: string;
  date: string;
  condition: string;
  therapy: string;
  status: 'Complete' | 'Active';
}

const CLINICAL_RECORDS: ClinicalRecord[] = [
  {
    id: 'REC-2026-001',
    patientName: 'Ananya Patel',
    date: '17 Oct 2026',
    condition: 'Chronic Anxiety & Insomnia',
    therapy: 'Smriti Meditation Session 3 + Brahmi Rasayana',
    status: 'Active',
  },
  {
    id: 'REC-2026-002',
    patientName: 'Rahul Verma',
    date: '16 Oct 2026',
    condition: 'Tension Cephalea (Vata-Pitta)',
    therapy: 'Shirodhara protocol + Herbal decoctions',
    status: 'Complete',
  },
  {
    id: 'REC-2026-003',
    patientName: 'Sunita Rao',
    date: '18 Sep 2026',
    condition: 'Somatoform Gastrointestinal Distress',
    therapy: 'Satvavajaya Chikitsa + Takradhara',
    status: 'Active',
  },
  {
    id: 'REC-2026-004',
    patientName: 'Vikram Singh',
    date: '15 Sep 2026',
    condition: 'Workplace Burnout & Stress',
    therapy: 'Preliminary Psychosomatic Assessment',
    status: 'Complete',
  },
];

export const DoctorRecordsPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [records] = useState<ClinicalRecord[]>(CLINICAL_RECORDS);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

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
            <h1 className="doctor-page-title">Clinical Records</h1>
            <p className="doctor-page-sub">Diagnostic case sheets, Smriti notes, and therapeutic documentation</p>
          </div>

          <Card className="doctor-records-card">
            <div className="records-table-wrapper">
              <table className="records-table">
                <thead>
                  <tr>
                    <th>Record ID</th>
                    <th>Patient</th>
                    <th>Date</th>
                    <th>Diagnosis / Condition</th>
                    <th>Therapy Administered</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((rec) => (
                    <tr key={rec.id}>
                      <td className="records-cell--id">
                        <FileText size={16} />
                        <span>{rec.id}</span>
                      </td>
                      <td className="records-cell--patient">
                        <User size={16} />
                        <span>{rec.patientName}</span>
                      </td>
                      <td className="records-cell--date">
                        <Calendar size={14} />
                        <span>{rec.date}</span>
                      </td>
                      <td>{rec.condition}</td>
                      <td>{rec.therapy}</td>
                      <td>
                        <StatusPill
                          status={rec.status}
                          variant={rec.status === 'Complete' ? 'success' : 'pending'}
                        />
                      </td>
                      <td>
                        <button className="record-action-btn" aria-label="Download case sheet">
                          <Download size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};
