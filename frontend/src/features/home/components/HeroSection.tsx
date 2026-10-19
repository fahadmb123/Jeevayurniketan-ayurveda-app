import React from 'react';
import heroFlatlayExact from '@/assets/hero_flatlay_exact.png';
import botanicalSketchExact from '@/assets/botanical_sketch_exact.png';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/config/routes';
import './HeroSection.css';

export const HeroSection: React.FC = React.memo(() => {
  return (
    <section id="home" className="hero-exact-section" aria-label="Ayuva Ayurvedic Sanctuary">
      <div className="hero-exact-layout">
        
        {/* Left Column: Ivory Background with Botanical Sketch & Editorial Text */}
        <div className="hero-exact-left">
          {/* Exact Botanical Pencil Lotus Illustration in bottom left */}
          <img
            src={botanicalSketchExact}
            alt=""
            className="hero-exact-botanical-art"
            aria-hidden="true"
          />

          <div className="hero-exact-content">
            {/* Exact Welcome Pill */}
            <div className="hero-exact-pill">
              <span>WELCOME TO AYUVA</span>
            </div>

            {/* Exact Serif Headline */}
            <h1 className="hero-exact-title">
              Natural wellness for<br />
              everyday balance
            </h1>

            {/* Exact Subtitle */}
            <p className="hero-exact-desc">
              Discover herbal products and mindful treatments designed to support a calmer, more balanced lifestyle.
            </p>

            {/* Exact Buttons Row */}
            <div className="hero-exact-actions">
              <Link to={ROUTES.SERVICES} className="hero-exact-btn-shop">
                <ShoppingBag size={16} className="btn-icon" />
                <span>SHOP PRODUCT</span>
              </Link>

              <a href="#about" className="hero-exact-btn-explore">
                <span>EXPLORE WELLNESS</span>
                <span className="btn-arrow">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Exact Flat-Lay Card */}
        <div className="hero-exact-right">
          <div className="hero-exact-card">
            <img
              src={heroFlatlayExact}
              alt="Ayurvedic herbal wellness flat lay: essential oils, dried lavender, rosebuds, and fresh mint on deep forest green linen"
              className="hero-exact-card-img"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>

      </div>

      {/* Exact Organic Wave Divider Transition into Category Circles */}
      <div className="hero-exact-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 85" fill="none" preserveAspectRatio="none" className="hero-wave-svg">
          <path
            d="M0,32 C260,65 520,70 780,38 C1040,6 1260,16 1440,32 L1440,85 L0,85 Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';
