import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Compass, CheckCircle2, Activity, Brain, Leaf } from 'lucide-react';
import { DR_AHALYA_DATA } from '../data/drAhalyaData';
import { BookAppointmentButton } from '@/features/appointments';
import './DrAhalyaSpotlightSection.css';

export const DrAhalyaSpotlightSection: React.FC = React.memo(() => {
  const [selectedPhase, setSelectedPhase] = useState<'all' | 'Diagnostic Foundation' | 'Therapeutic Prescription' | 'Integrative Wellness'>('all');

  const filteredSteps = selectedPhase === 'all'
    ? DR_AHALYA_DATA.treatmentSteps
    : DR_AHALYA_DATA.treatmentSteps.filter((s) => s.category === selectedPhase);

  return (
    <section id="dr-ahalya" className="ahalya-spotlight-section" aria-label="Dr. Ahalya T.S. Profile and Treatment Approach">
      <div className="ahalya-spotlight-container">
        
        {/* Top Header Badge */}
        <div className="ahalya-spotlight-top text-center">
          <motion.div
            className="section-pill"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles size={14} />
            <span>Ayurveda • Yoga • Meditation • Holistic Wellness</span>
          </motion.div>

          <motion.h2
            className="spotlight-main-title"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            Meet <span className="text-primary-green">Dr. Ahalya T.S.</span>
          </motion.h2>

          <motion.p
            className="spotlight-tagline"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            “{DR_AHALYA_DATA.tagline}”
          </motion.p>
        </div>

        {/* Doctor Hero Card with Bio & Visual */}
        <div className="ahalya-hero-card">
          <motion.div
            className="ahalya-hero-media"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="ahalya-portrait-frame">
              <img
                src={DR_AHALYA_DATA.image}
                alt="Dr. Ahalya T.S. - Ayurvedic Physician & Holistic Wellness Practitioner"
                className="ahalya-portrait-img"
                loading="lazy"
              />
              <div className="ahalya-frame-badge">
                <CheckCircle2 size={16} />
                <span>BAMS • FCCAP • YIC</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="ahalya-hero-details"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          >
            <h3 className="ahalya-details-name">{DR_AHALYA_DATA.name}</h3>
            <h4 className="ahalya-details-role">{DR_AHALYA_DATA.role}</h4>
            
            <div className="ahalya-intro-quote-card">
              <p className="quote-intro-title">{DR_AHALYA_DATA.shortIntroTitle}</p>
              <p className="quote-intro-body">{DR_AHALYA_DATA.shortIntro}</p>
            </div>

            <div className="ahalya-bio-paragraphs">
              {DR_AHALYA_DATA.aboutBio.map((p, i) => (
                <p key={i} className="ahalya-bio-p">{p}</p>
              ))}
            </div>

            {/* Philosophy & Vision Callout Cards */}
            <div className="ahalya-pillars-duo">
              <div className="ahalya-pillar-item">
                <div className="pillar-icon-box">
                  <Heart size={18} />
                </div>
                <div>
                  <h5>Philosophy of Care</h5>
                  <p>{DR_AHALYA_DATA.philosophyOfCare}</p>
                </div>
              </div>

              <div className="ahalya-pillar-item">
                <div className="pillar-icon-box">
                  <Compass size={18} />
                </div>
                <div>
                  <h5>My Vision</h5>
                  <p>{DR_AHALYA_DATA.vision}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Areas of Interest Strip */}
        <div className="ahalya-interests-section">
          <div className="interests-header text-center">
            <h4 className="section-subtitle">Clinical Focus</h4>
            <h3 className="section-title">Areas of Professional Interest</h3>
          </div>

          <div className="interests-grid">
            {DR_AHALYA_DATA.areasOfInterest.map((item, idx) => (
              <motion.div
                key={item.title}
                className="interest-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <div className="interest-card__icon">
                  {idx === 0 && <Activity size={22} />}
                  {idx === 1 && <Heart size={22} />}
                  {idx === 2 && <Brain size={22} />}
                  {idx === 3 && <Compass size={22} />}
                  {idx === 4 && <Leaf size={22} />}
                </div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 10-Step Ayurvedic Treatment Approach Section */}
        <div className="treatment-approach-section">
          <div className="treatment-header text-center">
            <div className="section-pill">
              <Compass size={14} />
              <span>Evidence-Informed Methodology</span>
            </div>
            <h3 className="section-title">My 10-Step Ayurvedic Treatment Approach</h3>
            <p className="treatment-subtitle">
              Every healing protocol is rooted in a structured clinical evaluation of your Prakriti, Vikriti, Agni,
              and psychological harmony, guiding you into sustainable vitality.
            </p>
          </div>

          {/* Phase Filter Controls */}
          <div className="phase-filter-bar">
            <button
              type="button"
              className={`phase-btn ${selectedPhase === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedPhase('all')}
            >
              All 10 Steps
            </button>
            <button
              type="button"
              className={`phase-btn ${selectedPhase === 'Diagnostic Foundation' ? 'active' : ''}`}
              onClick={() => setSelectedPhase('Diagnostic Foundation')}
            >
              Phase 1: Diagnosis (Steps 1–4)
            </button>
            <button
              type="button"
              className={`phase-btn ${selectedPhase === 'Therapeutic Prescription' ? 'active' : ''}`}
              onClick={() => setSelectedPhase('Therapeutic Prescription')}
            >
              Phase 2: Therapeutics (Steps 5–8)
            </button>
            <button
              type="button"
              className={`phase-btn ${selectedPhase === 'Integrative Wellness' ? 'active' : ''}`}
              onClick={() => setSelectedPhase('Integrative Wellness')}
            >
              Phase 3: Mind-Body & Continuity (Steps 9–10)
            </button>
          </div>

          {/* 10 Step Cards Grid */}
          <div className="steps-matrix-grid">
            <AnimatePresence mode="popLayout">
              {filteredSteps.map((step) => (
                <motion.div
                  key={step.step}
                  layout
                  className="step-matrix-card"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="step-matrix-card__top">
                    <span className="step-matrix-number">{String(step.step).padStart(2, '0')}</span>
                    <span className="step-matrix-cat">{step.category}</span>
                  </div>

                  <h4 className="step-matrix-title">{step.title}</h4>
                  <span className="step-matrix-focus">{step.focus}</span>
                  <p className="step-matrix-desc">{step.description}</p>

                  <div className="step-matrix-principles">
                    {step.principles.map((pr, pIdx) => (
                      <span key={pIdx} className="step-principle-tag">
                        <CheckCircle2 size={12} />
                        {pr}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Education & Accreditations */}
        <div className="ahalya-education-section">
          <div className="education-header text-center">
            <h4 className="section-subtitle">Academic Pedigree</h4>
            <h3 className="section-title">Education & Additional Training</h3>
          </div>

          <div className="education-grid">
            {DR_AHALYA_DATA.educationAndTraining.map((item, idx) => (
              <motion.div
                key={idx}
                className="education-card"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
              >
                <div className="education-badge-tag">{item.badge}</div>
                <h4>{item.degree}</h4>
                <p>{item.institution}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Consultation Callout Banner */}
        <div className="spotlight-cta-banner">
          <div className="spotlight-cta-text">
            <h3>Ready to Experience Personalized Ayurvedic Healing?</h3>
            <p>
              Book your comprehensive consultation with Dr. Ahalya T.S. to discover your Prakriti
              and receive a tailored treatment protocol.
            </p>
          </div>
          <BookAppointmentButton size="lg" variant="primary" label="Consult with Dr. Ahalya T.S." />
        </div>

      </div>
    </section>
  );
});

DrAhalyaSpotlightSection.displayName = 'DrAhalyaSpotlightSection';
