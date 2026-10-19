import React from 'react';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import type { Variants } from 'framer-motion';
import heroFlatlayExact from '@/assets/hero_flatlay_exact.png';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/config/routes';
import './HeroSection.css';

const textContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

const imageFadeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.85,
      delay: 0.2,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export const HeroSection: React.FC = React.memo(() => {
  return (
    <LazyMotion features={domAnimation}>
      <section id="home" className="hero-exact-section" aria-label="Ayuva Ayurvedic Sanctuary">
        <div className="hero-exact-layout">
          
          {/* Left Column: Ivory Background with Editorial Text */}
          <div className="hero-exact-left">
            <m.div
              className="hero-exact-content"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={textContainerVariants}
            >
              {/* Welcome Pill */}
              <m.div className="hero-exact-pill" variants={slideUpVariants}>
                <span>WELCOME TO AYUVA</span>
              </m.div>

              {/* Headline */}
              <m.h1 className="hero-exact-title" variants={slideUpVariants}>
                Natural wellness for<br />
                everyday balance
              </m.h1>

              {/* Subtitle */}
              <m.p className="hero-exact-desc" variants={slideUpVariants}>
                Discover herbal products and mindful treatments designed to support a calmer, more balanced lifestyle.
              </m.p>

              {/* Buttons Row */}
              <m.div className="hero-exact-actions" variants={slideUpVariants}>
                <Link to={ROUTES.SERVICES} className="hero-exact-btn-shop">
                  <ShoppingBag size={16} className="btn-icon" />
                  <span>SHOP PRODUCT</span>
                </Link>

                <a href="#about" className="hero-exact-btn-explore">
                  <span>EXPLORE WELLNESS</span>
                  <span className="btn-arrow">→</span>
                </a>
              </m.div>
            </m.div>
          </div>

          {/* Right Column: Flat-Lay Card with fade in */}
          <div className="hero-exact-right">
            <m.div
              className="hero-exact-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={imageFadeVariants}
            >
              <img
                src={heroFlatlayExact}
                alt="Ayurvedic herbal wellness flat lay: essential oils, dried lavender, rosebuds, and fresh mint on deep forest green linen"
                className="hero-exact-card-img"
                loading="eager"
                decoding="async"
              />
            </m.div>
          </div>

        </div>

        {/* Exact Organic Wave Divider Transition into Category Circles */}
        <div className="hero-exact-wave" aria-hidden="true">
          <svg viewBox="0 0 1440 85" fill="none" preserveAspectRatio="none" className="hero-wave-svg">
            <path
              d="M0,32 C260,65 520,70 780,38 C1040,6 1260,16 1440,32 L1440,85 L0,85 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </section>
    </LazyMotion>
  );
});

HeroSection.displayName = 'HeroSection';
