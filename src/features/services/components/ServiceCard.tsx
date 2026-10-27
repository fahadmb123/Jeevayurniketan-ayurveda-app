import React, { useState, useEffect } from 'react';
import {
  Activity,
  Heart,
  ShieldCheck,
  Brain,
  Flame,
  Sparkles,
  Zap,
  Wind,
  HeartPulse,
  Compass,
  ArrowUpRight,
  Check,
} from 'lucide-react';
import type { AyurvedaService } from '../types';
import { ServiceDetailModal } from './ServiceDetailModal';
import './ServiceCard.css';

export interface ServiceCardProps {
  service: AyurvedaService;
  index?: number;
}

const SERVICE_THEMES: Record<
  string,
  {
    icon: React.ComponentType<{ size?: number; className?: string }>;
    tag: string;
    accentColor: string;
    avatarBg: string;
  }
> = {
  'metabolic-health': {
    icon: Activity,
    tag: 'Prameha & Agni',
    accentColor: '#1B6B50',
    avatarBg: '#1B6B50',
  },
  'womens-health': {
    icon: Heart,
    tag: 'Stree Roga',
    accentColor: '#E06D85',
    avatarBg: '#D84B68',
  },
  'musculoskeletal-care': {
    icon: ShieldCheck,
    tag: 'Sandhi Chikitsa',
    accentColor: '#2563EB',
    avatarBg: '#1D4ED8',
  },
  'mental-wellbeing': {
    icon: Brain,
    tag: 'Satvavajaya',
    accentColor: '#8B5CF6',
    avatarBg: '#7C3AED',
  },
  'digestive-health': {
    icon: Flame,
    tag: 'Jatharagni',
    accentColor: '#EA580C',
    avatarBg: '#C2410C',
  },
  'skin-hair-health': {
    icon: Sparkles,
    tag: 'Twak & Kesa',
    accentColor: '#C98D3B',
    avatarBg: '#B47A2B',
  },
  'neurological-health': {
    icon: Zap,
    tag: 'Vata & Majja',
    accentColor: '#0EA5E9',
    avatarBg: '#0284C7',
  },
  'respiratory-health': {
    icon: Wind,
    tag: 'Pranavaha Srotas',
    accentColor: '#06B6D4',
    avatarBg: '#0891B2',
  },
  'geriatric-health': {
    icon: HeartPulse,
    tag: 'Rasayana Chikitsa',
    accentColor: '#D97706',
    avatarBg: '#B45309',
  },
  'preventive-healthcare': {
    icon: Compass,
    tag: 'Swasthavritta',
    accentColor: '#059669',
    avatarBg: '#047857',
  },
};

export const ServiceCard: React.FC<ServiceCardProps> = React.memo(({ service, index = 0 }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoActive, setIsAutoActive] = useState(false);

  const theme = SERVICE_THEMES[service.id] || {
    icon: Sparkles,
    tag: service.categoryTag || 'Clinical Care',
    accentColor: '#1B6B50',
    avatarBg: '#1B6B50',
  };

  const IconComp = theme.icon;

  // Staggered automatic covering animation:
  // Each card smoothly cycles between Image and Information cover panel
  useEffect(() => {
    if (isHovered) return;

    // Stagger start by column so cards animate in an organic cascading wave
    const staggerDelay = (index % 3) * 1600;
    let intervalId: ReturnType<typeof setInterval>;

    const initialTimer = setTimeout(() => {
      setIsAutoActive(true);

      // Cycle every 4.6 seconds (4.6s info, 4.6s image)
      intervalId = setInterval(() => {
        setIsAutoActive((prev) => !prev);
      }, 4600);
    }, staggerDelay + 1400);

    return () => {
      clearTimeout(initialTimer);
      if (intervalId) clearInterval(intervalId);
    };
  }, [index, isHovered]);

  const isInfoVisible = isHovered || isAutoActive;

  return (
    <>
      <article
        className="treatment-hover-card"
        onClick={() => setIsModalOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
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
        {/* Tall Rounded Image Frame with Smooth Covering Information Panel */}
        <div className="treatment-hover-card__media">
          {service.image ? (
            <img
              src={service.image}
              alt={service.title}
              className="treatment-hover-card__img"
              loading="lazy"
            />
          ) : (
            <div className="treatment-hover-card__placeholder" />
          )}

          {/* Duration Badge */}
          {service.duration && (
            <span
              className={`treatment-hover-card__duration-badge ${
                isInfoVisible ? 'is-hidden' : ''
              }`}
            >
              {service.duration}
            </span>
          )}

          {/* Smooth Covering Panel (Auto-cycles and locks on hover) */}
          <div
            className={`treatment-cover-panel ${isInfoVisible ? 'is-active' : ''}`}
            aria-hidden={!isInfoVisible}
          >
            <div className="treatment-cover-panel__inner">
              <div className="treatment-cover-panel__top">
                <span
                  className="treatment-cover-panel__tag"
                  style={{ color: theme.accentColor }}
                >
                  {theme.tag}
                </span>

                <span className="treatment-cover-panel__pulse-badge">
                  <span className="treatment-cover-panel__pulse-dot" />
                  <span>OVERVIEW</span>
                </span>
              </div>

              <h3 className="treatment-cover-panel__title">
                {service.title}
              </h3>

              <p className="treatment-cover-panel__para">
                {service.description}
              </p>

              {service.benefits && service.benefits.length > 0 && (
                <div className="treatment-cover-panel__benefits">
                  <span className="treatment-cover-panel__benefits-title">
                    Clinical Focus:
                  </span>
                  <ul>
                    {service.benefits.slice(0, 3).map((benefit, i) => (
                      <li key={i}>
                        <Check
                          size={12}
                          className="treatment-cover-panel__check"
                        />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="treatment-cover-panel__footer">
                <span className="treatment-cover-panel__cta-text">
                  <span>Explore Full Protocol</span>
                  <ArrowUpRight size={14} />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Meta Row (Avatar + Title + Category + Orange Arrow Button) */}
        <div className="treatment-hover-card__bottom">
          <div className="treatment-hover-card__left">
            <div
              className="treatment-hover-card__avatar"
              style={{ backgroundColor: theme.avatarBg }}
            >
              <IconComp size={18} />
            </div>

            <div className="treatment-hover-card__text-group">
              <h4 className="treatment-hover-card__name">
                {service.title.toUpperCase()}
              </h4>
              <span className="treatment-hover-card__category">
                {(service.categoryTag || theme.tag).toUpperCase()}
              </span>
            </div>
          </div>

          <div className="treatment-hover-card__right-actions">
            {/* Status indicator pill (PHOTO / INFO) */}
            <span
              className={`treatment-state-pill ${
                isInfoVisible ? 'is-info' : 'is-img'
              }`}
            >
              {isInfoVisible ? 'INFO' : 'PHOTO'}
            </span>

            <button
              type="button"
              className="treatment-hover-card__action-btn"
              aria-label={`View clinical details for ${service.title}`}
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
            >
              <ArrowUpRight size={20} strokeWidth={2.4} />
            </button>
          </div>
        </div>
      </article>

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
