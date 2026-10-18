import React from 'react';
import { motion } from 'framer-motion';
import { Navbar, Footer } from '@/shared/layout';
import { ServicesSection } from '../components/ServicesSection';
import { BookAppointmentButton } from '@/features/appointments';
import { Card } from '@/shared/ui/card';
import { useTreatments } from '../hooks/useTreatments';
import './ServicesPage.css';

export const ServicesPage: React.FC = React.memo(() => {
  const { faqs } = useTreatments();

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
            {faqs.map((item, i) => (
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
});

ServicesPage.displayName = 'ServicesPage';

