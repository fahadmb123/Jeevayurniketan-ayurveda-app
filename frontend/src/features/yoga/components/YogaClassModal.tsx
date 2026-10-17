import React, { useState } from 'react';
import { X, Video, MapPin, Sparkles } from 'lucide-react';
import type {
  YogaSession,
  YogaFormData,
  DayOfWeek,
} from '../types/yoga.types';
import { DAYS_OF_WEEK, SUITABLE_FOR_OPTIONS } from '../types/yoga.types';
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

const computeSummaryTime = (items: { day: DayOfWeek; time: string }[]): string => {
  if (!items || items.length === 0) return '';
  const firstTime = items[0].time.trim();
  const allSame = items.every((i) => i.time.trim() === firstTime);
  if (allSame) {
    return firstTime;
  }
  const groups: Record<string, string[]> = {};
  items.forEach((item) => {
    const t = item.time.trim() || 'TBD';
    if (!groups[t]) groups[t] = [];
    groups[t].push(item.day.slice(0, 3));
  });
  return Object.entries(groups)
    .map(([time, days]) => `${days.join(', ')}: ${time}`)
    .join(' | ');
};

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
      const initialDays = initialData.days || ['Monday', 'Wednesday', 'Friday'];
      const defaultTime = initialData.time || '06:30 AM - 07:30 AM';
      const scheduleItems =
        initialData.scheduleItems && initialData.scheduleItems.length > 0
          ? initialData.scheduleItems
          : initialDays.map((d) => ({ day: d, time: defaultTime }));

      return {
        title: initialData.title || '',
        duration: initialData.duration || '60 mins',
        format: initialData.format || 'offline',
        suitableFor: initialData.suitableFor || SUITABLE_FOR_OPTIONS[0],
        days: initialDays,
        time: initialData.time || defaultTime,
        scheduleItems,
        description: initialData.description || '',
        price: initialData.price || '₹500 / session',
      };
    }

    const defaultDays: DayOfWeek[] = ['Monday', 'Wednesday', 'Friday'];
    const defaultSchedule = defaultDays.map((d) => ({
      day: d,
      time: '06:30 AM - 07:30 AM',
    }));

    return {
      title: '',
      duration: '60 mins',
      format: 'offline',
      suitableFor: SUITABLE_FOR_OPTIONS[0],
      days: defaultDays,
      time: '06:30 AM - 07:30 AM',
      scheduleItems: defaultSchedule,
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
        if (prev.days.length === 1) return prev; // At least one day must be selected
        const newDays = prev.days.filter((d) => d !== day);
        const newSchedule = (prev.scheduleItems || []).filter((item) => item.day !== day);
        return {
          ...prev,
          days: newDays,
          scheduleItems: newSchedule,
          time: computeSummaryTime(newSchedule),
        };
      } else {
        const newDays = [...prev.days, day];
        const defaultTime =
          prev.scheduleItems?.[0]?.time || prev.time || '06:30 AM - 07:30 AM';
        const newSchedule = [...(prev.scheduleItems || []), { day, time: defaultTime }];
        return {
          ...prev,
          days: newDays,
          scheduleItems: newSchedule,
          time: computeSummaryTime(newSchedule),
        };
      }
    });
  };

  const handleDayTimeChange = (day: DayOfWeek, newTime: string) => {
    setFormData((prev) => {
      const updatedSchedule = (prev.scheduleItems || []).map((item) =>
        item.day === day ? { ...item, time: newTime } : item
      );
      return {
        ...prev,
        scheduleItems: updatedSchedule,
        time: computeSummaryTime(updatedSchedule),
      };
    });
  };

  const handleApplyTimeToAll = (targetTime: string) => {
    setFormData((prev) => {
      const updatedSchedule = (prev.scheduleItems || []).map((item) => ({
        ...item,
        time: targetTime,
      }));
      return {
        ...prev,
        scheduleItems: updatedSchedule,
        time: targetTime,
      };
    });
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Class title is required.';
    if (!formData.duration.trim()) newErrors.duration = 'Duration is required.';
    if (!formData.suitableFor.trim()) newErrors.suitableFor = 'Please select who this is suitable for.';
    if (formData.days.length === 0) newErrors.days = 'Select at least one day.';
    if (!formData.scheduleItems || formData.scheduleItems.some((item) => !item.time.trim())) {
      newErrors.scheduleTimes = 'Please specify a time slot for each selected day.';
    }

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

        {/* Format (Offline / Online) */}
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
              <span>Offline (In Shala)</span>
            </button>
            <button
              type="button"
              className={`yoga-modal__format-btn ${
                formData.format === 'online' ? 'active' : ''
              }`}
              onClick={() => setFormData({ ...formData, format: 'online' })}
            >
              <Video size={16} />
              <span>Online (Live Stream)</span>
            </button>
          </div>
        </div>

        {/* Duration & Suitable For */}
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
            <label htmlFor="yoga-suitable">
              Suitable For <span className="required">*</span>
            </label>
            <select
              id="yoga-suitable"
              className="yoga-modal__select"
              value={formData.suitableFor}
              onChange={(e) =>
                setFormData({ ...formData, suitableFor: e.target.value })
              }
            >
              {SUITABLE_FOR_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {errors.suitableFor && (
              <span className="yoga-modal__error-hint">{errors.suitableFor}</span>
            )}
          </div>
        </div>

        {/* Schedule Days (Monday to Sunday) */}
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

        {/* Per-Day Time Slot Configuration */}
        <div className="yoga-modal__field">
          <div className="yoga-modal__day-times-box">
            <div className="yoga-modal__day-times-header">
              <span className="yoga-modal__day-times-title">
                Day-by-Day Time Slots ({formData.days.length}{' '}
                {formData.days.length === 1 ? 'day' : 'days'} selected)
              </span>
              {formData.scheduleItems && formData.scheduleItems.length > 1 && (
                <button
                  type="button"
                  className="yoga-modal__btn-apply-all"
                  onClick={() =>
                    handleApplyTimeToAll(
                      formData.scheduleItems?.[0]?.time || '06:30 AM - 07:30 AM'
                    )
                  }
                >
                  Apply {formData.scheduleItems[0].day.slice(0, 3)} time to all days
                </button>
              )}
            </div>

            {formData.scheduleItems?.map((item) => (
              <div key={item.day} className="yoga-modal__day-time-row">
                <span className="yoga-modal__day-label">{item.day}</span>
                <input
                  type="text"
                  list="yoga-time-presets"
                  className="yoga-modal__day-time-input"
                  placeholder="e.g. 06:30 AM - 07:30 AM"
                  value={item.time}
                  onChange={(e) => handleDayTimeChange(item.day, e.target.value)}
                />
              </div>
            ))}

            <datalist id="yoga-time-presets">
              <option value="06:00 AM - 07:00 AM" />
              <option value="06:30 AM - 07:30 AM" />
              <option value="07:00 AM - 08:00 AM" />
              <option value="07:30 AM - 08:30 AM" />
              <option value="08:00 AM - 09:00 AM" />
              <option value="08:30 AM - 09:30 AM" />
              <option value="10:00 AM - 11:00 AM" />
              <option value="04:30 PM - 05:30 PM" />
              <option value="05:00 PM - 06:00 PM" />
              <option value="05:30 PM - 06:30 PM" />
              <option value="06:00 PM - 07:00 PM" />
              <option value="06:30 PM - 07:30 PM" />
              <option value="07:30 PM - 08:30 PM" />
            </datalist>

            {errors.scheduleTimes && (
              <span className="yoga-modal__error-hint">{errors.scheduleTimes}</span>
            )}
          </div>
        </div>

        {/* Fee / Price */}
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
