import React from 'react';
import { motion } from 'framer-motion';
import meditationImg from '@/assets/smriti_meditation.jpg';
import { Sparkles, Brain, Leaf, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/config/routes';
import './AboutSection.css';

export const AboutSection: React.FC = React.memo(() => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <motion.div 
          className="about-image-side"
          initial={{ opacity: 0, x: -35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="about-image-card">
            <img 
              src={meditationImg} 
              alt="Guided Smriti Meditation and Ayurvedic Psychotherapy Session at Jeevayurniketan" 
              className="about-image"
            />
            <div className="about-image-card__overlay" />
            
            <div className="about-glass-badge">
              <div className="about-glass-badge__number">20+</div>
              <div className="about-glass-badge__text">
                <strong>Years of Clinical Heritage</strong>
                <span>Pioneered by Dr. K.V. Dilipkumar</span>
              </div>
            </div>

            <div className="about-floating-chip">
              <Sparkles size={16} className="text-gold" />
              <span>Ayurveda & Psychotherapy Synergy</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="about-content"
          initial={{ opacity: 0, x: 35 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="section-pill">
            <Brain size={14} />
            <span>The Mind-Body Science of Ayurveda</span>
          </div>

          <h2 className="section-title">
            True Healing Begins When We Address The <span className="text-primary-green">Root In The Mind</span>
          </h2>

          <p className="section-description">
            Classical Ayurveda recognizes that physical illnesses often originate from suppressed emotional conflicts, unexpressed grief, and psychological stress (<em>Prajnaparadha</em>).
          </p>
          <p className="section-description-secondary">
            At <strong>Jeevayurniketan</strong>, under the visionary guidance of <strong>Dr. K.V. Dilipkumar</strong>, we combine ancient Ayurvedic psychotherapy (<em>Satvavajaya Chikitsa</em>) with <strong>Smriti Meditation</strong>—a scientifically validated, guided recall process that releases deep-seated trauma without lifelong psychiatric drugs.
          </p>
          
          <div className="about-pillars-grid">
            <div className="about-pillar-item">
              <div className="pillar-icon green">
                <Brain size={20} />
              </div>
              <div className="pillar-body">
                <h4>Satvavajaya (Psychotherapy)</h4>
                <p>Restraining unwholesome thought patterns to restore mental resilience and emotional clarity.</p>
              </div>
            </div>

            <div className="about-pillar-item">
              <div className="pillar-icon gold">
                <Sparkles size={20} />
              </div>
              <div className="pillar-body">
                <h4>Smriti Meditation</h4>
                <p>Interactive subconscious recall identifying and neutralising the emotional triggers of disease.</p>
              </div>
            </div>

            <div className="about-pillar-item">
              <div className="pillar-icon emerald">
                <Leaf size={20} />
              </div>
              <div className="pillar-body">
                <h4>Yukti Vyapasraya (Herbals)</h4>
                <p>Authentic Kerala herbs, Medhya rasayanas, and Panchakarma restoring humoral bio-balance.</p>
              </div>
            </div>
          </div>

          <div className="about-actions">
            <Link to={ROUTES.ABOUT} className="about-learn-more-btn">
              <span>Read Our Full Story & Philosophy</span>
              <ArrowRight size={16} />
            </Link>
            <div className="about-doctor-endorsement">
              <CheckCircle2 size={18} className="text-primary-green" />
              <span>Certified Clinical Vaidyas & Psychologists</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';
