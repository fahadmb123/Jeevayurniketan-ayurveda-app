import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/widgets/navbar';
import { ServicesSection } from '@/widgets/services-section';
import { Footer } from '@/widgets/footer';
import { BookAppointmentButton } from '@/features/book-appointment';
import { Card } from '@/shared/ui/card';
import './ServicesPage.css';

const FAQ_ITEMS = [
  {
    q: 'What is Smriti Meditation?',
    a: 'Smriti meditation is an interactive Ayurvedic psychotherapeutic procedure where the patient is guided into deep relaxation to re-experience and resolve repressed emotional traumas that manifest as physical and psychological illnesses.'
  },
  {
    q: 'How many sessions are typically required?',
    a: 'Most clinical programs consist of 3 to 7 structured sessions depending on the nature and chronicity of the condition, complemented with follow-up lifestyle and diet protocols.'
  },
  {
    q: 'Can online consultations be conducted for remote patients?',
    a: 'Yes, we provide specialized video telemedicine consultations and remote guided counseling sessions for patients across India and internationally.'
  }
];

export const ServicesPage: React.FC = () => {
  return (
    <div className="services-page">
      <Navbar />

      <header className="page-hero">
        <div className="page-hero__container">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="page-hero__badge"
          >
            Clinical Programs
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="page-hero__title"
          >
            Therapeutic Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="page-hero__desc"
          >
            Evidence-based Ayurvedic psychotherapy and personalized holistic healthcare programs designed for psychosomatic recovery.
          </motion.p>
        </div>
      </header>

      <ServicesSection />

      <section className="faq-section">
        <div className="faq-container">
          <div className="text-center">
            <h4 className="section-subtitle">Frequently Asked Questions</h4>
            <h2 className="section-title">Common Inquiries</h2>
          </div>

          <div className="faq-list">
            {FAQ_ITEMS.map((item, i) => (
              <Card key={i} className="faq-card">
                <h3 className="faq-card__question">{item.q}</h3>
                <p className="faq-card__answer">{item.a}</p>
              </Card>
            ))}
          </div>

          <div className="services-cta text-center">
            <h3>Need a personalized treatment plan?</h3>
            <p>Our specialists will evaluate your prakriti (constitution) and health profile.</p>
            <BookAppointmentButton size="lg" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
