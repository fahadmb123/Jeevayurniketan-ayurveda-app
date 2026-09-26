import React from 'react';
import './AboutSection.css';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-image-side animate-fade-in">
          <div className="about-image-placeholder">
            {/* Can use a real image later */}
            <div className="glass-card">
              <h3>20+ Years</h3>
              <p>Of Healing Experience</p>
            </div>
          </div>
        </div>
        
        <div className="about-content animate-fade-in" style={{ animationDelay: '0.2s' }}>
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
        </div>
      </div>
    </section>
  );
};
