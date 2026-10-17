import React from 'react';
import { motion } from 'framer-motion';
import { useAbout } from '../hooks/useAbout';
import './AboutSection.css';

export const AboutSection: React.FC = () => {
  const { features } = useAbout();

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <motion.div 
          className="about-image-side"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="about-image-placeholder">
            <div className="glass-card">
              <h3>20+ Years</h3>
              <p>Of Healing Experience</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="about-content"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <h4 className="section-subtitle">About Us</h4>
          <h2 className="section-title">Discover the path to your <span className="text-primary-green">inner peace</span></h2>
          <p className="section-description">
            Jeevayurniketan is a premier Ayurveda and Psychotherapy clinic dedicated to treating psychosomatic illnesses, stress, and anxiety. We blend traditional Smriti Meditation with expert counseling.
          </p>
          
          <ul className="about-features">
            {features.map((feature, i) => (
              <motion.li key={i} whileHover={{ scale: 1.03, x: 6 }} className="about-feature-item">
                <div className="feature-icon">{feature.icon}</div>
                <div>
                  <h5>{feature.title}</h5>
                  <p>{feature.description}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};
