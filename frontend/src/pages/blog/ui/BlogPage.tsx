import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/widgets/navbar';
import { BlogSection } from '@/widgets/blog-section';
import { Footer } from '@/widgets/footer';
import './BlogPage.css';

export const BlogPage: React.FC = () => {
  return (
    <div className="blog-page">
      <Navbar />

      <header className="page-hero">
        <div className="page-hero__container">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="page-hero__badge"
          >
            Research & Articles
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="page-hero__title"
          >
            Ayurveda & Mind Insights
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="page-hero__desc"
          >
            Clinical observations, deep dives into Charaka Samhita psychological insights, and scientific paradigms of Smriti Meditation.
          </motion.p>
        </div>
      </header>

      <BlogSection />

      <Footer />
    </div>
  );
};
