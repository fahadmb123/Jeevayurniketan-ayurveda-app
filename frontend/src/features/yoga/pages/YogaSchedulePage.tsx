import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Calendar,
  Users,
  Video,
  Award,
  CheckCircle2,
  Inbox,
} from 'lucide-react';
import { useYogaSchedule } from '../hooks/useYogaSchedule';
import { YogaClassCard } from '../components/YogaClassCard';
import { YogaClassModal } from '../components/YogaClassModal';
import { YogaFilterBar } from '../components/YogaFilterBar';
import type { YogaSession } from '../types/yoga.types';
import './YogaSchedulePage.css';

export const YogaSchedulePage: React.FC = () => {
  const {
    filteredSessions,
    isLoading,
    error,
    selectedDay,
    setSelectedDay,
    selectedFormat,
    setSelectedFormat,
    selectedLevel,
    setSelectedLevel,
    searchQuery,
    setSearchQuery,
    isModalOpen,
    editingSession,
    actionSuccessMessage,
    handleOpenAddModal,
    handleOpenEditModal,
    handleCloseModal,
    handleSaveSession,
    handleDeleteSession,
    handleResetDefaults,
  } = useYogaSchedule();

  const [bookingNotice, setBookingNotice] = useState<string | null>(null);

  const handleEnroll = (session: YogaSession) => {
    setBookingNotice(
      `Your spot for "${session.title}" (${session.time}) has been reserved! Our wellness coordinator will contact you with entry details.`
    );
    setTimeout(() => {
      setBookingNotice(null);
    }, 5000);
  };

  return (
    <main className="yoga-page">
      <div className="yoga-container">
        {/* Page Hero Header */}
        <section className="yoga-hero">
          <div className="yoga-hero__badge">
            <Sparkles size={14} />
            <span>Ayurveda & Yoga Chikitsa</span>
          </div>
          <h1 className="yoga-hero__title">
            Weekly Yoga &amp; <span className="gold-highlight">Mind-Body</span> Schedule
          </h1>
          <p className="yoga-hero__desc">
            Harmonize breath (Pranayama), structural alignment (Asana), and conscious
            stillness (Dhyana). Tailored programs designed for holistic mental clarity,
            dosha balance, and joint restoration.
          </p>
        </section>

        {/* Quick Stats Summary */}
        <div className="yoga-stats-bar">
          <div className="yoga-stat-card">
            <div className="yoga-stat-card__icon">
              <Calendar size={20} />
            </div>
            <div className="yoga-stat-card__info">
              <span className="yoga-stat-card__value">7 Days</span>
              <span className="yoga-stat-card__label">Daily Morning &amp; Evening</span>
            </div>
          </div>

          <div className="yoga-stat-card">
            <div className="yoga-stat-card__icon">
              <Video size={20} />
            </div>
            <div className="yoga-stat-card__info">
              <span className="yoga-stat-card__value">In Shala &amp; Live</span>
              <span className="yoga-stat-card__label">Online &amp; Offline Formats</span>
            </div>
          </div>

          <div className="yoga-stat-card">
            <div className="yoga-stat-card__icon">
              <Users size={20} />
            </div>
            <div className="yoga-stat-card__info">
              <span className="yoga-stat-card__value">All Ages &amp; Levels</span>
              <span className="yoga-stat-card__label">Beginners to Advanced</span>
            </div>
          </div>

          <div className="yoga-stat-card">
            <div className="yoga-stat-card__icon">
              <Award size={20} />
            </div>
            <div className="yoga-stat-card__info">
              <span className="yoga-stat-card__value">Ayurvedic Vaidyas</span>
              <span className="yoga-stat-card__label">Certified Yogacharyas</span>
            </div>
          </div>
        </div>

        {/* Interactive Filter & Search Bar */}
        <YogaFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedDay={selectedDay}
          onDaySelect={setSelectedDay}
          selectedFormat={selectedFormat}
          onFormatSelect={setSelectedFormat}
          selectedLevel={selectedLevel}
          onLevelSelect={setSelectedLevel}
          onAddClick={handleOpenAddModal}
          onResetDefaults={handleResetDefaults}
        />

        {/* Loading State */}
        {isLoading && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
            Loading weekly yoga timetable...
          </div>
        )}

        {/* Error State */}
        {error && (
          <div
            style={{
              padding: '16px',
              backgroundColor: '#FEF2F2',
              color: '#B91C1C',
              borderRadius: '12px',
              textAlign: 'center',
              marginBottom: '24px',
            }}
          >
            {error}
          </div>
        )}

        {/* Classes Grid */}
        {!isLoading && filteredSessions.length > 0 && (
          <motion.div
            className="yoga-grid"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {filteredSessions.map((session) => (
              <YogaClassCard
                key={session.id}
                session={session}
                onEdit={handleOpenEditModal}
                onDelete={handleDeleteSession}
                onEnroll={handleEnroll}
              />
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {!isLoading && filteredSessions.length === 0 && (
          <div className="yoga-empty-state">
            <div className="yoga-empty-state__icon">
              <Inbox size={28} />
            </div>
            <h4>No Yoga Classes Found</h4>
            <p>
              No sessions match your filter for <strong>{selectedDay}</strong> (
              {selectedFormat === 'all' ? 'All formats' : selectedFormat}). Try selecting a
              different day or add a new yoga class schedule.
            </p>
            <button
              type="button"
              className="yoga-filter-bar__btn-add"
              onClick={handleOpenAddModal}
              style={{ marginTop: '8px' }}
            >
              <Sparkles size={16} />
              <span>Schedule New Yoga Class</span>
            </button>
          </div>
        )}

        {/* Add / Edit Yoga Class Modal */}
        <YogaClassModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveSession}
          initialData={editingSession}
        />

        {/* Action Flash Toast */}
        {actionSuccessMessage && (
          <div className="yoga-toast" role="status">
            <CheckCircle2 size={18} color="#C98D3B" />
            <span>{actionSuccessMessage}</span>
          </div>
        )}

        {/* Booking Confirmation Toast */}
        {bookingNotice && (
          <div className="yoga-toast" role="status" style={{ maxWidth: '600px' }}>
            <CheckCircle2 size={18} color="#4ADE80" />
            <span>{bookingNotice}</span>
          </div>
        )}
      </div>
    </main>
  );
};
