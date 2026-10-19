import React from 'react';
import { motion, type Variants } from 'framer-motion';
import consultationImg from '@/assets/ayurveda_consultation.jpg';
import { Sparkles, Brain, Leaf, ShieldCheck, ArrowRight, Quote, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/config/routes';
import './AboutSection.css';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

interface PillarCard {
  icon: React.ReactNode;
  title: string;
  sanskrit: string;
  description: string;
  tag: string;
}

const PILLARS: PillarCard[] = [
  {
    icon: <Brain size={22} />,
    title: 'Ayurvedic Psychotherapy',
    sanskrit: 'Satvavajaya Chikitsa',
    description: 'Guiding the mind away from unwholesome impulses to dissolve anxiety, depression, and mental exhaustion naturally.',
    tag: 'Mind Healing',
  },
  {
    icon: <Sparkles size={22} />,
    title: 'Smriti Meditation',
    sanskrit: 'Subconscious Recall Process',
    description: 'A scientifically pioneered recall methodology that traces and releases deep-seated trauma without synthetic tranquilizers.',
    tag: 'Emotional Detox',
  },
  {
    icon: <Leaf size={22} />,
    title: 'Panchakarma & Rasayana',
    sanskrit: 'Yukti Vyapasraya',
    description: 'Authentic Kerala herbal decoctions, Shirodhara, and customized cellular cleansing to revitalize physical vitality.',
    tag: 'Bio-Balance',
  },
];

export const AboutSection: React.FC = React.memo(() => {
  return (
    <section id="about" className="clean-about-section" aria-label="About Jeevayurniketan Sanctuary">
      <div className="clean-about-container">
        
        {/* Left Column: Visual Sanctuary & Doctor Consultation */}
        <motion.div 
          className="clean-about-visual-side"
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="clean-about-image-frame">
            <img 
              src={consultationImg} 
              alt="Traditional Kerala Ayurvedic Doctor conducting Nadi Pariksha consultation at Jeevayurniketan" 
              className="clean-about-img"
              loading="lazy"
            />
            <div className="clean-about-img-vignette" />

            {/* Heritage Badge */}
            <div className="clean-about-heritage-badge">
              <div className="heritage-badge-num">20+</div>
              <div className="heritage-badge-meta">
                <strong>Years of Clinical Heritage</strong>
                <span>Pioneered by Dr. K.V. Dilipkumar</span>
              </div>
            </div>

            {/* Floating Trust Indicator */}
            <div className="clean-about-floating-tag">
              <ShieldCheck size={16} className="text-leaf" />
              <span>Nadi Pariksha & Pulse Diagnosis</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Editorial Philosophy & Pillars */}
        <motion.div 
          className="clean-about-content-side"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {/* Section Kicker */}
          <motion.div variants={itemVariants} className="clean-about-kicker">
            <span className="kicker-dot" />
            <span>The Science of Mind-Body Healing</span>
          </motion.div>

          {/* Majestic Editorial Title */}
          <motion.h2 variants={itemVariants} className="clean-about-title">
            True Healing Begins When We Treat The <br />
            <span className="clean-about-title-highlight">Emotional Root In The Mind</span>
          </motion.h2>

          {/* Editorial Excerpt */}
          <motion.p variants={itemVariants} className="clean-about-lead">
            Classical Caraka Samhita Ayurveda teaches that bodily diseases frequently sprout from <em>Prajnaparadha</em>—crimes against one’s own wisdom, chronic mental strain, and suppressed emotional wounds.
          </motion.p>

          {/* Founder Quote Card */}
          <motion.div variants={itemVariants} className="clean-about-quote-card">
            <Quote size={28} className="quote-icon" />
            <div className="quote-text-wrap">
              <p className="quote-text">
                "We do not merely suppress distress with lifelong psychiatric drugs. Through Smriti Meditation, we guide the patient to uncover, confront, and dissolve root traumas."
              </p>
              <div className="quote-author">
                <strong>Dr. K.V. Dilipkumar</strong>
                <span>Founder & Chief Ayurvedic Psychotherapist</span>
              </div>
            </div>
          </motion.div>

          {/* Three Core Healing Pillars */}
          <motion.div variants={itemVariants} className="clean-about-pillars">
            {PILLARS.map((pillar) => (
              <div key={pillar.title} className="clean-pillar-item">
                <div className="clean-pillar-icon-wrap">
                  {pillar.icon}
                </div>
                <div className="clean-pillar-content">
                  <div className="clean-pillar-head">
                    <h3 className="clean-pillar-title">{pillar.title}</h3>
                    <span className="clean-pillar-tag">{pillar.tag}</span>
                  </div>
                  <span className="clean-pillar-sanskrit">{pillar.sanskrit}</span>
                  <p className="clean-pillar-desc">{pillar.description}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Action Row */}
          <motion.div variants={itemVariants} className="clean-about-actions">
            <Link to={ROUTES.ABOUT} className="clean-about-btn-primary">
              <span>Read Our Full Story & Research</span>
              <ArrowRight size={17} />
            </Link>

            <div className="clean-about-verification">
              <CheckCircle2 size={18} className="text-leaf" />
              <span>Govt. Certified Vaidyas & Clinical Psychologists</span>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';
