import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Card } from '@/shared/ui/card';
import { TODAY_APPOINTMENTS, AppointmentListItem, type Appointment } from '@/entities/appointment';
import { StartConsultationModal } from '@/features/start-consultation';
import './TodayScheduleWidget.css';

export interface TodayScheduleWidgetProps {
  appointments?: Appointment[];
  onOpenCalendar?: () => void;
  onStartAppointment?: (appointment: Appointment) => void;
  variants?: Variants;
}

export const TodayScheduleWidget: React.FC<TodayScheduleWidgetProps> = ({
  appointments = TODAY_APPOINTMENTS,
  onOpenCalendar,
  onStartAppointment,
  variants,
}) => {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const handleStart = (apt: Appointment) => {
    setSelectedAppointment(apt);
    onStartAppointment?.(apt);
  };

  return (
    <>
      <motion.section variants={variants} className="today-schedule-widget">
        <Card className="today-schedule-widget__card">
          <div className="today-schedule-widget__header">
            <h2 className="today-schedule-widget__title">Today's Schedule</h2>
            <button className="today-schedule-widget__calendar-btn" onClick={onOpenCalendar}>
              Calendar
            </button>
          </div>
          <div className="today-schedule-widget__list">
            {appointments.map((apt) => (
              <AppointmentListItem
                key={apt.id}
                appointment={apt}
                onStart={handleStart}
              />
            ))}
          </div>
        </Card>
      </motion.section>

      <StartConsultationModal
        appointment={selectedAppointment}
        isOpen={Boolean(selectedAppointment)}
        onClose={() => setSelectedAppointment(null)}
      />
    </>
  );
};
