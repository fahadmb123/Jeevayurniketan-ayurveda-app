import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  PhoneCall,
  MessageCircle,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Heart,
  Compass,
  Award,
} from 'lucide-react';
import { YOGAATHMA_DATA } from '../data/yogaathmaData';
import { YogaProgramCard } from './YogaProgramCard';
import { ROUTES } from '@/shared/config/routes';
import {
  staggerContainerVariants,
  fadeUpVariants,
  standardViewport,
} from '@/shared/lib/animations';
import './YogaathmaSection.css';

const PILLAR_ICONS = [Compass, Award, Heart, Sparkles, ShieldCheck];

export const YogaathmaSection: React.FC = React.memo(() => {
  const { hero, approach, programs, philosophy, booking } = YOGAATHMA_DATA;

  const whatsappHeroUrl = `https://wa.me/918970695250?text=${encodeURIComponent(
    hero.whatsappMessage
  )}`;

  return (
    <section id="yoga" className="yogaathma-section">
      <div className="yogaathma-container">
        {/* Section Header */}
        <motion.div
          className="yogaathma-header text-center"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={standardViewport}
        >
          <motion.div className="yogaathma-badge-wrap" variants={fadeUpVariants}>
            <span className="yogaathma-badge">
              <Sparkles size={13} className="yogaathma-badge-icon" />
              <span>{hero.badge}</span>
            </span>
          </motion.div>

          <motion.h2 className="yogaathma-title" variants={fadeUpVariants}>
            {hero.title}
          </motion.h2>

          <motion.p className="yogaathma-tagline" variants={fadeUpVariants}>
            {hero.subtitle}
          </motion.p>

          <motion.p className="yogaathma-desc" variants={fadeUpVariants}>
            {hero.description}
          </motion.p>

          {/* Quick CTA Actions */}
          <motion.div className="yogaathma-hero-actions" variants={fadeUpVariants}>
            <a
              href={whatsappHeroUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="yogaathma-btn-primary"
            >
              <MessageCircle size={16} />
              <span>{hero.ctaPrimary}</span>
            </a>

            <Link to={ROUTES.YOGA} className="yogaathma-btn-secondary">
              <Calendar size={16} />
              <span>{hero.ctaSecondary}</span>
              <ArrowRight size={15} />
            </Link>
          </motion.div>
        </motion.div>

        {/* 5 Approach Pillars Row */}
        <motion.div
          className="yogaathma-pillars-row"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={standardViewport}
        >
          <div className="yogaathma-pillars-intro text-center">
            <span className="yogaathma-subheading-tag">{approach.badge}</span>
            <h3 className="yogaathma-approach-title">{approach.title}</h3>
            <p className="yogaathma-approach-lead">{approach.lead}</p>
          </div>

          <div className="yogaathma-pillars-grid">
            {approach.pillars.map((pillar, idx) => {
              const IconComp = PILLAR_ICONS[idx % PILLAR_ICONS.length];
              return (
                <motion.div
                  key={idx}
                  className="yogaathma-pillar-card"
                  variants={fadeUpVariants}
                >
                  <div className="yogaathma-pillar-card__icon">
                    <IconComp size={20} />
                  </div>
                  <h4 className="yogaathma-pillar-card__title">{pillar.title}</h4>
                  <p className="yogaathma-pillar-card__desc">{pillar.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* 5 Yoga Programs Grid: Open & Close animated cards "like in the treatment" */}
        <motion.div
          className="yogaathma-programs-block"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={standardViewport}
        >
          <div className="yogaathma-programs-header text-center">
            <span className="yogaathma-subheading-tag">CURATED PATHWAYS</span>
            <h3 className="yogaathma-programs-title">Our Yoga Programs</h3>
            <p className="yogaathma-programs-desc">
              Hover over each pathway below to explore specialized techniques, focus areas, and session formats.
            </p>
          </div>

          <div className="yogaathma-programs-grid">
            {programs.map((program, index) => (
              <YogaProgramCard
                key={program.id}
                program={program}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* Direct Booking & Consultation Banner */}
        <motion.div
          className="yogaathma-booking-card"
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={standardViewport}
        >
          <div className="yogaathma-booking-card__content">
            <span className="yogaathma-booking-card__tag">
              {booking.tagline}
            </span>
            <h3 className="yogaathma-booking-card__title">
              {booking.heading}
            </h3>
            <p className="yogaathma-booking-card__desc">
              {booking.description}
            </p>
            <p className="yogaathma-booking-card__options">
              <strong>Session options:</strong> {booking.options}
            </p>
          </div>

          <div className="yogaathma-booking-card__actions">
            <a
              href={`https://wa.me/918970695250?text=${encodeURIComponent(
                'Hello Jeevayurniketan | Yogaathma, I would like to book a yoga session.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="yogaathma-booking-btn-whatsapp"
            >
              <MessageCircle size={18} />
              <span>WhatsApp: {booking.phone}</span>
            </a>

            <a href={`tel:+918970695250`} className="yogaathma-booking-btn-call">
              <PhoneCall size={16} />
              <span>Call: {booking.phone}</span>
            </a>

            <Link to={ROUTES.YOGA} className="yogaathma-booking-btn-schedule">
              <Calendar size={16} />
              <span>Full Schedule &amp; Timetable</span>
            </Link>
          </div>
        </motion.div>

        {/* Philosophy & Disclaimer Quote */}
        <div className="yogaathma-philosophy-quote text-center">
          <p className="yogaathma-mantra">
            &ldquo;{philosophy.mantra}&rdquo;
          </p>
          <p className="yogaathma-disclaimer">
            {philosophy.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
});

YogaathmaSection.displayName = 'YogaathmaSection';
