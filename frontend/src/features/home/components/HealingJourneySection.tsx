import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
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
            2. OUR YOGA
            ================================================================== */}
        <div className="healing-journey-header text-center" id="yoga">
          <div className="section-pill">
            <Sparkles size={14} />
            <span>Mindful Disciplines</span>
          </div>
          <h2 className="journey-title">
            Our <span className="text-primary-green">Yoga</span>
          </h2>
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
