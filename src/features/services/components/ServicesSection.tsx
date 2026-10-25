import React from 'react';
import { motion } from 'framer-motion';
import { ServiceCard } from './ServiceCard';
import { useTreatments } from '../hooks/useTreatments';
import { staggerContainerVariants, fadeUpVariants, standardViewport } from '@/shared/lib/animations';
import './ServicesSection.css';

export const ServicesSection: React.FC = React.memo(() => {
  const { services } = useTreatments();

  return (
    <section id="services" className="services-section">
      <motion.div
        className="services-header text-center"
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={standardViewport}
      >
        <motion.h4 className="section-subtitle" variants={fadeUpVariants}>
          Healthcare Categories
        </motion.h4>
        <motion.h2 className="section-title" variants={fadeUpVariants}>
          Ayurvedic Clinical Services
        </motion.h2>
        <motion.p className="services-subtitle" variants={fadeUpVariants}>
          Individualized healthcare consultations, classical herbal formulations, and personalized lifestyle guidance across key medical domains.
        </motion.p>
      </motion.div>

      <motion.div
        className="services-grid"
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={standardViewport}
      >
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </motion.div>
    </section>
  );
});

ServicesSection.displayName = 'ServicesSection';
