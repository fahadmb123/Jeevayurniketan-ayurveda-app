import React from 'react';
import { motion } from 'framer-motion';
import { Navbar, Footer } from '@/shared/layout';
import { TeamSection } from '../components/TeamSection';
import { Card } from '@/shared/ui/card';
import './TeamPage.css';

export const TeamPage: React.FC = () => {
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
            Our Physicians & Counselors
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="page-hero__desc"
          >
            Led by pioneers in Ayurvedic psychotherapy with decades of clinical experience in psychiatric care, counseling, and integrative medicine.
          </motion.p>
        </div>
      </header>

      <TeamSection />

      <section className="advisory-section">
        <div className="advisory-container">
          <div className="text-center">
            <h4 className="section-subtitle">Clinical Excellence</h4>
            <h2 className="section-title">Standards & Ethics</h2>
          </div>

          <div className="advisory-grid">
            <Card className="advisory-card">
              <h3>Authentic Lineage</h3>
              <p>Rooted in the renowned classical traditions of Kottakkal, Kerala, backed by evidence-informed research.</p>
            </Card>

            <Card className="advisory-card">
              <h3>Certified Practitioners</h3>
              <p>All sessions are supervised by qualified MD (Ayurveda) doctors, yoga therapists, and licensed counselors.</p>
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
};
