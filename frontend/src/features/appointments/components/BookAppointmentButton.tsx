import React, { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { BookAppointmentModal } from './BookAppointmentModal';
import type { BookingFormData } from '../types';

export interface BookAppointmentButtonProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'outline' | 'ghost' | 'icon';
  className?: string;
  onBookSuccess?: (data: BookingFormData) => void;
}

export const BookAppointmentButton: React.FC<BookAppointmentButtonProps> = ({
  label = 'Book Appointment',
  size = 'md',
  variant = 'primary',
  className = '',
  onBookSuccess,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={() => setIsOpen(true)}
      >
        {label}
      </Button>

      <BookAppointmentModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={onBookSuccess}
      />
    </>
  );
};
