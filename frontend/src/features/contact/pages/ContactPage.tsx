import React from 'react';
import { motion } from 'framer-motion';
import { Navbar, Footer } from '@/shared/layout';
import { ContactInfo } from '../components/ContactInfo';
import { ContactForm } from '../components/ContactForm';
import './ContactPage.css';

export const ContactPage: React.FC = React.memo(() => {
  return (
    <div className="contact-page">
      <Navbar />

      <header className="page-hero">
        <div className="page-hero__container">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="page-hero__badge"
          >
            Get In Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="page-hero__title"
          >
            Contact & Location
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="page-hero__desc"
          >
            Visit our physical clinic in Kottakkal or connect directly with our patient care support team.
          </motion.p>
        </div>
      </header>

      <section className="contact-content">
        <div className="contact-container">
          <div className="contact-grid">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
});

ContactPage.displayName = 'ContactPage';

