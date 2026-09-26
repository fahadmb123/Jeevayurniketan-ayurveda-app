import React from 'react';
import './ServicesSection.css';

export const ServicesSection: React.FC = () => {
  const services = [
    {
      title: 'Psychotherapy',
      description: 'Expert counseling tailored to resolve deep-seated psychological conflicts and bring mental clarity.',
      icon: '🧠'
    },
    {
      title: 'Smriti Meditation',
      description: 'A guided interactive therapeutic meditation used to identify the root cause of psychosomatic illness.',
      icon: '🧘'
    },
    {
      title: 'Stress Management',
      description: 'Comprehensive programs combining ancient wisdom and modern techniques to relieve stress.',
      icon: '🌿'
    },
    {
      title: 'Ayurveda Healing',
      description: 'Personalized treatments based on traditional Ayurvedic principles for full body wellness.',
      icon: '💊'
    }
  ];

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
          <div 
            className="service-card animate-fade-in" 
            key={index}
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-desc">{service.description}</p>
            <button className="service-btn">Learn More &rarr;</button>
          </div>
        ))}
      </div>
    </section>
  );
};
