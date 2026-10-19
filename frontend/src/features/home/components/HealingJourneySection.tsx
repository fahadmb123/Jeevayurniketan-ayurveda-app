import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, Sparkles, HeartHandshake, Compass, ArrowRight } from 'lucide-react';
import { BookAppointmentButton } from '@/features/appointments';
import './HealingJourneySection.css';

interface JourneyStep {
  step: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  highlight: string;
}

const STEPS: JourneyStep[] = [
  {
    step: '01',
    icon: <ClipboardCheck size={28} />,
    title: 'In-Depth Consultation & Prakriti Analysis',
    subtitle: 'Roga & Rogi Pariksha',
    description: 'Our senior doctors conduct a thorough holistic analysis of your physical doshas (Vata, Pitta, Kapha) and mental constitution (Manasika Gunas) to pinpoint the exact root cause.',
    highlight: 'Online & In-Clinic Available',
  },
  {
    step: '02',
    icon: <Compass size={28} />,
    title: 'Personalized Herbal & Lifestyle Protocol',
    subtitle: 'Yukti & Pathya Ahara',
    description: 'We formulate customized classical herbal remedies, Medhya Rasayanas, and a restorative diet plan that calms the nervous system and repairs cellular vitality.',
    highlight: 'Zero Synthetic Chemicals',
  },
  {
    step: '03',
    icon: <Sparkles size={28} />,
    title: 'Guided Smriti Meditation & Emotional Release',
    subtitle: 'Satvavajaya Chikitsa',
    description: 'Experience doctor-guided subconscious recall therapy to unburden emotional traumas, dissolve repressed psychological stress, and eliminate psychosomatic symptoms.',
    highlight: 'Pioneered by Dr. Dilipkumar',
  },
  {
    step: '04',
    icon: <HeartHandshake size={28} />,
    title: 'Sustained Wellness & Preventive Vitality',
    subtitle: 'Rasayana & Dinacharya',
    description: 'Receive personalized daily routines, preventive yoga practices, and regular doctor follow-ups to maintain total mind-body equilibrium for life.',
    highlight: 'Lifelong Health Empowerment',
  },
];

export const HealingJourneySection: React.FC = React.memo(() => {
  return (
    <section className="healing-journey-section" id="journey">
      <div className="healing-journey-container">
        <div className="healing-journey-header text-center">
          <div className="section-pill">
            <Compass size={14} />
            <span>The Healing Path</span>
          </div>
          <h2 className="journey-title">
            Your 4-Step Journey to <span className="text-primary-green">Lasting Wellbeing</span>
          </h2>
          <p className="journey-subtitle">
            From the first consultation to lasting mental and physical vitality, our structured Ayurvedic psychotherapy methodology guides you with gentle expertise.
          </p>
        </div>

        <div className="healing-journey-grid">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.step}
              className="journey-card"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
            >
              <div className="journey-card__header">
                <span className="journey-card__step-num">{step.step}</span>
                <div className="journey-card__icon-box">
                  {step.icon}
                </div>
              </div>
              <div className="journey-card__body">
                <span className="journey-card__sub">{step.subtitle}</span>
                <h3 className="journey-card__title">{step.title}</h3>
                <p className="journey-card__desc">{step.description}</p>
              </div>
              <div className="journey-card__footer">
                <span className="journey-card__badge">{step.highlight}</span>
              </div>
              {index < STEPS.length - 1 && (
                <div className="journey-card__connector" aria-hidden="true">
                  <ArrowRight size={18} />
                </div>
              )}
            </motion.div>
          ))}
        </div>

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
