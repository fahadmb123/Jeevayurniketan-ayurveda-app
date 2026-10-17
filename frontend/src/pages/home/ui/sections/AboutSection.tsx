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
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h4 className="section-subtitle">About Us</h4>
          <h2 className="section-title">Discover the path to your <span className="text-primary-green">inner peace</span></h2>
          <p className="section-description">
            Jeevayurniketan is a premier Ayurveda and Psychotherapy clinic dedicated to treating psychosomatic illnesses, stress, and anxiety. We blend traditional Smriti Meditation with expert counseling.
          </p>
          
          <ul className="about-features">
            <motion.li whileHover={{ scale: 1.05, x: 10 }} className="group">
              <div className="feature-icon group-hover:bg-green-500/20 group-hover:scale-110 transition-all duration-300">✨</div>
              <div>
                <h5 className="group-hover:text-green-700 transition-colors">Holistic Approach</h5>
                <p>Treating root causes, not just symptoms.</p>
              </div>
            </motion.li>
            <motion.li whileHover={{ scale: 1.05, x: 10 }} className="group">
              <div className="feature-icon group-hover:bg-green-500/20 group-hover:scale-110 transition-all duration-300">🌿</div>
              <div>
                <h5 className="group-hover:text-green-700 transition-colors">Smriti Meditation</h5>
                <p>Guided therapeutic meditation for emotional healing.</p>
              </div>
            </motion.li>
            <motion.li whileHover={{ scale: 1.05, x: 10 }} className="group">
              <div className="feature-icon group-hover:bg-green-500/20 group-hover:scale-110 transition-all duration-300">👨‍⚕️</div>
              <div>
                <h5 className="group-hover:text-green-700 transition-colors">Expert Practitioners</h5>
                <p>Led by certified Ayurveda Doctors and Counselors.</p>
              </div>
            </motion.li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

