import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowUpRight, Check, Sparkles } from 'lucide-react';
import type { AyurvedaService } from '../types';
import { fadeUpVariants } from '@/shared/lib/animations';
import { ServiceDetailModal } from './ServiceDetailModal';
import './ServiceCard.css';

export interface ServiceCardProps {
  service: AyurvedaService;
  index?: number;
}

const SERVICE_THEMES: Record<
  string,
  {
    tag: string;
    accentColor: string;
  }
> = {
  'metabolic-health': {
    tag: 'PRAMEHA & AGNI',
    accentColor: '#1B6B50',
  },
  'womens-health': {
    tag: 'STREE ROGA',
    accentColor: '#E06D85',
  },
  'musculoskeletal-care': {
    tag: 'SANDHI CHIKITSA',
    accentColor: '#2563EB',
  },
  'mental-wellbeing': {
    tag: 'SATVAVAJAYA',
    accentColor: '#8B5CF6',
  },
  'digestive-health': {
    tag: 'JATHARAGNI',
    accentColor: '#EA580C',
  },
  'skin-hair-health': {
    tag: 'TWAK & KESA',
    accentColor: '#C98D3B',
  },
  'neurological-health': {
    tag: 'VATA & MAJJA',
    accentColor: '#0EA5E9',
  },
  'respiratory-health': {
    tag: 'PRANAWAHA SROTAS',
    accentColor: '#06B6D4',
  },
  'geriatric-health': {
    tag: 'RASAYANA CHIKITSA',
    accentColor: '#D97706',
  },
  'preventive-healthcare': {
    tag: 'SWASTHAVRITTA',
    accentColor: '#059669',
  },
};

export const ServiceCard: React.FC<ServiceCardProps> = React.memo(({ service, index = 0 }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const theme = SERVICE_THEMES[service.id] || {
    tag: (service.categoryTag || 'Clinical Care').toUpperCase(),
    accentColor: '#1B6B50',
  };

  const formattedIndex = String(index + 1).padStart(2, '0');

  return (
    <>
      <motion.article
        className="treatment-clean-card"
        variants={fadeUpVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        onClick={() => setIsModalOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsModalOpen(true);
          }
        }}
        aria-label={`View clinical details for ${service.title}`}
      >
        {/* Top Header Row: Index Capsule + Category Tag */}
        <div className="treatment-clean-card__header">
          <span className="treatment-clean-card__index-pill">
            {formattedIndex}
          </span>
          <span className="treatment-clean-card__tag">
            {theme.tag}
          </span>
        </div>

        {/* Serif Treatment Title */}
        <h3 className="treatment-clean-card__title">
          {service.title}
        </h3>

        {/* Clinical Description Paragraph */}
        <p className="treatment-clean-card__desc">
          {service.description}
        </p>

        {/* Benefits Checklist */}
        {service.benefits && service.benefits.length > 0 && (
          <ul className="treatment-clean-card__benefits">
            {service.benefits.slice(0, 2).map((benefit, i) => (
              <li key={i}>
                <Check size={14} className="treatment-clean-card__check" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Bottom Footer: Explore Protocol Link + Duration */}
        <div className="treatment-clean-card__footer">
          <span className="treatment-clean-card__cta">
            <span>Explore Protocol</span>
            <ArrowUpRight size={14} />
          </span>

          {service.duration && (
            <span className="treatment-clean-card__duration">
              <Clock size={13} className="treatment-clean-card__clock" />
              <span>{service.duration}</span>
            </span>
          )}
        </div>
      </motion.article>

      {/* Detail Modal */}
      <ServiceDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={service}
        iconComponent={Sparkles}
        themeTag={theme.tag}
        accentColor={theme.accentColor}
      />
    </>
  );
});

ServiceCard.displayName = 'ServiceCard';
