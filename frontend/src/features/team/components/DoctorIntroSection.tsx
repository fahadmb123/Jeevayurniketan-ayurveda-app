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
  const [isHovered, setIsHovered] = useState(false);
  const [activeImage, setActiveImage] = useState<'primary' | 'secondary'>('primary');
  const swapTimerRef = useRef<number | null>(null);

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

  // Organic wave wipe transition handlers matching user's frame-by-frame reference
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (swapTimerRef.current) clearTimeout(swapTimerRef.current);
    // Swap image at exact midpoint (675ms of 1.35s) when the wave curtain 100% covers the card
    swapTimerRef.current = window.setTimeout(() => {
      setActiveImage('secondary');
    }, 675);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (swapTimerRef.current) clearTimeout(swapTimerRef.current);
    // Swap back at midpoint of the return wave sweep
    swapTimerRef.current = window.setTimeout(() => {
      setActiveImage('primary');
    }, 675);
  };

  const handleToggle = () => {
    if (isHovered) {
      handleMouseLeave();
    } else {
      handleMouseEnter();
    }
  };

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
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleToggle}
              role="button"
              tabIndex={0}
              aria-label="Hover or tap to reveal personalized consultation"
            >
              {/* Smooth animated image container with hover image swap */}
              <motion.div
                className="doctor-intro-section__portrait-motion"
                style={{ y: imageY }}
              >
                <img
                  src={DR_AHALYA_DATA.image}
                  alt={`${DR_AHALYA_DATA.name} — ${DR_AHALYA_DATA.role}`}
                  className={`doctor-intro-section__portrait doctor-intro-section__portrait--primary ${
                    activeImage === 'primary' ? 'is-active' : ''
                  }`}
                  loading="lazy"
                  decoding="async"
                />
                <img
                  src={consultationImg}
                  alt={`${DR_AHALYA_DATA.name} — Personalized Consultations`}
                  className={`doctor-intro-section__portrait doctor-intro-section__portrait--secondary ${
                    activeImage === 'secondary' ? 'is-active' : ''
                  }`}
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>

              {/* Organic Liquid Wave Curtain: diagonally sweeps from bottom-right to top-left */}
              <div className="doctor-liquid-wipe-wrap" aria-hidden="true">
                <motion.div
                  className="doctor-liquid-wipe"
                  initial={{ y: 560 }}
                  animate={{ y: isHovered ? -560 : 560 }}
                  transition={{
                    duration: 1.35,
                    ease: [0.32, 0, 0.24, 1],
                  }}
                >
                  <svg
                    viewBox="0 0 700 1200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="doctor-liquid-wipe__svg"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="ayurLiquidWipeGrad" x1="0" y1="1200" x2="0" y2="0" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#0B2B20" />
                        <stop offset="35%" stopColor="#1B6B50" />
                        <stop offset="70%" stopColor="#248263" />
                        <stop offset="100%" stopColor="#1B6B50" />
                      </linearGradient>
                      <linearGradient id="ayurWaveAccentGrad" x1="0" y1="1200" x2="0" y2="0" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#C98D3B" stopOpacity="0.5" />
                        <stop offset="50%" stopColor="#3EB489" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#C98D3B" stopOpacity="0.5" />
                      </linearGradient>
                      <filter id="ayurWipeGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="10" stdDeviation="18" floodColor="#071E16" floodOpacity="0.5" />
                      </filter>
                    </defs>

                    {/* Translucent accent wave leading edge */}
                    <path
                      d="M -30 220 C 140 120, 270 300, 430 160 C 550 60, 620 230, 730 140 L 730 240 C 620 330, 550 160, 430 260 C 270 400, 140 220, -30 320 Z"
                      fill="url(#ayurWaveAccentGrad)"
                    />

                    {/* Main solid organic wave curtain */}
                    <path
                      d="M -30 280 C 140 180, 270 360, 430 220 C 550 120, 620 290, 730 200 L 730 960 C 620 1060, 500 890, 360 1030 C 220 1150, 100 950, -30 1050 Z"
                      fill="url(#ayurLiquidWipeGrad)"
                      filter="url(#ayurWipeGlow)"
                    />

                    {/* Translucent accent wave trailing edge */}
                    <path
                      d="M -30 1050 C 100 950, 220 1150, 360 1030 C 500 890, 620 1060, 730 960 L 730 1060 C 620 1160, 500 990, 360 1130 C 220 1250, 100 1050, -30 1150 Z"
                      fill="url(#ayurWaveAccentGrad)"
                    />

                    {/* Branded center badge echoing the reference sticker */}
                    <g transform="translate(350, 600)" className="doctor-liquid-wipe__emblem">
                      <circle r="46" fill="#FFFFFF" filter="drop-shadow(0 6px 14px rgba(0,0,0,0.18))" />
                      <circle r="40" fill="none" stroke="#C98D3B" strokeWidth="1.5" strokeDasharray="3 3" />
                      <circle r="36" fill="#1B6B50" />
                      <path
                        d="M0 -18 C10 -6 16 8 0 20 C-16 8 -10 -6 0 -18 Z"
                        fill="#C98D3B"
                      />
                      <path
                        d="M0 -14 C6 -4 10 6 0 16 C-10 6 -6 -4 0 -14 Z"
                        fill="#FFFFFF"
                      />
                    </g>
                  </svg>
                </motion.div>
              </div>

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
