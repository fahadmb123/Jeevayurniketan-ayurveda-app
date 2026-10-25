import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Heart,
  ShieldCheck,
  Brain,
  Flame,
  Sparkles,
  Zap,
  Sprout,
  Wind,
  Leaf,
  Droplet,
  HeartPulse,
  Compass,
  ArrowUpRight,
  Check,
  Clock,
} from 'lucide-react';
import type { AyurvedaService } from '../types';
import { fadeUpVariants } from '@/shared/lib/animations';
import { ServiceDetailModal } from './ServiceDetailModal';
import './ServiceCard.css';

export interface ServiceCardProps {
  service: AyurvedaService;
}

const SERVICE_THEMES: Record<
  string,
  {
    icon: React.ComponentType<{ size?: number; className?: string }>;
    tag: string;
    accentColor: string;
  }
> = {
  'metabolic-health': {
    icon: Activity,
    tag: 'Prameha & Agni',
    accentColor: '#1B6B50',
  },
  'womens-health': {
    icon: Heart,
    tag: 'Stree Roga',
    accentColor: '#E06D85',
  },
  'musculoskeletal-care': {
    icon: ShieldCheck,
    tag: 'Sandhi Chikitsa',
    accentColor: '#3B82F6',
  },
  'mental-wellbeing': {
    icon: Brain,
    tag: 'Satvavajaya',
    accentColor: '#8B5CF6',
  },
  'digestive-health': {
    icon: Flame,
    tag: 'Jatharagni',
    accentColor: '#EA580C',
  },
  'skin-hair-health': {
    icon: Sparkles,
    tag: 'Twak & Kesa',
    accentColor: '#C98D3B',
  },
  'neurological-health': {
    icon: Zap,
    tag: 'Vata & Majja',
    accentColor: '#0EA5E9',
  },
  'pediatric-health': {
    icon: Sprout,
    tag: 'Kaumarbhritya',
    accentColor: '#10B981',
  },
  'respiratory-health': {
    icon: Wind,
    tag: 'Pranavaha Srotas',
    accentColor: '#06B6D4',
  },
  'liver-health': {
    icon: Leaf,
    tag: 'Yakrit Shodhana',
    accentColor: '#16A34A',
  },
  'renal-urinary-care': {
    icon: Droplet,
    tag: 'Mutravaha Srotas',
    accentColor: '#2563EB',
  },
  'geriatric-health': {
    icon: HeartPulse,
    tag: 'Rasayana Chikitsa',
    accentColor: '#D97706',
  },
  'preventive-healthcare': {
    icon: Compass,
    tag: 'Swasthavritta',
    accentColor: '#059669',
  },
};

export const ServiceCard: React.FC<ServiceCardProps> = React.memo(({ service }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const theme = SERVICE_THEMES[service.id] || {
    icon: Sparkles,
    tag: 'Clinical Ayurveda',
    accentColor: '#1B6B50',
  };

  const IconComp = theme.icon;

  // Split title if it has parenthetical Ayurvedic term e.g. "Digestive Health (Agni)"
  const titleMatch = service.title.match(/^(.+?)\s*\((.+?)\)$/);
  const mainTitle = titleMatch ? titleMatch[1] : service.title;
  const ayurvedicTerm = titleMatch ? titleMatch[2] : null;

  return (
    <>
      <motion.article
        className="service-card"
        variants={fadeUpVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        whileHover={{ y: -6 }}
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
        {/* Top Meta Header: Vector Icon Pod + Duration/Scope Pill */}
        <div className="service-card__header">
          <div
            className="service-card__icon-pod"
            style={{
              borderColor: `${theme.accentColor}40`,
              background: `linear-gradient(135deg, ${theme.accentColor}20, ${theme.accentColor}08)`,
              color: theme.accentColor,
            }}
          >
            <IconComp size={24} />
          </div>

          <div className="service-card__badge-wrap">
            <span className="service-card__duration-pill">
              <Clock size={11} className="service-card__clock-icon" />
              <span>{service.duration || 'Personalized Care'}</span>
            </span>
          </div>
        </div>

        {/* Clinical Domain / Ayurvedic Sanskrit Sub-label */}
        <div className="service-card__meta-tag">
          <span className="service-card__tag-text">{theme.tag}</span>
          {ayurvedicTerm && (
            <span className="service-card__term-badge">{ayurvedicTerm}</span>
          )}
        </div>

        {/* Main Title */}
        <h3 className="service-card__title">{mainTitle}</h3>

        {/* Clinical Summary */}
        <p className="service-card__desc">{service.description}</p>

        {/* Therapeutic Key Focus Chips */}
        {service.benefits && service.benefits.length > 0 && (
          <div className="service-card__benefits">
            {service.benefits.slice(0, 2).map((benefit, i) => (
              <span key={i} className="service-card__benefit-chip">
                <Check size={11} className="service-card__benefit-check" />
                <span>{benefit}</span>
              </span>
            ))}
          </div>
        )}

        {/* Modern Interactive Action Footer */}
        <div className="service-card__footer">
          <span className="service-card__cta-text">
            <span>Explore Care Details</span>
          </span>
          <div className="service-card__action-btn" aria-hidden="true">
            <ArrowUpRight size={18} strokeWidth={2.4} />
          </div>
        </div>
      </motion.article>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={service}
        iconComponent={IconComp}
        themeTag={theme.tag}
        accentColor={theme.accentColor}
      />
    </>
  );
});

ServiceCard.displayName = 'ServiceCard';
