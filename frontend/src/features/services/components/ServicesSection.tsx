import React from 'react';
import { ServiceCard } from './ServiceCard';
import { useTreatments } from '../hooks/useTreatments';
import './ServicesSection.css';

export const ServicesSection: React.FC = React.memo(() => {
  const { services } = useTreatments();

  return (
    <section id="services" className="services-section">
      <div className="services-header text-center">
        <h4 className="section-subtitle">Our Services</h4>
        <h2 className="section-title">Healing Through Ancient Wisdom</h2>
        <p className="services-subtitle">
          We offer specialized programs to restore harmony to your mind, body, and soul.
        </p>
      </div>

      <div className="services-grid">
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>
    </section>
  );
});

ServicesSection.displayName = 'ServicesSection';
