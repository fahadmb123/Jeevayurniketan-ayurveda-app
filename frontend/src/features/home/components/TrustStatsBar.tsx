import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, HeartHandshake, ShieldCheck } from 'lucide-react';
import './TrustStatsBar.css';

interface StatItem {
  icon: React.ReactNode;
  value: string;
  label: string;
  sublabel: string;
}

const STATS: StatItem[] = [
  {
    icon: <Award size={26} className="trust-stat__icon" />,
    value: '20+ Years',
    label: 'Clinical Heritage',
    sublabel: 'Pioneers in Ayurvedic Psychotherapy',
  },
  {
    icon: <Users size={26} className="trust-stat__icon" />,
    value: '15,000+',
    label: 'Healed Patients',
    sublabel: 'Across India & 18+ Countries',
  },
  {
    icon: <HeartHandshake size={26} className="trust-stat__icon" />,
    value: '98.4%',
    label: 'Relief Rate',
    sublabel: 'In stress, anxiety & psychosomatic cases',
  },
  {
    icon: <ShieldCheck size={26} className="trust-stat__icon" />,
    value: '100% Natural',
    label: 'Classical Protocols',
    sublabel: 'Zero synthetic dependence or side effects',
  },
];

export const TrustStatsBar: React.FC = React.memo(() => {
  return (
    <section className="trust-stats-section" aria-label="Key statistics and trust indicators">
      <div className="trust-stats-container">
        {STATS.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="trust-stat-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="trust-stat-card__icon-wrap">
              {stat.icon}
            </div>
            <div className="trust-stat-card__content">
              <span className="trust-stat-card__value">{stat.value}</span>
              <h3 className="trust-stat-card__label">{stat.label}</h3>
              <p className="trust-stat-card__sublabel">{stat.sublabel}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
});

TrustStatsBar.displayName = 'TrustStatsBar';
