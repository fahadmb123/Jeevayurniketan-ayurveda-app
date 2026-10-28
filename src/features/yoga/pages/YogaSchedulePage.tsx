import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Calendar,
  Users,
  Video,
  Award,
  CheckCircle2,
  Inbox,
  MessageCircle,
  Compass,
  Heart,
  ShieldCheck,
} from 'lucide-react';
import { useYogaSchedule } from '../hooks/useYogaSchedule';
import { YogaClassCard } from '../components/YogaClassCard';
import { YogaClassModal } from '../components/YogaClassModal';
import { YogaFilterBar } from '../components/YogaFilterBar';
import { YogaProgramCard } from '../components/YogaProgramCard';
import { YogaLearningSection } from '../components/YogaLearningSection';
import { YogaStepsSection } from '../components/YogaStepsSection';
import { YogaBookingCard } from '../components/YogaBookingCard';
import { YOGAATHMA_DATA } from '../data/yogaathmaData';
import { Navbar, Footer } from '@/shared/layout';
import {
  staggerContainerVariants,
  fadeUpVariants,
  standardViewport,
} from '@/shared/lib/animations';
import './YogaSchedulePage.css';

const PILLAR_ICONS = [Compass, Award, Heart, Sparkles, ShieldCheck];

export const YogaSchedulePage: React.FC = React.memo(() => {
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

  const { hero, approach, programs } = YOGAATHMA_DATA;

  const whatsappHeroUrl = `https://wa.me/918970695250?text=${encodeURIComponent(
    hero.whatsappMessage
  )}`;

  return (
    <div className="yoga-page-shell">
      <Navbar />
      <main className="yoga-page">
        <div className="yoga-container">
          {/* Page Hero Header with Yogaathma Copy */}
          <section className="yoga-hero">
            <div className="yoga-hero__badge">
              <Sparkles size={14} />
              <span>{hero.badge}</span>
            </div>
            <h1 className="yoga-hero__title">
              {hero.title}
            </h1>
            <p className="yoga-hero__tagline">
              {hero.subtitle}
            </p>
            <p className="yoga-hero__desc">
              {hero.description}
            </p>
            <p className="yoga-hero__subdesc">
              {hero.secondaryDesc}
            </p>

            {/* Action Buttons */}
            <div className="yoga-hero__actions">
              <a
                href={whatsappHeroUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="yoga-hero__btn-primary"
              >
                <MessageCircle size={16} />
                <span>{hero.ctaPrimary}</span>
              </a>

              <a href="#yoga-programs" className="yoga-hero__btn-secondary">
                <Calendar size={16} />
                <span>{hero.ctaSecondary}</span>
              </a>
            </div>
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
                <span className="yoga-stat-card__value">All Levels</span>
                <span className="yoga-stat-card__label">Beginners to Advanced</span>
              </div>
            </div>

            <div className="yoga-stat-card">
              <div className="yoga-stat-card__icon">
                <Award size={20} />
              </div>
              <div className="yoga-stat-card__info">
                <span className="yoga-stat-card__value">Doctor-Guided</span>
                <span className="yoga-stat-card__label">Ayurvedic Vaidyas &amp; Yogacharyas</span>
              </div>
            </div>
          </div>

          {/* Our Approach to Yoga Section */}
          <motion.section
            className="yoga-page-approach"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={standardViewport}
          >
            <div className="yoga-section-header text-center">
              <span className="yoga-section-tag">{approach.badge}</span>
              <h2 className="yoga-section-title">{approach.title}</h2>
              <p className="yoga-section-lead">{approach.lead}</p>
              <p className="yoga-approach-body">{approach.description}</p>
            </div>

            <div className="yoga-pillars-grid">
              {approach.pillars.map((pillar, idx) => {
                const IconComp = PILLAR_ICONS[idx % PILLAR_ICONS.length];
                return (
                  <motion.div
                    key={idx}
                    className="yoga-pillar-card"
                    variants={fadeUpVariants}
                  >
                    <div className="yoga-pillar-card__icon">
                      <IconComp size={20} />
                    </div>
                    <h3 className="yoga-pillar-card__title">{pillar.title}</h3>
                    <p className="yoga-pillar-card__desc">{pillar.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          {/* Our Yoga Programs: Open & Close Animated Cards Like Treatment */}
          <motion.section
            id="yoga-programs"
            className="yoga-programs-section"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={standardViewport}
          >
            <div className="yoga-section-header text-center">
              <span className="yoga-section-tag">CURATED PATHWAYS</span>
              <h2 className="yoga-section-title">Our Yoga Programs</h2>
              <p className="yoga-section-lead">
                Hover over any card to reveal session details, individual focus areas, and direct WhatsApp booking.
              </p>
            </div>

            <div className="yoga-programs-grid">
              {programs.map((program, index) => (
                <YogaProgramCard
                  key={program.id}
                  program={program}
                  index={index}
                />
              ))}
            </div>
          </motion.section>

          {/* What You'll Learn & Individual Health Needs */}
          <YogaLearningSection />

          {/* 5-Step Approach, Why Choose & Who Can Join */}
          <YogaStepsSection />

          {/* Weekly Interactive Timetable Schedule */}
          <section id="timetable" className="yoga-timetable-section">
            <div className="yoga-section-header text-center">
              <span className="yoga-section-tag">WEEKLY TIMETABLE</span>
              <h2 className="yoga-section-title">Live &amp; Shala Schedule</h2>
              <p className="yoga-section-lead">
                Filter by day, format (Online / In Shala), or practice level.
              </p>
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
                  different day or schedule a session.
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
          </section>

          {/* Begin Your Journey Booking Banner */}
          <YogaBookingCard />

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
        </div>
      </main>
      <Footer />
    </div>
  );
});

YogaSchedulePage.displayName = 'YogaSchedulePage';
