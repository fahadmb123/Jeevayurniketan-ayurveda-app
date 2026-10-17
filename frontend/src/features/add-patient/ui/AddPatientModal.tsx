import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UserPlus, CheckCircle2 } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import type { NewPatientData } from '../model/types';
import type { PatientStatus } from '@/entities/patient';
import './AddPatientModal.css';

export interface AddPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPatient?: (patient: NewPatientData) => void;
}

export const AddPatientModal: React.FC<AddPatientModalProps> = ({
  isOpen,
  onClose,
  onAddPatient,
}) => {
  const [formData, setFormData] = useState<NewPatientData>({
    name: '',
    age: 30,
    status: 'In treatment',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    setSubmitted(true);
    setTimeout(() => {
      onAddPatient?.(formData);
      setSubmitted(false);
      onClose();
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="add-patient-backdrop" onClick={onClose}>
          <motion.div
            className="add-patient-modal"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="add-patient-modal__header">
              <div className="add-patient-modal__title-wrap">
                <UserPlus size={22} className="add-patient-modal__icon" />
                <h3 className="add-patient-modal__title">Register New Patient</h3>
              </div>
              <button
                className="add-patient-modal__close-btn"
                onClick={onClose}
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {submitted ? (
              <div className="add-patient-modal__success">
                <CheckCircle2 size={44} className="add-patient-modal__success-icon" />
                <h4>Patient Registered!</h4>
                <p>{formData.name} was successfully added to clinic records.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="add-patient-modal__form">
                <div className="add-patient-modal__field">
                  <label htmlFor="patientName">Patient Name</label>
                  <input
                    id="patientName"
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="add-patient-modal__field">
                  <label htmlFor="patientAge">Age</label>
                  <input
                    id="patientAge"
                    type="number"
                    min={1}
                    max={120}
                    required
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                  />
                </div>

                <div className="add-patient-modal__field">
                  <label htmlFor="patientStatus">Initial Clinical Status</label>
                  <select
                    id="patientStatus"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as PatientStatus })}
                  >
                    <option value="Consultation">Consultation</option>
                    <option value="In treatment">In treatment</option>
                    <option value="Recovered">Recovered</option>
                  </select>
                </div>

                <div className="add-patient-modal__actions">
                  <Button type="button" variant="ghost" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary">
                    Save Patient
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
