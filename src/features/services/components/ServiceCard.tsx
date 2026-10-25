import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/config/routes';
import type { AyurvedaService } from '../types';
import { fadeUpVariants } from '@/shared/lib/animations';
import './ServiceCard.css';

export interface ServiceCardProps {
  service: AyurvedaService;
}

export const ServiceCard: React.FC<ServiceCardProps> = React.memo(({ service }) => {
  return (
    <motion.div
      className="service-card"
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <div className="service-card__icon">{service.icon}</div>
      <h3 className="service-card__title">{service.title}</h3>
      <p className="service-card__desc">{service.description}</p>
      <Link to={ROUTES.SERVICES} className="service-card__btn">
        Learn More &rarr;
      </Link>
    </motion.div>
  );
});

ServiceCard.displayName = 'ServiceCard';
