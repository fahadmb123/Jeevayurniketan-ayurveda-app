import React from 'react';
import { Droplets, Sparkles, Brain, Flower2, HeartHandshake, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/config/routes';
import './CategoryCirclesRail.css';

interface CategoryItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  link: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'oils',
    title: 'Medicinal Oils',
    subtitle: 'Taila & Thailam',
    icon: <Droplets size={34} strokeWidth={1.6} />,
    link: ROUTES.SERVICES,
  },
  {
    id: 'dravya',
    title: 'Classical Herbs',
    subtitle: 'Organic Formulations',
    icon: <Flower2 size={34} strokeWidth={1.6} />,
    link: ROUTES.SERVICES,
  },
  {
    id: 'mind',
    title: 'Satvavajaya',
    subtitle: 'Ayurvedic Psychotherapy',
    icon: <Brain size={34} strokeWidth={1.6} />,
    link: ROUTES.ABOUT,
  },
  {
    id: 'panchakarma',
    title: 'Panchakarma',
    subtitle: 'Deep Cellular Detox',
    icon: <Sparkles size={34} strokeWidth={1.6} />,
    link: ROUTES.SERVICES,
  },
  {
    id: 'smriti',
    title: 'Smriti Dhyana',
    subtitle: 'Trauma & Recall Healing',
    icon: <HeartHandshake size={34} strokeWidth={1.6} />,
    link: ROUTES.ABOUT,
  },
  {
    id: 'doctor',
    title: 'Doctor Portal',
    subtitle: 'Vaidya Pulse Diagnosis',
    icon: <Stethoscope size={34} strokeWidth={1.6} />,
    link: ROUTES.DOCTOR,
  },
];

export const CategoryCirclesRail: React.FC = React.memo(() => {
  return (
    <section className="category-circles-section" aria-label="Explore Ayurvedic Categories">
      <div className="category-circles-container">
        <div className="category-circles-grid">
          {CATEGORIES.map((cat) => (
            <Link key={cat.id} to={cat.link} className="category-circle-card">
              <div className="category-circle-disc">
                <div className="category-circle-icon">{cat.icon}</div>
              </div>
              <span className="category-circle-title">{cat.title}</span>
              <span className="category-circle-sub">{cat.subtitle}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
});

CategoryCirclesRail.displayName = 'CategoryCirclesRail';
