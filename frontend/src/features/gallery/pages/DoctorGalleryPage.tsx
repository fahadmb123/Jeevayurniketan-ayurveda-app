import React, { useMemo } from 'react';
import { motion, type Variants } from 'framer-motion';
import {
  Image as ImageIcon,
  Sparkles,
  Activity,
  Plus,
  Trash2,
  Maximize2,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import { useGallery } from '../hooks/useGallery';
import { AddGalleryModal } from '../components/AddGalleryModal';
import { GalleryLightboxModal } from '../components/GalleryLightboxModal';
import {
  DoctorSearchFilterStrip,
  type FilterPillConfig,
} from '@/shared/ui/DoctorSearchFilterStrip';
import './DoctorGalleryPage.css';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

export const DoctorGalleryPage: React.FC = React.memo(() => {
  const {
    filteredItems,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    totalCount,
    yogaCount,
    treatmentCount,
    isModalOpen,
    setIsModalOpen,
    activeLightboxItem,
    setActiveLightboxItem,
    feedbackMessage,
    handleAddItem,
    handleDeleteItem,
    handleResetDefaults,
  } = useGallery();

  const filterPills = useMemo<FilterPillConfig[]>(
    () => [
      {
        id: 'all',
        label: 'All Images',
        count: totalCount,
        isActive: selectedCategory === 'all',
        onClick: () => setSelectedCategory('all'),
      },
      {
        id: 'yoga',
        label: 'Yoga Showcase',
        count: yogaCount,
        isActive: selectedCategory === 'yoga',
        onClick: () => setSelectedCategory('yoga'),
      },
      {
        id: 'treatment',
        label: 'Treatment Showcase',
        count: treatmentCount,
        isActive: selectedCategory === 'treatment',
        onClick: () => setSelectedCategory('treatment'),
      },
    ],
    [totalCount, yogaCount, treatmentCount, selectedCategory, setSelectedCategory]
  );

  return (
    <div className="doctor-gallery-page">
      {/* Page Header */}
      <div className="doctor-gallery-page__header">
        <div className="doctor-gallery-page__header-text">
          <div className="doctor-gallery-page__badge-tag">
            <ImageIcon size={14} />
            <span>Visual Showcases</span>
          </div>
          <h1 className="doctor-gallery-page__title">Gallery Management</h1>
          <p className="doctor-gallery-page__subtitle">
            Upload and manage photo galleries for Yoga practices and Ayurvedic clinical treatments.
          </p>
        </div>

        <div className="doctor-gallery-page__header-actions">
          <button
            type="button"
            className="doctor-gallery-page__reset-btn"
            onClick={handleResetDefaults}
            title="Reset gallery to default clinic imagery"
          >
            <RotateCcw size={16} />
            <span>Reset Defaults</span>
          </button>
          <button
            type="button"
            className="doctor-gallery-page__add-btn"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={18} />
            <span>Add Image</span>
          </button>
        </div>
      </div>

      {/* Feedback Toast */}
      {feedbackMessage && (
        <div className="doctor-gallery-page__feedback" role="alert">
          <CheckCircle2 size={16} />
          <span>{feedbackMessage}</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="doctor-gallery-page__metrics">
        <div className="doctor-gallery-metric-card doctor-gallery-metric-card--total">
          <div className="doctor-gallery-metric-card__content">
            <span className="doctor-gallery-metric-card__label">Total Photos</span>
            <span className="doctor-gallery-metric-card__value">{totalCount}</span>
            <span className="doctor-gallery-metric-card__subtext">Live in public gallery</span>
          </div>
          <div className="doctor-gallery-metric-card__icon-wrap">
            <ImageIcon size={22} />
          </div>
        </div>

        <div className="doctor-gallery-metric-card doctor-gallery-metric-card--yoga">
          <div className="doctor-gallery-metric-card__content">
            <span className="doctor-gallery-metric-card__label">Yoga Photos</span>
            <span className="doctor-gallery-metric-card__value">{yogaCount}</span>
            <span className="doctor-gallery-metric-card__subtext">Asanas & Shala sessions</span>
          </div>
          <div className="doctor-gallery-metric-card__icon-wrap">
            <Sparkles size={22} />
          </div>
        </div>

        <div className="doctor-gallery-metric-card doctor-gallery-metric-card--treatment">
          <div className="doctor-gallery-metric-card__content">
            <span className="doctor-gallery-metric-card__label">Treatment Photos</span>
            <span className="doctor-gallery-metric-card__value">{treatmentCount}</span>
            <span className="doctor-gallery-metric-card__subtext">Clinical therapies & herbs</span>
          </div>
          <div className="doctor-gallery-metric-card__icon-wrap">
            <Activity size={22} />
          </div>
        </div>
      </div>

      {/* Search & Filter Strip */}
      <DoctorSearchFilterStrip
        searchPlaceholder="Search images by title, author, or description..."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        pills={filterPills}
        onReset={
          searchQuery || selectedCategory !== 'all'
            ? () => {
                setSearchQuery('');
                setSelectedCategory('all');
              }
            : undefined
        }
        resetTitle="Reset filters"
      />

      {/* Image Grid */}
      {filteredItems.length > 0 ? (
        <motion.div
          className="doctor-gallery-page__grid"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              className="doctor-gallery-card"
              variants={itemVariants}
            >
              <div
                className="doctor-gallery-card__image-container"
                onClick={() => setActiveLightboxItem(item)}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="doctor-gallery-card__img"
                  loading="lazy"
                />

                {/* Category Pill Tag */}
                <div className="doctor-gallery-card__badges">
                  <span
                    className={`doctor-gallery-card__category-badge doctor-gallery-card__category-badge--${item.category}`}
                  >
                    {item.category === 'yoga' ? (
                      <>
                        <Sparkles size={12} />
                        <span>Yoga</span>
                      </>
                    ) : (
                      <>
                        <Activity size={12} />
                        <span>Treatment</span>
                      </>
                    )}
                  </span>
                </div>

                {/* Hover Action Overlay */}
                <div className="doctor-gallery-card__hover-overlay">
                  <div className="doctor-gallery-card__zoom-action">
                    <Maximize2 size={18} />
                    <span>View Photo</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Content */}
              <div className="doctor-gallery-card__info">
                <div className="doctor-gallery-card__title-row">
                  <h3
                    className="doctor-gallery-card__title"
                    title={item.title}
                    onClick={() => setActiveLightboxItem(item)}
                  >
                    {item.title}
                  </h3>
                  <button
                    type="button"
                    className="doctor-gallery-card__delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteItem(item.id, item.title);
                    }}
                    title="Remove image"
                    aria-label={`Remove image ${item.title}`}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                {item.description && (
                  <p className="doctor-gallery-card__description" title={item.description}>
                    {item.description}
                  </p>
                )}

                <div className="doctor-gallery-card__footer-meta">
                  <span className="doctor-gallery-card__date">{item.createdAt}</span>
                  {item.author && (
                    <span className="doctor-gallery-card__author">{item.author}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="doctor-gallery-page__empty">
          <div className="doctor-gallery-page__empty-icon-wrap">
            <ImageIcon size={38} />
          </div>
          <h3 className="doctor-gallery-page__empty-title">No images found</h3>
          <p className="doctor-gallery-page__empty-desc">
            {searchQuery
              ? `No images match your search "${searchQuery}".`
              : selectedCategory !== 'all'
              ? `No images in the ${selectedCategory === 'yoga' ? 'Yoga' : 'Treatment'} showcase yet.`
              : 'Your clinic showcase gallery is currently empty.'}
          </p>
          <div className="doctor-gallery-page__empty-actions">
            {searchQuery && (
              <button
                type="button"
                className="doctor-gallery-page__empty-clear-btn"
                onClick={() => setSearchQuery('')}
              >
                Clear Search
              </button>
            )}
            <button
              type="button"
              className="doctor-gallery-page__empty-add-btn"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus size={16} />
              <span>
                Add to {selectedCategory === 'treatment' ? 'Treatment' : 'Yoga'}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Add Modal */}
      <AddGalleryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddItem}
        defaultCategory={selectedCategory === 'treatment' ? 'treatment' : 'yoga'}
      />

      {/* Lightbox Modal */}
      <GalleryLightboxModal
        item={activeLightboxItem}
        onClose={() => setActiveLightboxItem(null)}
        onDelete={handleDeleteItem}
        canManage={true}
      />
    </div>
  );
});

DoctorGalleryPage.displayName = 'DoctorGalleryPage';
