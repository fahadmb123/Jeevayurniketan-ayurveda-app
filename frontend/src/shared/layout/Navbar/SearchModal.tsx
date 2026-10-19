import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Sparkles, Brain, Leaf, HeartPulse } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/config/routes';

interface SearchItem {
  title: string;
  category: string;
  description: string;
  link: string;
  icon: React.ReactNode;
}

const SEARCH_DATABASE: SearchItem[] = [
  {
    title: 'Smriti Meditation (Subconscious Recall)',
    category: 'Yoga & Meditation',
    description: 'Pioneered by Dr. K.V. Dilipkumar for deep trauma and anxiety resolution.',
    link: '#about',
    icon: <Sparkles size={16} className="text-amber-500" />,
  },
  {
    title: 'Ayurvedic Psychotherapy (Satvavajaya Chikitsa)',
    category: 'Healing',
    description: 'Classical mind-body alignment without synthetic tranquilizers.',
    link: '#about',
    icon: <Brain size={16} className="text-emerald-600" />,
  },
  {
    title: 'Panchakarma Detox & Shirodhara',
    category: 'Spa & Wellness',
    description: 'Purifying bio-cleansing therapies and warm herbal oil therapy.',
    link: '#services',
    icon: <Leaf size={16} className="text-teal-600" />,
  },
  {
    title: 'Physiotherapy & Musculoskeletal Rejuvenation',
    category: 'Physiotherapy',
    description: 'Integrative physical rehabilitation with medicinal Kizhi & Kati Vasti.',
    link: '#services',
    icon: <HeartPulse size={16} className="text-rose-500" />,
  },
  {
    title: 'Consult Clinical Doctors',
    category: 'Doctor Portal',
    description: 'One-on-one personalized pulse diagnosis & confidential consultation.',
    link: ROUTES.DOCTOR,
    icon: <Brain size={16} className="text-emerald-700" />,
  },
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = React.memo(({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    } else {
      setQuery('');
    }
  }, [isOpen, onClose]);

  const filtered = query.trim() === ''
    ? SEARCH_DATABASE
    : SEARCH_DATABASE.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );

  const handleSelect = (link: string) => {
    onClose();
    if (link.startsWith('#')) {
      const el = document.querySelector(link);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(link);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="search-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="search-modal-card"
            initial={{ opacity: 0, y: -24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ type: 'spring', damping: 26, stiffness: 340 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="search-modal-header">
              <Search size={20} className="search-modal-icon" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search therapies, treatments, doctors, wellness..."
                className="search-modal-input"
              />
              <button
                type="button"
                onClick={onClose}
                className="search-modal-close"
                aria-label="Close search"
              >
                <X size={20} />
              </button>
            </div>

            <div className="search-modal-results">
              <span className="search-modal-kicker">
                {query.trim() === '' ? 'Popular Ayurvedic Therapies' : `${filtered.length} Results Found`}
              </span>
              {filtered.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  className="search-result-item"
                  onClick={() => handleSelect(item.link)}
                >
                  <div className="search-result-icon">{item.icon}</div>
                  <div className="search-result-text">
                    <span className="search-result-title">{item.title}</span>
                    <span className="search-result-desc">{item.description}</span>
                  </div>
                  <span className="search-result-badge">{item.category}</span>
                  <ArrowRight size={16} className="search-result-arrow" />
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="search-no-results">
                  <p>No matching therapies found for "{query}".</p>
                  <span>Try searching for "Meditation", "Panchakarma", or "Doctor".</span>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

SearchModal.displayName = 'SearchModal';
