import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const treatmentsHeaderRef = useRef<HTMLDivElement>(null);
  const yogaHeaderRef = useRef<HTMLDivElement>(null);

  type Phase = 'inactive' | 'treatments-initial' | 'fixed-left' | 'yoga-center';
  const [phase, setPhase] = useState<Phase>('treatments-initial');
  const [yogaSlotTop, setYogaSlotTop] = useState(96);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      if (!sectionRef.current || !treatmentsHeaderRef.current || !yogaHeaderRef.current) return;

      const sectionRect = sectionRef.current.getBoundingClientRect();
      const treatmentsRect = treatmentsHeaderRef.current.getBoundingClientRect();
      const yogaRect = yogaHeaderRef.current.getBoundingClientRect();

      const NAVBAR_HEIGHT = 80;

      // 1. If outside the Healing Journey section, hide traveling header
      if (sectionRect.top > window.innerHeight || sectionRect.bottom < NAVBAR_HEIGHT + 60) {
        setPhase('inactive');
        return;
      }

      // 2. If Treatments heading hasn't reached navbar, show static heading
      if (treatmentsRect.top > NAVBAR_HEIGHT) {
        setPhase('treatments-initial');
        return;
      }

      // 3. When Yoga section reaches view (~260px threshold), move to center
      if (yogaRect.top <= 260) {
        setPhase('yoga-center');
        setYogaSlotTop(Math.max(96, yogaRect.top + 36));
      } else {
        // 4. Otherwise, stay fixed on the left displaying "Our Treatments"
        setPhase('fixed-left');
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const isYogaMode = phase === 'yoga-center';
  const isTravelingActive = phase === 'fixed-left' || phase === 'yoga-center';

  return (
    <section
      ref={sectionRef}
      className="healing-journey-section"
      id="treatments"
      aria-label="Our Treatments and Yoga"
    >
      {/* ==================================================================
          TRAVELING HEADING:
          Smoothly glides from Treatments Center -> Fixed Left -> Yoga Center
          ================================================================== */}
      <motion.div
        className={`journey-traveling-header ${
          phase === 'fixed-left'
            ? 'journey-traveling-header--fixed-left'
            : phase === 'yoga-center'
            ? 'journey-traveling-header--yoga-center'
            : 'journey-traveling-header--hidden'
        }`}
        style={{
          top: phase === 'yoga-center' ? yogaSlotTop : 92,
        }}
        initial={false}
        animate={{
          x: phase === 'yoga-center' ? 'calc(50vw - 50% - var(--fixed-left, 48px))' : 0,
          opacity: isTravelingActive ? 1 : 0,
          pointerEvents: isTravelingActive ? 'auto' : 'none',
        }}
        transition={{
          duration: 0.65,
          ease: [0.16, 1, 0.3, 1],
        }}
        aria-hidden={!isTravelingActive}
      >
        {/* Eyebrow Tag */}
        <div className="journey-traveling-eyebrow">
          <AnimatePresence mode="wait" initial={false}>
            {isYogaMode ? (
              <motion.span
                key="yoga-tag"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.28 }}
                className="journey-traveling-tag-inner"
              >
                <Sparkles size={13} />
                <span>Mindful Disciplines</span>
              </motion.span>
            ) : (
              <motion.span
                key="treatments-tag"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.28 }}
                className="journey-traveling-tag-inner"
              >
                <Compass size={13} />
                <span>Therapeutic Modalities</span>
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Morphing Traveling Title */}
        <h2 className="journey-traveling-title">
          <span>Our </span>
          <span className="journey-morph-wrap">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isYogaMode ? 'yoga' : 'treatments'}
                initial={{ y: 22, opacity: 0, filter: 'blur(4px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                exit={{ y: -22, opacity: 0, filter: 'blur(4px)' }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="text-primary-green journey-morph-word"
              >
                {isYogaMode ? 'Yoga' : 'Treatments'}
              </motion.span>
            </AnimatePresence>
          </span>
        </h2>
      </motion.div>

      <div className="healing-journey-container">
        {/* ==================================================================
            1. OUR TREATMENTS (Initial Static Header)
            ================================================================== */}
        <div
          ref={treatmentsHeaderRef}
          className={`healing-journey-header text-center ${
            phase !== 'treatments-initial' && phase !== 'inactive'
              ? 'healing-journey-header--covered'
              : ''
          }`}
        >
          <div className="section-pill">
            <Compass size={14} />
            <span>Therapeutic Modalities</span>
          </div>
          <h2 className="journey-title">
            Our <span className="text-primary-green">Treatments</span>
          </h2>
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
        <div
          ref={yogaHeaderRef}
          className={`healing-journey-header text-center healing-journey-header--yoga-target ${
            isYogaMode ? 'healing-journey-header--yoga-active' : ''
          }`}
          id="yoga"
        >
          {/* Section Pill (revealed when Yoga section arrives) */}
          <div className="section-pill journey-yoga-fade">
            <Sparkles size={14} />
            <span>Mindful Disciplines</span>
          </div>

          {/* Reserved Title Dock Slot for the Traveling Heading */}
          <div className="journey-yoga-title-slot" aria-hidden="true" />

          {/* Subtitle (revealed when Yoga section arrives) */}
          <p className="journey-subtitle journey-yoga-fade">
            Cultivate somatic vitality, respiratory harmony, and inner peace through doctor-guided restorative asanas, classical pranayama, and mindful meditation.
          </p>

          {/* Continuous Yoga Stream Live Pill */}
          <div className="journey-stream-badge journey-yoga-fade">
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
