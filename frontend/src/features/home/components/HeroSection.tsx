import React from 'react';
import { motion, type Variants } from 'framer-motion';
import heroFlatlayImg from '@/assets/ayurveda_hero_flatlay.jpg';
import { BotanicalLotusArt } from './BotanicalLotusArt';
import { OrganicWaveDivider } from './OrganicWaveDivider';
import { BookAppointmentButton } from '@/features/appointments';
import { ArrowRight } from 'lucide-react';
import { ROUTES } from '@/shared/config/routes';
import { Link } from 'react-router-dom';
import './HeroSection.css';

const fadeVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export const HeroSection: React.FC = React.memo(() => {
  return (
    <section id="home" className="ayuva-hero-section" aria-label="Jeevayurniketan Ayurvedic Sanctuary">
      <div className="hero-split-wrapper">
        
        {/* Left Column: Ivory Editorial Content & Delicate Botanical Line Art */}
        <div className="hero-split-left">
          {/* Subtle Botanical Lotus Watermark */}
          <BotanicalLotusArt className="hero-botanical-watermark" />

          <motion.div
            className="hero-split-content"
            variants={fadeVariants}
            initial="hidden"
            animate="show"
          >
            {/* Pill Kicker Badge */}
            <motion.div variants={itemVariants} className="hero-welcome-badge">
              <span>WELCOME TO JEEVAYURNIKETAN</span>
            </motion.div>

            {/* Editorial Serif Headline */}
            <motion.h1 variants={itemVariants} className="hero-headline">
              Natural wellness for<br />
              everyday balance
            </motion.h1>

            {/* Supportive Subtitle */}
            <motion.p variants={itemVariants} className="hero-description">
              Discover authentic herbal formulations, Satvavajaya psychotherapy, and 
              mindful treatments designed to support a calmer, more balanced lifestyle.
            </motion.p>

            {/* Action Buttons Row */}
            <motion.div variants={itemVariants} className="hero-actions-row">
              <div className="hero-primary-cta">
                <BookAppointmentButton
                  label="EXPLORE THERAPIES"
                  size="lg"
                  variant="primary"
                />
              </div>

              <Link to={ROUTES.ABOUT} className="hero-secondary-cta">
                <span>EXPLORE WELLNESS</span>
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Column: High-Res Ayurvedic Flat-Lay Apothecary Visual */}
        <div className="hero-split-right">
          <div className="hero-visual-card">
            <img
              src={heroFlatlayImg}
              alt="Flat-lay of Ayurvedic herbal wellness apothecary: cold-pressed oils, dried lavender, rosebuds, and fresh mint on deep forest green linen"
              className="hero-flatlay-img"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>

      </div>

      {/* Smooth Organic Wave Divider Transition into Next Section */}
      <OrganicWaveDivider className="hero-bottom-wave" />
    </section>
  );
});

HeroSection.displayName = 'HeroSection';
