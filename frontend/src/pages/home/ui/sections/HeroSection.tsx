import React from 'react';
import './HeroSection.css';
import heroImg from '@/assets/hero.png'; // Using the provided hero image

export const HeroSection: React.FC = () => {
  return (
    <section id="home" className="hero-section">
      <div className="hero-background-circle"></div>
      
      <div className="hero-content animate-fade-in">
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
      </div>
      
      <div className="hero-image-wrapper animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="hero-image-glass">
          <img src={heroImg} alt="Ayurveda Healing" className="hero-img" />
        </div>
      </div>
    </section>
  );
};
