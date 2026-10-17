import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { AddPatientModal } from './AddPatientModal';
import type { NewPatientData } from '../model/types';

export interface AddPatientButtonProps {
  onAddPatient?: (patient: NewPatientData) => void;
}

export const AddPatientButton: React.FC<AddPatientButtonProps> = ({ onAddPatient }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="primary" size="md" onClick={() => setIsOpen(true)}>
        <Plus size={18} />
        <span>New Patient</span>
      </Button>

      <AddPatientModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAddPatient={onAddPatient}
      />
    </>
  );
};
