import React, { useState } from 'react';
import { X, Video, MapPin, Globe, Sparkles } from 'lucide-react';
import type {
  YogaSession,
  YogaFormData,
  YogaLevel,
  DayOfWeek,
} from '../types/yoga.types';
import { DAYS_OF_WEEK } from '../types/yoga.types';
import './YogaClassModal.css';

interface YogaClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: YogaFormData) => Promise<void>;
  initialData?: YogaSession | null;
}

const DURATION_PRESETS = [
  '45 mins',
  '60 mins',
  '75 mins',
  '90 mins',
  '120 mins',
];

const LEVEL_OPTIONS: YogaLevel[] = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'All Levels',
];

interface FormContentProps {
  initialData?: YogaSession | null;
  onClose: () => void;
  onSave: (data: YogaFormData) => Promise<void>;
}

const YogaClassFormContent: React.FC<FormContentProps> = ({
  initialData,
  onClose,
  onSave,
}) => {
  const isEditing = Boolean(initialData);

  const [formData, setFormData] = useState<YogaFormData>(() => {
    if (initialData) {
      return {
        title: initialData.title || '',
        duration: initialData.duration || '60 mins',
        format: initialData.format || 'offline',
        suitableFor: initialData.suitableFor || '',
        ageGroup: initialData.ageGroup || 'All Ages',
        days: initialData.days || ['Monday', 'Wednesday', 'Friday'],
        time: initialData.time || '06:30 AM - 07:30 AM',
        level: initialData.level || 'Beginner',
        description: initialData.description || '',
        price: initialData.price || '₹500 / session',
      };
    }
    return {
      title: '',
      duration: '60 mins',
      format: 'offline',
      suitableFor: 'Beginners & Stress Relief',
      ageGroup: 'All Ages',
      days: ['Monday', 'Wednesday', 'Friday'],
      time: '06:30 AM - 07:30 AM',
      level: 'Beginner',
      description: '',
      price: '₹500 / session',
    };
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDayToggle = (day: DayOfWeek) => {
    setFormData((prev) => {
      const exists = prev.days.includes(day);
      if (exists) {
        if (prev.days.length === 1) return prev;
        return { ...prev, days: prev.days.filter((d) => d !== day) };
      } else {
        return { ...prev, days: [...prev.days, day] };
      }
    });
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Class title is required.';
    if (!formData.duration.trim()) newErrors.duration = 'Duration is required.';
    if (!formData.suitableFor.trim()) newErrors.suitableFor = 'Target suitability is required.';
    if (!formData.time.trim()) newErrors.time = 'Time slot is required.';
    if (formData.days.length === 0) newErrors.days = 'Select at least one day.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      await onSave(formData);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="yoga-modal" role="dialog" aria-modal="true">
      <div className="yoga-modal__header">
        <div className="yoga-modal__title-group">
          <h3>{isEditing ? 'Edit Yoga Class Schedule' : 'Add New Yoga Class'}</h3>
          <p>Configure Asana, Pranayama & Meditation clinical programs</p>
        </div>
        <button
          type="button"
          className="yoga-modal__close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="yoga-modal__form">
        {/* Class Title */}
        <div className="yoga-modal__field">
          <label htmlFor="yoga-title">
            Yoga Class Name <span className="required">*</span>
          </label>
          <input
            id="yoga-title"
            type="text"
            className="yoga-modal__input"
            placeholder="e.g. Hatha Yoga & Pranayama"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          {errors.title && <span className="yoga-modal__error-hint">{errors.title}</span>}
        </div>

        {/* Format (Online / Offline / Hybrid) */}
        <div className="yoga-modal__field">
          <label>
            Format <span className="required">*</span>
          </label>
          <div className="yoga-modal__format-group">
            <button
              type="button"
              className={`yoga-modal__format-btn ${
                formData.format === 'offline' ? 'active' : ''
              }`}
              onClick={() => setFormData({ ...formData, format: 'offline' })}
            >
              <MapPin size={16} />
              <span>In Shala (Offline)</span>
            </button>
            <button
              type="button"
              className={`yoga-modal__format-btn ${
                formData.format === 'online' ? 'active' : ''
              }`}
              onClick={() => setFormData({ ...formData, format: 'online' })}
            >
              <Video size={16} />
              <span>Live Stream (Online)</span>
            </button>
            <button
              type="button"
              className={`yoga-modal__format-btn ${
                formData.format === 'hybrid' ? 'active' : ''
              }`}
              onClick={() => setFormData({ ...formData, format: 'hybrid' })}
            >
              <Globe size={16} />
              <span>Hybrid (Both)</span>
            </button>
          </div>
        </div>

        {/* Duration & Difficulty Level */}
        <div className="yoga-modal__grid-2">
          <div className="yoga-modal__field">
            <label htmlFor="yoga-duration">
              Duration <span className="required">*</span>
            </label>
            <input
              id="yoga-duration"
              type="text"
              list="duration-list"
              className="yoga-modal__input"
              placeholder="e.g. 60 mins"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            />
            <datalist id="duration-list">
              {DURATION_PRESETS.map((p) => (
                <option key={p} value={p} />
              ))}
            </datalist>
            {errors.duration && (
              <span className="yoga-modal__error-hint">{errors.duration}</span>
            )}
          </div>

          <div className="yoga-modal__field">
            <label htmlFor="yoga-level">Difficulty / Practice Level</label>
            <select
              id="yoga-level"
              className="yoga-modal__select"
              value={formData.level}
              onChange={(e) =>
                setFormData({ ...formData, level: e.target.value as YogaLevel })
              }
            >
              {LEVEL_OPTIONS.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Suitable For & Age Group */}
        <div className="yoga-modal__grid-2">
          <div className="yoga-modal__field">
            <label htmlFor="yoga-suitable">
              Suitable For <span className="required">*</span>
            </label>
            <input
              id="yoga-suitable"
              type="text"
              className="yoga-modal__input"
              placeholder="e.g. Beginners, Stress Relief, Spine & Joint Care"
              value={formData.suitableFor}
              onChange={(e) => setFormData({ ...formData, suitableFor: e.target.value })}
            />
            {errors.suitableFor && (
              <span className="yoga-modal__error-hint">{errors.suitableFor}</span>
            )}
          </div>

          <div className="yoga-modal__field">
            <label htmlFor="yoga-age">Age / Target Audience Group</label>
            <input
              id="yoga-age"
              type="text"
              className="yoga-modal__input"
              placeholder="e.g. All Ages, Adults (18+), Seniors (50+)"
              value={formData.ageGroup}
              onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
            />
          </div>
        </div>

        {/* Schedule (Monday to Sunday) */}
        <div className="yoga-modal__field">
          <label>
            Schedule Days (Monday to Sunday) <span className="required">*</span>
          </label>
          <div className="yoga-modal__days-wrapper">
            {DAYS_OF_WEEK.map((day) => {
              const isSelected = formData.days.includes(day);
              return (
                <button
                  key={day}
                  type="button"
                  className={`yoga-modal__day-toggle ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleDayToggle(day)}
                >
                  {day.slice(0, 3)}
                </button>
              );
            })}
          </div>
          {errors.days && <span className="yoga-modal__error-hint">{errors.days}</span>}
        </div>

        {/* Time Slot & Fee / Price */}
        <div className="yoga-modal__grid-2">
          <div className="yoga-modal__field">
            <label htmlFor="yoga-time">
              Time Slot <span className="required">*</span>
            </label>
            <input
              id="yoga-time"
              type="text"
              className="yoga-modal__input"
              placeholder="e.g. 06:30 AM - 07:30 AM"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            />
            {errors.time && <span className="yoga-modal__error-hint">{errors.time}</span>}
          </div>

          <div className="yoga-modal__field">
            <label htmlFor="yoga-price">Fee / Price</label>
            <input
              id="yoga-price"
              type="text"
              className="yoga-modal__input"
              placeholder="e.g. ₹500 / session or Free"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
          </div>
        </div>

        {/* Description & Health Benefits */}
        <div className="yoga-modal__field">
          <label htmlFor="yoga-desc">Description & Health Benefits</label>
          <textarea
            id="yoga-desc"
            rows={3}
            className="yoga-modal__textarea"
            placeholder="Describe postures, breathing techniques, and therapeutic benefits..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div className="yoga-modal__footer">
          <button
            type="button"
            className="yoga-modal__btn-cancel"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="yoga-modal__btn-submit"
            disabled={isSubmitting}
          >
            <Sparkles size={16} />
            <span>
              {isSubmitting
                ? 'Saving...'
                : isEditing
                ? 'Update Yoga Class'
                : 'Add Yoga Class'}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export const YogaClassModal: React.FC<YogaClassModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="yoga-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <YogaClassFormContent
        key={initialData?.id || 'new'}
        initialData={initialData}
        onClose={onClose}
        onSave={onSave}
      />
    </div>
  );
};
