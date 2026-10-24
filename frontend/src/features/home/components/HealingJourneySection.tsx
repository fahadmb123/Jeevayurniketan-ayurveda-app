import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
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
  const yogaHeaderRef = useRef<HTMLDivElement>(null);
  const isYogaInView = useInView(yogaHeaderRef, {
    amount: 0.3,
    once: false,
  });

  // Controls the morph from 'Treatments' -> 'Yoga'
  const [isYogaActive, setIsYogaActive] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isYogaInView) {
      // Arrives initially showing 'Our Treatments', then smoothly transforms to 'Our Yoga'
      timer = setTimeout(() => {
        setIsYogaActive(true);
      }, 420);
    } else {
      // Reset when scrolled out of view so scrolling down replays the smooth transition
      setIsYogaActive(false);
    }
    return () => clearTimeout(timer);
  }, [isYogaInView]);

  return (
    <section className="healing-journey-section" id="treatments" aria-label="Our Treatments and Yoga">
      <div className="healing-journey-container">
        {/* ==================================================================
            1. OUR TREATMENTS
            ================================================================== */}
        <div className="healing-journey-header text-center">
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
            2. OUR YOGA (Smoothly descends from Treatments & morphs title to Yoga)
            ================================================================== */}
        <motion.div
          ref={yogaHeaderRef}
          initial={{ opacity: 0, y: -48 }}
          animate={
            isYogaInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0.15, y: -48 }
          }
          transition={{
            duration: 0.75,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="healing-journey-header text-center"
          id="yoga"
        >
          {/* Morphing Pill */}
          <div className="section-pill">
            <AnimatePresence mode="wait" initial={false}>
              {isYogaActive ? (
                <motion.span
                  key="yoga-pill"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="journey-pill-inner"
                >
                  <Sparkles size={14} />
                  <span>Mindful Disciplines</span>
                </motion.span>
              ) : (
                <motion.span
                  key="treatments-pill"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="journey-pill-inner"
                >
                  <Compass size={14} />
                  <span>Therapeutic Modalities</span>
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Morphing Title: "Our Treatments" -> smoothly transitions to "Our Yoga" */}
          <h2 className="journey-title journey-title--morph">
            <span>Our </span>
            <span className="journey-morph-wrap">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isYogaActive ? 'yoga-word' : 'treatments-word'}
                  initial={{ y: 32, opacity: 0, filter: 'blur(5px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: -32, opacity: 0, filter: 'blur(5px)' }}
                  transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
                  className="text-primary-green journey-morph-word"
                >
                  {isYogaActive ? 'Yoga' : 'Treatments'}
                </motion.span>
              </AnimatePresence>
            </span>
          </h2>

          {/* Morphing Subtitle */}
          <div className="journey-subtitle-wrap">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={isYogaActive ? 'yoga-sub' : 'treatments-sub'}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="journey-subtitle"
              >
                {isYogaActive
                  ? 'Cultivate somatic vitality, respiratory harmony, and inner peace through doctor-guided restorative asanas, classical pranayama, and mindful meditation.'
                  : 'From classical Ayurvedic psychotherapy to personalized herbal rasayanas, discover our specialized treatments designed for complete mind-body equilibrium.'}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Morphing Stream Badge */}
          <div className="journey-stream-badge">
            <span className="stream-pulse-dot" aria-hidden="true" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isYogaActive ? 'yoga-badge' : 'treatments-badge'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isYogaActive ? 'Continuous Yoga Stream' : 'Continuous Care Stream'}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

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
