import React from 'react';
import { motion } from 'framer-motion';
import './AboutSection.css';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <motion.div 
          className="about-image-side"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="about-image-placeholder">
            {/* Can use a real image later */}
            <div className="glass-card">
              <h3>20+ Years</h3>
              <p>Of Healing Experience</p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="about-content"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h4 className="section-subtitle">About Us</h4>
          <h2 className="section-title">Discover the path to your inner peace</h2>
          <p className="section-description">
            Jeevayurniketan is a premier Ayurveda and Psychotherapy clinic dedicated to treating psychosomatic illnesses, stress, and anxiety. We blend traditional Smriti Meditation with expert counseling.
          </p>
          
          <ul className="about-features">
            <li>
              <div className="feature-icon">✨</div>
              <div>
                <h5>Holistic Approach</h5>
                <p>Treating root causes, not just symptoms.</p>
              </div>
            </li>
            <li>
              <div className="feature-icon">🌿</div>
              <div>
                <h5>Smriti Meditation</h5>
                <p>Guided therapeutic meditation for emotional healing.</p>
              </div>
            </li>
            <li>
              <div className="feature-icon">👨‍⚕️</div>
              <div>
                <h5>Expert Practitioners</h5>
                <p>Led by certified Ayurveda Doctors and Counselors.</p>
              </div>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

