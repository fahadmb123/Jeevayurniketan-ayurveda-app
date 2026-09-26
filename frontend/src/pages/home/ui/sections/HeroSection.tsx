import React from 'react';
import { motion } from 'framer-motion';
import './HeroSection.css';
import heroImg from '@/assets/hero.png';

export const HeroSection: React.FC = () => {
  return (
    <section id="home" className="hero-section">
      <div className="hero-background-circle"></div>
      
      <motion.div 
        className="hero-content"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-badge">Ayurveda Counseling & Psychotherapy</div>
        <h1 className="hero-title">
          Heal Your Mind, <br />
          <span className="text-primary-green">Nourish Your Body</span>
        </h1>
        <p className="hero-subtitle">
          Experience the ancient wisdom of Ayurveda combined with modern psychotherapy for holistic healing. Find balance, peace, and wellness at Jeevayurniketan.
        </p>
        <div className="hero-actions">
          <button className="btn-primary btn-large">Start Your Journey</button>
          <button className="btn-outline btn-large">Learn More</button>
        </div>
      </motion.div>
      
      <motion.div 
        className="hero-image-wrapper"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="hero-image-glass">
          <img src={heroImg} alt="Ayurveda Healing" className="hero-img" />
        </div>
      </motion.div>
    </section>
  );
};

