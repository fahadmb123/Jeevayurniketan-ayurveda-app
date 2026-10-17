import React from 'react';
import { motion } from 'framer-motion';
import type { AyurvedaService } from '../types';
import './ServiceCard.css';

export interface ServiceCardProps {
  service: AyurvedaService;
  index: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  return (
    <motion.div
      className="service-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="service-card__icon">{service.icon}</div>
      <h3 className="service-card__title">{service.title}</h3>
      <p className="service-card__desc">{service.description}</p>
      <button className="service-card__btn">Learn More &rarr;</button>
    </motion.div>
  );
};
