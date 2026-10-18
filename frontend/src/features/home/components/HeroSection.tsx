import React from 'react';
import { motion, type Variants } from 'framer-motion';
import heroImg from '@/assets/hero.png';
import { BookAppointmentButton } from '@/features/appointments';
import { useHome } from '../hooks/useHome';
import './HeroSection.css';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

export const HeroSection: React.FC = React.memo(() => {
  const { heroData } = useHome();

  return (
    <section id="home" className="hero-section">
      <div className="hero-background-circle orb-1" />
      <div className="hero-background-circle orb-2" />
      
      <motion.div 
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-50px' }}
      >
        <motion.div variants={itemVariants} className="hero-badge">
          {heroData?.badge || 'Ayurveda Counseling & Psychotherapy'}
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="hero-title">
          {heroData?.title || 'Heal Your Mind,'} <br />
          <span className="text-primary-green text-gradient">
            {heroData?.highlightedText || 'Nourish Your Body'}
          </span>
        </motion.h1>
        
        <motion.p variants={itemVariants} className="hero-subtitle">
          {heroData?.subtitle ||
            'Experience the ancient wisdom of Ayurveda combined with modern psychotherapy for holistic healing. Find balance, peace, and wellness at Jeevayurniketan.'}
        </motion.p>
        
        <motion.div variants={itemVariants} className="hero-actions">
          <BookAppointmentButton
            label="Start Your Journey"
            size="lg"
            variant="primary"
          />
          <motion.a
            href="#about"
            whileHover={{ scale: 1.05, backgroundColor: 'var(--primary-green)', color: 'white' }}
            whileTap={{ scale: 0.95 }}
            className="btn-outline btn-large"
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
          >
            Learn More
          </motion.a>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="hero-image-wrapper relative group"
        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', duration: 1.2, bounce: 0.4, delay: 0.3 }}
      >
        <div className="hero-image-glass">
          <img src={heroImg} alt="Ayurvedic Wellness & Mental Peace" className="hero-img" />
        </div>
      </motion.div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

