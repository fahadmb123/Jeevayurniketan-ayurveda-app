import React from 'react';
import { motion, type Variants } from 'framer-motion';
import heroImg from '@/assets/ayurveda_hero.jpg';
import { BookAppointmentButton } from '@/features/appointments';
import { useHome } from '../hooks/useHome';
import { Sparkles, CheckCircle2, ShieldCheck, ArrowRight, MessageCircle, Star } from 'lucide-react';
import './HeroSection.css';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 320, damping: 26 } },
};

export const HeroSection: React.FC = React.memo(() => {
  const { heroData } = useHome();

  return (
    <section id="home" className="hero-section">
      <div className="hero-background-circle orb-1" />
      <div className="hero-background-circle orb-2" />
      <div className="hero-background-circle orb-3" />
      
      <motion.div 
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-50px' }}
      >
        <motion.div variants={itemVariants} className="hero-badge">
          <span className="hero-badge__dot" />
          <span className="hero-badge__text">
            {heroData?.badge || 'Pioneers in Ayurvedic Psychotherapy & Smriti Meditation'}
          </span>
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="hero-title">
          Heal The Mind, <br />
          <span className="hero-title__highlight">
            Restore Inner Harmony.
          </span>
        </motion.h1>
        
        <motion.p variants={itemVariants} className="hero-subtitle">
          Experience the sacred synergy of authentic Caraka Samhita Ayurveda, pioneer-led Smriti Meditation, and compassionate psychotherapy. Resolving anxiety, depression, and psychosomatic illness at their deep emotional root.
        </motion.p>
        
        <motion.div variants={itemVariants} className="hero-actions">
          <BookAppointmentButton
            label="Book Consultation"
            size="lg"
            variant="primary"
          />
          <motion.a
            href="#services"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="hero-btn-secondary"
          >
            <span>Explore Therapies</span>
            <ArrowRight size={18} />
          </motion.a>
          <motion.a
            href="https://wa.me/+919544260145"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="hero-btn-whatsapp"
            aria-label="Chat directly with our Ayurvedic Doctors on WhatsApp"
            title="Chat directly on WhatsApp"
          >
            <MessageCircle size={18} className="hero-whatsapp-icon" />
            <span className="hero-whatsapp-text">Ask Doctor</span>
          </motion.a>
        </motion.div>

        <motion.div variants={itemVariants} className="hero-trust-chips">
          <div className="hero-trust-chip">
            <ShieldCheck size={16} className="hero-chip-icon" />
            <span>Govt. Approved Clinic</span>
          </div>
          <div className="hero-trust-chip">
            <Star size={16} className="hero-chip-icon star" fill="currentColor" />
            <span>4.9/5 Rating (1,200+ Healed)</span>
          </div>
          <div className="hero-trust-chip">
            <CheckCircle2 size={16} className="hero-chip-icon" />
            <span>No Synthetic Drugs</span>
          </div>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="hero-visual-wrapper"
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', duration: 1.2, bounce: 0.25, delay: 0.25 }}
      >
        <div className="hero-image-frame">
          <img 
            src={heroImg} 
            alt="Authentic Kerala Ayurvedic Sanctuary with Brass Urli, lotus blossoms and herbal oils" 
            className="hero-main-img" 
            loading="eager"
          />
          <div className="hero-image-overlay" />
          
          {/* Floating Glassmorphic Badges */}
          <motion.div 
            className="hero-floating-badge badge-top-right"
            initial={{ opacity: 0, x: 20, y: -10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="hero-floating-badge__icon gold">
              <Sparkles size={18} />
            </div>
            <div className="hero-floating-badge__text">
              <span className="badge-title">Smriti Meditation</span>
              <span className="badge-sub">Guided Subconscious Healing</span>
            </div>
          </motion.div>

          <motion.div 
            className="hero-floating-badge badge-bottom-left"
            initial={{ opacity: 0, x: -20, y: 15 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <div className="hero-floating-badge__icon green">
              <CheckCircle2 size={18} />
            </div>
            <div className="hero-floating-badge__text">
              <span className="badge-title">98.4% Relief Rate</span>
              <span className="badge-sub">Verified Clinical Outcomes</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';
