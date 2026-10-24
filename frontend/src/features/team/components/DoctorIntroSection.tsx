import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, useAnimate, type Variants } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, HeartPulse, Leaf, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BookAppointmentButton } from '@/features/appointments';
import { ROUTES } from '@/shared/config/routes';
import consultationImg from '@/assets/ayurveda_consultation.jpg';
import { DR_AHALYA_DATA } from '../data/drAhalyaData';
import './DoctorIntroSection.css';

// SVG Morphing Paths for Organic Liquid Wave Wipe (5-frame sequence)
// P_START: Collapsed at bottom (height = 0, completely invisible)
const P_START = 'M 0 100 C 25 100, 25 100, 50 100 C 75 100, 75 100, 100 100 L 100 100 L 0 100 Z';

// P_IN_1 (Frame 1): Wave begins rising with curved crest from bottom-right
const P_IN_1 = 'M 0 100 C 25 98, 40 90, 55 82 C 70 72, 85 52, 100 42 L 100 100 L 0 100 Z';

// P_IN_2 (Frame 2): Organic liquid wave surges upwards across ~80% of card
const P_IN_2 = 'M 0 45 C 15 58, 35 38, 55 24 C 75 12, 88 5, 100 2 L 100 100 L 0 100 Z';

// P_FULL (Frame 3): Completely blanks out card in solid brand green (100% cover)
const P_FULL = 'M 0 0 C 25 0, 25 0, 50 0 C 75 0, 75 0, 100 0 L 100 100 L 0 100 Z';

// P_OUT_1 (Frame 4): Wave drops downwards diagonally, revealing top/center of new image
const P_OUT_1 = 'M 0 28 C 22 42, 38 58, 58 68 C 76 76, 90 84, 100 90 L 100 100 L 0 100 Z';

// P_OUT_END (Frame 5): Liquid wave clears off bottom completely
const P_OUT_END = 'M 0 100 C 25 100, 25 100, 50 100 C 75 100, 75 100, 100 100 L 100 100 L 0 100 Z';

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export const DoctorIntroSection: React.FC = React.memo(() => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [currentImage, setCurrentImage] = useState<string>(DR_AHALYA_DATA.image);

  // References for managing smooth queueing during rapid hover transitions
  const currentImageRef = useRef<string>(DR_AHALYA_DATA.image);
  const desiredImageRef = useRef<string>(DR_AHALYA_DATA.image);
  const isAnimatingRef = useRef(false);

  // Framer Motion scoped animator for SVG liquid wave
  const [scope, animate] = useAnimate();

  // Pre-load secondary image into browser cache
  useEffect(() => {
    const img1 = new Image();
    img1.src = DR_AHALYA_DATA.image;
    const img2 = new Image();
    img2.src = consultationImg;
  }, []);

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

  // Liquid Wave Cycle: Wipe in -> Swap Image -> Wipe out
  const startWipeCycle = useCallback(async () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    while (currentImageRef.current !== desiredImageRef.current) {
      const nextTarget = desiredImageRef.current;

      try {
        // Step 1: Liquid wave draws in from bottom right to cover 100% (Frames 1 -> 2 -> 3)
        await animate(
          '#doctor-liquid-path',
          { d: [P_START, P_IN_1, P_IN_2, P_FULL] },
          { duration: 0.38, times: [0, 0.35, 0.7, 1], ease: [0.22, 1, 0.36, 1] }
        );

        // Step 2: Swap the underlying image while covered ("fully that blank")
        currentImageRef.current = nextTarget;
        setCurrentImage(nextTarget);

        // Step 3: Liquid wave wipes away downwards, revealing new image (Frames 4 -> 5)
        await animate(
          '#doctor-liquid-path',
          { d: [P_FULL, P_OUT_1, P_OUT_END] },
          { duration: 0.38, times: [0, 0.45, 1], ease: [0.22, 1, 0.36, 1] }
        );

        // Instant reset back to starting zero-height base
        animate('#doctor-liquid-path', { d: P_START }, { duration: 0 });
      } catch {
        // Animation cleanup if interrupted
        break;
      }
    }

    isAnimatingRef.current = false;
  }, [animate]);

  const handleMouseEnter = () => {
    desiredImageRef.current = consultationImg;
    startWipeCycle();
  };

  const handleMouseLeave = () => {
    desiredImageRef.current = DR_AHALYA_DATA.image;
    startWipeCycle();
  };

  const handleCardClick = () => {
    desiredImageRef.current =
      currentImageRef.current === DR_AHALYA_DATA.image ? consultationImg : DR_AHALYA_DATA.image;
    startWipeCycle();
  };

  return (
    <section className="doctor-intro-section" aria-label={`${DR_AHALYA_DATA.name} introduction`}>
      <div className="doctor-intro-section__glow" />
      <div className="doctor-intro-section__container">
        {/* Outer media container stays steady with no border/card displacement */}
        <div className="doctor-intro-section__media" ref={cardRef}>
          <div className="doctor-intro-section__shadow-carrier">
            <motion.div
              ref={scope}
              className="doctor-intro-section__portrait-wrap"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleCardClick}
              role="button"
              tabIndex={0}
              aria-label="Click or hover to reveal consultation preview"
              initial={{ clipPath: 'inset(25% 0% 0% 0% round 32px)', opacity: 0.9 }}
              whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 32px)', opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              onAnimationComplete={() => setIsRevealed(true)}
              style={isRevealed ? { clipPath: 'none' } : undefined}
            >
              {/* Smooth animated image container with dynamic image swap */}
              <motion.div
                className="doctor-intro-section__portrait-motion"
                style={{ y: imageY }}
              >
                <img
                  src={currentImage}
                  alt={`${DR_AHALYA_DATA.name} — ${DR_AHALYA_DATA.role}`}
                  className="doctor-intro-section__portrait"
                  loading="eager"
                  decoding="async"
                />
              </motion.div>

              {/* Organic Liquid Wave Wipe Curtain Overlay */}
              <svg
                className="doctor-intro-section__liquid-wipe-svg"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  id="doctor-liquid-path"
                  d={P_START}
                  fill="var(--primary-green, #1B6B50)"
                />
              </svg>

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
