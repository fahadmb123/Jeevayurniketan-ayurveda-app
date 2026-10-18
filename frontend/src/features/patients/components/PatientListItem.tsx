import React from 'react';
import { motion } from 'framer-motion';
import { MoreVertical } from 'lucide-react';
import type { Patient } from '../types';
import { Avatar } from '@/shared/ui/avatar';
import { StatusPill } from '@/shared/ui/status-pill';
import './PatientListItem.css';

export interface PatientListItemProps {
  patient: Patient;
  index: number;
  onSelect?: (patient: Patient) => void;
}

export const PatientListItem: React.FC<PatientListItemProps> = React.memo(({
  patient,
  index,
  onSelect,
}) => {
  const isRecovered = patient.status === 'Recovered';

  return (
    <motion.div
      className="patient-list-item"
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      onClick={() => onSelect?.(patient)}
    >
      <div className="patient-list-item__info">
        <Avatar
          initials={patient.name.charAt(0)}
          gradientIndex={index}
          size="md"
        />
        <div className="patient-list-item__details">
          <span className="patient-list-item__name">{patient.name}</span>
          <div className="patient-list-item__meta">
            <span>{patient.age} yrs</span>
            <span className="patient-list-item__dot">•</span>
            <span>{patient.lastVisit}</span>
          </div>
        </div>
      </div>
      <div className="patient-list-item__status-wrap">
        <StatusPill
          status={patient.status}
          variant={isRecovered ? 'success' : 'pending'}
        />
        <button
          className="patient-list-item__action-btn"
          aria-label={`Options for ${patient.name}`}
          onClick={(e) => e.stopPropagation()}
        >
          <MoreVertical size={16} />
        </button>
      </div>
    </motion.div>
  );
});

PatientListItem.displayName = 'PatientListItem';
