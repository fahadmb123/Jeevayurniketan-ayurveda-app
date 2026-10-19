import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Activity, Image as ImageIcon, Maximize2, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGallery, type GalleryFilterTab } from '../hooks/useGallery';
import { GalleryLightboxModal } from '../components/GalleryLightboxModal';
import { ROUTES } from '@/shared/config/routes';
import './GalleryPage.css';

export const GalleryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<GalleryFilterTab>('all');
  const {
    items,
    yogaCount,
    treatmentCount,
    totalCount,
    activeLightboxItem,
    setActiveLightboxItem,
  } = useGallery(activeTab);

  const displayedItems = useMemo(() => {
    if (activeTab === 'all') return items;
    return items.filter((item) => item.category === activeTab);
  }, [items, activeTab]);

  return (
    <div className="gallery-page">
      {/* Hero Section */}
      <section className="gallery-page__hero">
        <div className="gallery-page__hero-content">
          <div className="gallery-page__hero-pill">
            <Sparkles size={14} />
            <span>Visual Journey</span>
          </div>
          <h1 className="gallery-page__hero-title">
            The Sanctuary in Focus
          </h1>
          <p className="gallery-page__hero-subtitle">
            Immerse yourself in authentic glimpses of daily Yoga sadhana, peaceful shalas, and age-old Ayurvedic Panchakarma therapies at Jeevayurniketan.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="gallery-page__container">
        {/* Category Tabs */}
        <div className="gallery-page__tabs-bar">
          <button
            type="button"
            className={`gallery-page__tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            <ImageIcon size={16} />
            <span>All Showcases</span>
            <span className="gallery-page__tab-count">{totalCount}</span>
          </button>

          <button
            type="button"
            className={`gallery-page__tab-btn gallery-page__tab-btn--yoga ${
              activeTab === 'yoga' ? 'active' : ''
            }`}
            onClick={() => setActiveTab('yoga')}
          >
            <Sparkles size={16} />
            <span>Yoga & Sadhana</span>
            <span className="gallery-page__tab-count">{yogaCount}</span>
          </button>

          <button
            type="button"
            className={`gallery-page__tab-btn gallery-page__tab-btn--treatment ${
              activeTab === 'treatment' ? 'active' : ''
            }`}
            onClick={() => setActiveTab('treatment')}
          >
            <Activity size={16} />
            <span>Ayurveda Treatments</span>
            <span className="gallery-page__tab-count">{treatmentCount}</span>
          </button>
        </div>

        {/* Gallery Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="gallery-page__grid"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            {displayedItems.map((item) => (
              <div
                key={item.id}
                className="gallery-item-card"
                onClick={() => setActiveLightboxItem(item)}
              >
                <div className="gallery-item-card__image-wrap">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="gallery-item-card__img"
                    loading="lazy"
                  />
                  <div className="gallery-item-card__badge-wrap">
                    <span
                      className={`gallery-item-card__badge gallery-item-card__badge--${item.category}`}
                    >
                      {item.category === 'yoga' ? 'Yoga' : 'Treatment'}
                    </span>
                  </div>
                  <div className="gallery-item-card__overlay">
                    <div className="gallery-item-card__zoom-btn">
                      <Maximize2 size={20} />
                    </div>
                  </div>
                </div>

                <div className="gallery-item-card__info">
                  <h3 className="gallery-item-card__title">{item.title}</h3>
                  {item.description && (
                    <p className="gallery-item-card__desc">{item.description}</p>
                  )}
                  <div className="gallery-item-card__footer">
                    <span className="gallery-item-card__date">
                      <Calendar size={13} />
                      {item.createdAt}
                    </span>
                    {item.author && (
                      <span className="gallery-item-card__author">{item.author}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA Section */}
        <section className="gallery-page__cta">
          <div className="gallery-page__cta-content">
            <h2 className="gallery-page__cta-title">
              Ready to Experience Personal Healing?
            </h2>
            <p className="gallery-page__cta-desc">
              Schedule a personalized consultation with our chief physicians or reserve your spot in our daily morning yoga sessions.
            </p>
            <div className="gallery-page__cta-actions">
              <Link to={ROUTES.CONTACT} className="gallery-page__cta-btn gallery-page__cta-btn--primary">
                <span>Book a Consultation</span>
                <ArrowRight size={16} />
              </Link>
              <Link to={ROUTES.YOGA} className="gallery-page__cta-btn gallery-page__cta-btn--secondary">
                <span>View Yoga Timetable</span>
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Lightbox Modal */}
      <GalleryLightboxModal
        item={activeLightboxItem}
        onClose={() => setActiveLightboxItem(null)}
        canManage={false}
      />
    </div>
  );
};
