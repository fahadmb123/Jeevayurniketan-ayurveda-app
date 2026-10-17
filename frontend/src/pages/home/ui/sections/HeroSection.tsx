import React from 'react';
import { motion, type Variants } from 'framer-motion';
import './HeroSection.css';
import heroImg from '@/assets/hero.png';

export const HeroSection: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-background-circle orb-1"></div>
      <div className="hero-background-circle orb-2"></div>
      
      <motion.div 
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        <motion.div variants={itemVariants} className="hero-badge">
          Ayurveda Counseling & Psychotherapy
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="hero-title">
          Heal Your Mind, <br />
          <span className="text-primary-green text-gradient">Nourish Your Body</span>
        </motion.h1>
        
        <motion.p variants={itemVariants} className="hero-subtitle">
          Experience the ancient wisdom of Ayurveda combined with modern psychotherapy for holistic healing. Find balance, peace, and wellness at Jeevayurniketan.
        </motion.p>
        
        <motion.div variants={itemVariants} className="hero-actions">
          <motion.button whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(46, 125, 50, 0.4)" }} whileTap={{ scale: 0.95 }} className="btn-primary btn-large">
            Start Your Journey
          </motion.button>
          <motion.button whileHover={{ scale: 1.05, backgroundColor: "var(--primary-green)", color: "white" }} whileTap={{ scale: 0.95 }} className="btn-outline btn-large">
            Learn More
          </motion.button>
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="hero-image-wrapper relative group"
        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', duration: 1.2, bounce: 0.4, delay: 0.3 }}
      >
        <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-1000 ease-in-out"></div>
        <motion.div 
          className="hero-image-glass relative z-10 overflow-hidden"
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        >
          <img src={heroImg} alt="Ayurveda Healing" className="hero-img transform group-hover:scale-110 transition-transform duration-700" />
        </motion.div>
      </motion.div>
    </section>
  );
};

