import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Award, HeartHandshake, ShieldCheck, Sparkles, Stethoscope } from 'lucide-react';
import { staggerContainerVariants, fadeUpVariants, standardViewport } from '@/shared/lib/animations';
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
    value: 'Classical',
    label: 'Clinical Heritage',
    sublabel: 'Tridosha, Agni & Prakriti diagnosis',
  },
  {
    icon: <Stethoscope size={26} className="trust-stat__icon" />,
    value: 'Individual',
    label: 'Personalized Care',
    sublabel: 'Tailored diet, herbs & daily routine',
  },
  {
    icon: <HeartHandshake size={26} className="trust-stat__icon" />,
    value: 'Integrative',
    label: 'Relief Rate',
    sublabel: 'Mind-body balance & breath regulation',
  },
  {
    icon: <ShieldCheck size={26} className="trust-stat__icon" />,
    value: 'Authentic',
    label: 'Classical Protocols',
    sublabel: 'Grounded in classical Samhita protocols',
  },
];

export const TrustStatsBar: React.FC = React.memo(() => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track scroll progress specifically through this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Spring configuration for silky smooth momentum synced with Lenis
  const springConfig = { stiffness: 90, damping: 22, mass: 0.25 };

  // Scroll-linked horizontal translation: moves smoothly to the left and docks at 0px (left-aligned)
  const rawTitleX = useTransform(
    scrollYProgress,
    [0, 0.42, 0.78, 1],
    [isMobile ? 60 : 180, 0, 0, isMobile ? -20 : -45]
  );
  const titleX = useSpring(rawTitleX, springConfig);

  const rawBadgeX = useTransform(
    scrollYProgress,
    [0, 0.42, 0.78, 1],
    [isMobile ? 35 : 90, 0, 0, isMobile ? -10 : -20]
  );
  const badgeX = useSpring(rawBadgeX, springConfig);

  const rawDescX = useTransform(
    scrollYProgress,
    [0, 0.42, 0.78, 1],
    [isMobile ? 45 : 130, 0, 0, isMobile ? -15 : -30]
  );
  const descX = useSpring(rawDescX, springConfig);

  // Smooth opacity fade-in as it scrolls in from the bottom
  const headerOpacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.85, 1],
    [0.25, 1, 1, 0.65]
  );

  return (
    <section ref={sectionRef} className="health-wellness-section" aria-label="Clinical Foundation and Holistic Health">
      {/* Intro Heading with smooth scroll-driven leftward movement */}
      <div className="health-wellness-header-wrap">
        <motion.div
          className="health-wellness-badge"
          style={{ x: badgeX, opacity: headerOpacity }}
        >
          <Sparkles size={14} className="text-leaf-green" />
          <span>Sacred Mind-Body Harmony</span>
        </motion.div>

        <motion.h2
          className="health-wellness-title"
          style={{ x: titleX, opacity: headerOpacity }}
        >
          Health and fitness
        </motion.h2>

        <motion.p
          className="health-wellness-desc"
          style={{ x: descX, opacity: headerOpacity }}
        >
          Balancing the tripartite bio-energies (Vata, Pitta, Kapha), resolving subconscious emotional knots, 
          and revitalizing bodily strength with classical herbal formulations and Smriti meditation.
        </motion.p>
      </div>

      {/* Trust Stats Cards Grid */}
      <motion.div
        className="trust-stats-container"
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={standardViewport}
      >
        {STATS.map((stat) => (
          <motion.div
            key={stat.label}
            className="trust-stat-card"
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
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
      </motion.div>
    </section>
  );
});

TrustStatsBar.displayName = 'TrustStatsBar';
