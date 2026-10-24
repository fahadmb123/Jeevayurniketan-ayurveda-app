import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, type Variants } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, HeartPulse, Leaf, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BookAppointmentButton } from '@/features/appointments';
import { ROUTES } from '@/shared/config/routes';
import consultationImg from '@/assets/ayurveda_consultation.jpg';
import { DR_AHALYA_DATA } from '../data/drAhalyaData';
import './DoctorIntroSection.css';

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export const DoctorIntroSection: React.FC = React.memo(() => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  // Parallax subtle glide inside the frame
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  const imageY = useTransform(smoothProgress, [0, 1], [-20, 20]);

  return (
    <section className="doctor-intro-section" aria-label={`${DR_AHALYA_DATA.name} introduction`}>
      <div className="doctor-intro-section__glow" />
      <div className="doctor-intro-section__container">
        {/* Outer media container stays steady with no border/card displacement */}
        <div className="doctor-intro-section__media" ref={cardRef}>
          <div className="doctor-intro-section__shadow-carrier">
            <motion.div
              className="doctor-intro-section__portrait-wrap"
              initial={{ clipPath: 'inset(25% 0% 0% 0% round 32px)', opacity: 0.9 }}
              whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 32px)', opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              onAnimationComplete={() => setIsRevealed(true)}
              style={isRevealed ? { clipPath: 'none' } : undefined}
            >
              {/* Smooth animated image container with hover image swap */}
              <motion.div
                className="doctor-intro-section__portrait-motion"
                style={{ y: imageY }}
              >
                <img
                  src={DR_AHALYA_DATA.image}
                  alt={`${DR_AHALYA_DATA.name} — ${DR_AHALYA_DATA.role}`}
                  className="doctor-intro-section__portrait doctor-intro-section__portrait--primary"
                  loading="lazy"
                  decoding="async"
                />
                <img
                  src={consultationImg}
                  alt={`${DR_AHALYA_DATA.name} — Personalized Consultations`}
                  className="doctor-intro-section__portrait doctor-intro-section__portrait--secondary"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>

              <div className="doctor-intro-section__credential">
                <CheckCircle2 size={15} />
                <span>{DR_AHALYA_DATA.degrees}</span>
              </div>
            </motion.div>
          </div>
          <div className="doctor-intro-section__stamp" aria-hidden="true">
            <Leaf size={18} />
            <span>Personalized<br />Ayurvedic Care</span>
          </div>
        </div>

        <motion.div
          className="doctor-intro-section__content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={revealVariants}
        >
          <div className="doctor-intro-section__eyebrow">
            <Sparkles size={15} />
            <span>Meet your practitioner</span>
          </div>
          <h2 className="doctor-intro-section__title">
            Care that sees the person,<br />not just the symptoms.
          </h2>
          <p className="doctor-intro-section__role">{DR_AHALYA_DATA.role}</p>
          <p className="doctor-intro-section__summary">{DR_AHALYA_DATA.shortIntro}</p>

          <div className="doctor-intro-section__principles">
            <div className="doctor-intro-section__principle">
              <HeartPulse size={18} />
              <span>Personalized consultations</span>
            </div>
            <div className="doctor-intro-section__principle">
              <Leaf size={18} />
              <span>Ayurveda, yoga & meditation</span>
            </div>
          </div>

          <div className="doctor-intro-section__actions">
            <BookAppointmentButton size="md" variant="primary" label="Book a consultation" />
            <Link to={ROUTES.TEAM} className="doctor-intro-section__link">
              <span>Read full profile</span>
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

DoctorIntroSection.displayName = 'DoctorIntroSection';
