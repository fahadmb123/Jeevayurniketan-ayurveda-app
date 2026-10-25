import React from 'react';
import { motion } from 'framer-motion';
import { Navbar, Footer } from '@/shared/layout';
import { TeamSection } from '../components/TeamSection';
import { DrAhalyaSpotlightSection } from '../components/DrAhalyaSpotlightSection';
import { Card } from '@/shared/ui/card';
import './TeamPage.css';

export const TeamPage: React.FC = React.memo(() => {
  return (
    <div className="team-page">
      <Navbar />

      <header className="page-hero">
        <div className="page-hero__container">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="page-hero__badge"
          >
            Clinical Leadership
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="page-hero__title"
          >
            Our Practitioners & Teachers
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="page-hero__desc"
          >
            Led by Dr. Ahalya T.S. (Ayurveda &amp; Wellness Consultant) and Devadarsan T.S. (Yoga &amp; Meditation Teacher), integrating classical Ayurveda, constitutional care, and mindful disciplines.
          </motion.p>
        </div>
      </header>

      <TeamSection hideHeader={true} />

      <DrAhalyaSpotlightSection />

      <section className="advisory-section">
        <div className="advisory-container">
          <div className="text-center">
            <h4 className="section-subtitle">Clinical Excellence</h4>
            <h2 className="section-title">Standards & Ethics</h2>
          </div>

          <div className="advisory-grid">
            <Card className="advisory-card">
              <h3>Authentic Lineage</h3>
              <p>Rooted in the renowned classical traditions of Kerala Ayurveda, backed by time-tested Samhita methodology.</p>
            </Card>

            <Card className="advisory-card">
              <h3>Certified Practitioners</h3>
              <p>All consultations and sessions are conducted by qualified Ayurvedic physicians and certified yoga instructors.</p>
            </Card>

            <Card className="advisory-card">
              <h3>Strict Confidentiality</h3>
              <p>Patient case histories, psychological assessments, and clinical consultation records are kept strictly confidential.</p>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
});

TeamPage.displayName = 'TeamPage';

