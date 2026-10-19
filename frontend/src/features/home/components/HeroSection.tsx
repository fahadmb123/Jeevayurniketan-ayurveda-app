import React from 'react';
import { motion, type Variants } from 'framer-motion';
import resortHeroImg from '@/assets/resort_hero.jpg';
import { TornPaperDivider } from './TornPaperDivider';
import { FloatingLeaves } from './FloatingLeaves';
import { BookAppointmentButton } from '@/features/appointments';
import { Sparkles, ArrowRight, ShieldCheck, Award, ChevronDown } from 'lucide-react';
import './HeroSection.css';

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 280,
      damping: 24,
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export const HeroSection: React.FC = React.memo(() => {
  return (
    <section id="home" className="ayurveda-resort-hero" aria-label="Jeevayurniketan Ayurvedic Sanctuary">
      {/* Background Resort Image Layer */}
      <div className="hero-resort-backdrop">
        <img
          src={resortHeroImg}
          alt="Authentic Kerala Traditional Ayurvedic Retreat Sanctuary surrounded by serene lotus waters and tropical nature"
          className="hero-resort-image"
          loading="eager"
          decoding="async"
        />
        {/* Soft atmospheric gradient overlays for optimal text legibility and light diffusion */}
        <div className="hero-sky-softener" />
        <div className="hero-ambient-vignette" />
      </div>

      {/* Hero Central Content: Exactly matches reference typography and placement */}
      <div className="hero-editorial-container">
        <motion.div
          className="hero-editorial-centerpiece"
          variants={titleVariants}
          initial="hidden"
          animate="show"
        >
          {/* Subtle Heritage Monogram / Badge */}
          <motion.div variants={wordVariants} className="hero-zen-pill">
            <span className="zen-dot" />
            <span>Pioneers in Ayurvedic Psychotherapy & Smriti Meditation</span>
          </motion.div>

          {/* Majestic Headline - Identical to Reference Design */}
          <motion.h1 variants={wordVariants} className="hero-editorial-title">
            <span className="title-line-1">Overall wellness</span>
            <span className="title-line-2">
              <span className="title-word-through">through </span>
              <span className="title-word-ayurvedha">Ayurvedha</span>
            </span>
          </motion.h1>

          {/* Harmonious Subtext */}
          <motion.p variants={wordVariants} className="hero-editorial-subtitle">
            Authentic Kerala Caraka Samhita healing, psychosomatic trauma recovery, 
            and restorative rejuvenation in harmony with nature.
          </motion.p>

          {/* Quick Actions */}
          <motion.div variants={wordVariants} className="hero-editorial-actions">
            <BookAppointmentButton
              label="Book Consultation"
              size="lg"
              variant="primary"
            />
            <a href="#about" className="hero-explore-btn">
              <span>Explore Sanctuary</span>
              <ArrowRight size={17} />
            </a>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div variants={wordVariants} className="hero-purity-badges">
            <div className="hero-purity-item">
              <ShieldCheck size={16} className="purity-icon" />
              <span>Govt. Approved Clinic</span>
            </div>
            <div className="hero-purity-divider">•</div>
            <div className="hero-purity-item">
              <Award size={16} className="purity-icon gold" />
              <span>20+ Years Clinical Heritage</span>
            </div>
            <div className="hero-purity-divider">•</div>
            <div className="hero-purity-item">
              <Sparkles size={16} className="purity-icon green" />
              <span>100% Classical Protocols</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator Prompt */}
        <motion.a
          href="#about"
          className="hero-scroll-cue"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          aria-label="Scroll down to explore about section"
        >
          <span className="scroll-cue-text">Scroll to explore</span>
          <ChevronDown size={18} className="scroll-cue-icon" />
        </motion.a>
      </div>

      {/* Bottom Torn Paper Edge Transition (Exact match to reference design) */}
      <TornPaperDivider className="hero-torn-bottom" />

      {/* Floating Leaves drifting over torn transition */}
      <FloatingLeaves />
    </section>
  );
});

HeroSection.displayName = 'HeroSection';
