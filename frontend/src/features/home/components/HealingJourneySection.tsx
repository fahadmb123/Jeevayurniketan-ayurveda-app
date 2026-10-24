import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from 'framer-motion';
import { BookAppointmentButton } from '@/features/appointments';
import { ROUTES } from '@/shared/config/routes';
import './HealingJourneySection.css';

interface GalleryCardItem {
  id: string;
  src: string;
  alt: string;
}

const TREATMENT_IMAGES: GalleryCardItem[] = [
  {
    id: 'shot-6',
    src: '/treatments/treatment-1.png',
    alt: 'Ayurvedic Botanical Treatment & Natural Remedies',
  },
  {
    id: 'shot-5',
    src: '/treatments/treatment-2.jpg',
    alt: 'Holistic Herbal Therapy & Therapeutic Oils',
  },
  {
    id: 'shot-4',
    src: '/treatments/treatment-3.jpg',
    alt: 'Ayurvedic Nutrition & Mind-Body Restoration',
  },
];

const YOGA_IMAGES: GalleryCardItem[] = [
  {
    id: 'yoga-1',
    src: '/yoga/yoga-1.jpg',
    alt: 'Therapeutic Asana & Mindful Movement',
  },
  {
    id: 'yoga-2',
    src: '/yoga/yoga-2.jpg',
    alt: 'Pranayama Breathwork & Guided Meditation',
  },
  {
    id: 'yoga-3',
    src: '/yoga/yoga-3.jpg',
    alt: 'Restorative Yogic Healing & Dosha Balance',
  },
];

export const HealingJourneySection: React.FC = React.memo(() => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  const [leftShift, setLeftShift] = useState(380);
  const [currentWord, setCurrentWord] = useState<'Treatments' | 'Yoga'>('Treatments');

  // Compute exact pixel shift from screen center to the left margin
  useEffect(() => {
    const calcShift = () => {
      const headingEl = headingRef.current;
      const headingW = headingEl ? headingEl.offsetWidth : 320;
      const leftMargin = Math.min(60, Math.max(20, window.innerWidth * 0.045));
      const shift = window.innerWidth / 2 - headingW / 2 - leftMargin;
      setLeftShift(Math.max(0, shift));
    };

    calcShift();
    window.addEventListener('resize', calcShift);
    document.fonts?.ready?.then(calcShift);
    return () => window.removeEventListener('resize', calcShift);
  }, []);

  // Track scroll progress through the entire treatments & yoga section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 92px', 'end 92px'],
  });

  // Smooth scroll-driven horizontal trajectory:
  // 0.00 - 0.05: Centered in Treatments (0)
  // 0.05 - 0.22: Smoothly glides across to Left (-leftShift)
  // 0.22 - 0.46: Stays pinned on Left (-leftShift)
  // 0.46 - 0.62: Smoothly glides from Left to Center (0) into Yoga
  // 0.62 - 0.92: Stays Centered in Yoga (0)
  const rawX = useTransform(
    scrollYProgress,
    [0, 0.05, 0.22, 0.46, 0.62, 0.92, 1],
    [0, 0, -leftShift, -leftShift, 0, 0, 0]
  );

  // Silky smooth spring momentum that you can physically FEEL when scrolling
  const smoothX = useSpring(rawX, {
    stiffness: 90,
    damping: 20,
    mass: 0.25,
  });

  // Fixed heading opacity: hidden before the section, fully visible throughout, hidden after
  const rawOpacity = useTransform(
    scrollYProgress,
    [-0.05, 0, 0.03, 0.94, 0.98],
    [0, 0, 1, 1, 0]
  );

  // Static in-flow title in Treatments: fades out as the fixed title activates
  const staticTitleOpacity = useTransform(
    scrollYProgress,
    [-0.05, 0, 0.03],
    [1, 1, 0]
  );

  // Morph title text between Treatments and Yoga at the midpoint transition
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest >= 0.54) {
      setCurrentWord('Yoga');
    } else {
      setCurrentWord('Treatments');
    }
  });

  return (
    <section
      ref={sectionRef}
      className="healing-journey-section"
      id="treatments"
      aria-label="Our Treatments and Yoga"
    >
      {/* ==================================================================
          FIXED TRAVELING HEADING (Guaranteed 100% Fixed On Screen)
          Directly driven by scroll momentum with tactile feel
          ================================================================== */}
      <motion.div
        className="journey-fixed-header-container"
        style={{ opacity: rawOpacity }}
      >
        <motion.div
          ref={headingRef}
          style={{ x: smoothX }}
          className="journey-fixed-heading"
        >
          <h2 className="journey-title journey-title--fixed">
            <span>Our </span>
            <span className="journey-morph-wrap">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={currentWord}
                  initial={{ y: 20, opacity: 0, filter: 'blur(3px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: -20, opacity: 0, filter: 'blur(3px)' }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="text-primary-green journey-morph-word"
                >
                  {currentWord}
                </motion.span>
              </AnimatePresence>
            </span>
          </h2>
        </motion.div>
      </motion.div>

      <div className="healing-journey-container">
        {/* ==================================================================
            1. OUR TREATMENTS
            ================================================================== */}
        <div className="healing-journey-header text-center">
          <div className="section-pill">
            <Compass size={14} />
            <span>Therapeutic Modalities</span>
          </div>
          {/* Static Title: visible when at the very top, fades as fixed heading glides to the left */}
          <motion.h2
            className="journey-title journey-title--treatments-static"
            style={{ opacity: staticTitleOpacity }}
          >
            Our <span className="text-primary-green">Treatments</span>
          </motion.h2>
          <p className="journey-subtitle">
            From classical Ayurvedic psychotherapy to personalized herbal rasayanas, discover our specialized treatments designed for complete mind-body equilibrium.
          </p>

          <div className="journey-stream-badge">
            <span className="stream-pulse-dot" aria-hidden="true" />
            <span>Continuous Care Stream</span>
          </div>
        </div>

        {/* Treatments Live Stream Marquee */}
        <div className="journey-stream-viewport">
          <div className="journey-stream-track">
            {[
              ...TREATMENT_IMAGES,
              ...TREATMENT_IMAGES,
              ...TREATMENT_IMAGES,
              ...TREATMENT_IMAGES,
            ].map((item, index) => (
              <article
                key={`treatment-${item.id}-${index}`}
                className="journey-card journey-card--image-only"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="journey-card__img"
                  loading="lazy"
                  decoding="async"
                />
              </article>
            ))}
          </div>
        </div>

        {/* Visible Action Button: View Our Treatments */}
        <div className="journey-actions-bar">
          <Link to={ROUTES.SERVICES} className="journey-view-treatments-btn">
            <span>View Our Treatments</span>
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Section Divider */}
        <div className="journey-stream-divider" aria-hidden="true" />

        {/* ==================================================================
            2. OUR YOGA (Target dock for the traveling header)
            ================================================================== */}
        {/* ==================================================================
            2. OUR YOGA
            ================================================================== */}
        <div className="healing-journey-header text-center" id="yoga">
          <div className="section-pill">
            <Sparkles size={14} />
            <span>Mindful Disciplines</span>
          </div>

          {/* Reserved Title Dock Slot for the Traveling Heading */}
          <div className="journey-title-spacer" aria-hidden="true" />

          <p className="journey-subtitle">
            Cultivate somatic vitality, respiratory harmony, and inner peace through doctor-guided restorative asanas, classical pranayama, and mindful meditation.
          </p>

          <div className="journey-stream-badge">
            <span className="stream-pulse-dot" aria-hidden="true" />
            <span>Continuous Yoga Stream</span>
          </div>
        </div>

        {/* Yoga Live Stream Marquee (Flows from Left to Right) */}
        <div className="journey-stream-viewport">
          <div className="journey-stream-track journey-stream-track--reverse">
            {[
              ...YOGA_IMAGES,
              ...YOGA_IMAGES,
              ...YOGA_IMAGES,
              ...YOGA_IMAGES,
            ].map((item, index) => (
              <article
                key={`yoga-${item.id}-${index}`}
                className="journey-card journey-card--image-only"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="journey-card__img"
                  loading="lazy"
                  decoding="async"
                />
              </article>
            ))}
          </div>
        </div>

        {/* Visible Action Button: View Our Yoga */}
        <div className="journey-actions-bar">
          <Link to={ROUTES.YOGA} className="journey-view-treatments-btn">
            <span>View Our Yoga</span>
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* ==================================================================
            3. BOTTOM CTA BOX
            ================================================================== */}
        <div className="journey-cta-box">
          <div className="journey-cta-content">
            <h3>Begin Your Personal Healing Journey Today</h3>
            <p>Schedule your confidential consultation with our Ayurvedic medical specialists.</p>
          </div>
          <BookAppointmentButton
            label="Schedule Consultation Now"
            size="lg"
            variant="primary"
          />
        </div>
      </div>
    </section>
  );
});

HealingJourneySection.displayName = 'HealingJourneySection';
