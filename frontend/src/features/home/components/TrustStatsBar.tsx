import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, HeartHandshake, ShieldCheck, Sparkles } from 'lucide-react';
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
    <section className="health-wellness-section" aria-label="Health and Wellness Foundation">
      {/* Intro Heading matching the reference screenshot */}
      <div className="health-wellness-header-wrap">
        <motion.div
          className="health-wellness-badge"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Sparkles size={14} className="text-leaf-green" />
          <span>Sacred Mind-Body Harmony</span>
        </motion.div>

        <motion.h2
          className="health-wellness-title"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Health and fitness
        </motion.h2>

        <motion.p
          className="health-wellness-desc"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.18 }}
        >
          Balancing the tripartite bio-energies (Vata, Pitta, Kapha), resolving subconscious emotional knots, 
          and revitalizing bodily strength with classical herbal formulations and Smriti meditation.
        </motion.p>
      </div>

      {/* Trust Stats Cards Grid */}
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
