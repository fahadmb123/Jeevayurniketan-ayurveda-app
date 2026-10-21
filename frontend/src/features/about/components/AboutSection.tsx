import React, { useEffect, useRef } from 'react';
import cupImg from '@/assets/cup.jpg';
import { Leaf, Brain, Sparkles, UserCheck, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LazyMotion, domAnimation, m, type Variants } from 'framer-motion';
import { ROUTES } from '@/shared/config/routes';
import './AboutSection.css';

interface PrincipleItem {
  id: string;
  title: string;
  description: string;
}

const PRINCIPLES: PrincipleItem[] = [
  {
    id: 'sourcing',
    title: 'Ingredients & Classical Sourcing',
    description:
      'Our medicinal herbs and formulations are sourced directly from Kerala valleys where plants thrive in chemical-free soil and pristine climatic conditions. Harvested according to seasonal biological rhythms (Ritu Charya) to ensure superior vital potency.',
  },
  {
    id: 'purity',
    title: 'Quality, Authenticity & Safety',
    description:
      'Every classical preparation undergoes multi-tier testing to ensure complete safety, botanical purity, and therapeutic efficacy. We verify natural identity, screen for heavy metals, and maintain rigorous clinical-grade preparation standards.',
  },
  {
    id: 'synergy',
    title: 'Synergy of Caraka Samhita & Psychotherapy',
    description:
      'We combine classical Ayurvedic internal medicine with Satvavajaya Chikitsa (mind-restraining psychotherapy) and guided Smriti Meditation—dissolving the deep emotional and trauma roots of psychosomatic illness without synthetic psychiatric dependency.',
  },
  {
    id: 'guidance',
    title: 'Masterfully Crafted Under Expert Guidance',
    description:
      'Pioneered by Dr. K.V. Dilipkumar with over 20 years of clinical heritage, bringing authentic Caraka Samhita principles and compassionate holistic healing to thousands of patients across India and 18+ countries.',
  },
];

interface QuickPill {
  id: string;
  label: string;
  sub: string;
  icon: React.ReactNode;
}

const QUICK_PILLS: QuickPill[] = [
  {
    id: 'herbs',
    label: 'Herbal Purity',
    sub: 'Classical Dravya',
    icon: <Leaf size={20} />,
  },
  {
    id: 'mind',
    label: 'Psychotherapy',
    sub: 'Satvavajaya',
    icon: <Brain size={20} />,
  },
  {
    id: 'meditation',
    label: 'Smriti Process',
    sub: 'Guided Recall',
    icon: <Sparkles size={20} />,
  },
  {
    id: 'vaidya',
    label: 'Doctor Consult',
    sub: 'Pulse Diagnosis',
    icon: <UserCheck size={20} />,
  },
  {
    id: 'heritage',
    label: '20+ Yrs Legacy',
    sub: 'Govt. Approved',
    icon: <ShieldCheck size={20} />,
  },
];

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease: 'easeOut', staggerChildren: 0.12 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

const contentVariants: Variants = {
  hidden: { opacity: 0, x: -28 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

const railVariants: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, delay: 0.14, ease: [0.16, 1, 0.3, 1] } },
};

const principleVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const AboutSection: React.FC = React.memo(() => {
  const cupRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ticking = false;
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      lastScrollY = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (cupRef.current) {
            cupRef.current.style.transform = `rotate(${lastScrollY * 0.85}deg)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <m.section
        id="about"
        className="ayurveda-pure-banner-section"
        aria-label="About Jeevayurniketan Heritage"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.16 }}
        variants={sectionVariants}
      >
        <div className="pure-banner-outer-wrap">
          <m.div className="pure-banner-card" variants={cardVariants}>
          <div className="pure-banner-bowl-anchor">
            <img 
              ref={cupRef}
              src={cupImg} 
              alt="Top-down view of fresh Ayurvedic medicinal Tulsi and Brahmi herbs in a porcelain bowl" 
              className="pure-banner-bowl-img"
              loading="lazy"
              decoding="async"
            />
          </div>

          <m.div className="pure-banner-content-col" variants={contentVariants}>
            <m.div className="pure-banner-principles-list" variants={sectionVariants}>
              {PRINCIPLES.map((item) => (
                <m.div key={item.id} className="pure-principle-block" variants={principleVariants}>
                  <h3 className="pure-principle-title">{item.title}</h3>
                  <p className="pure-principle-desc">{item.description}</p>
                </m.div>
              ))}
            </m.div>

            <div className="pure-banner-action-row">
              <Link to={ROUTES.ABOUT} className="pure-banner-cta-link">
                <span>Explore Our Full Clinical Heritage & Research</span>
                <ArrowRight size={17} />
              </Link>
            </div>
          </m.div>

          <m.div className="pure-banner-rail-col" variants={railVariants}>
            <div className="pure-banner-rail">
              {QUICK_PILLS.map((pill) => (
                <div key={pill.id} className="pure-rail-item" title={pill.sub}>
                  <div className="pure-rail-circle">
                    {pill.icon}
                  </div>
                  <span className="pure-rail-label">{pill.label}</span>
                </div>
              ))}
            </div>
          </m.div>

          </m.div>
        </div>
      </m.section>
    </LazyMotion>
  );
});

AboutSection.displayName = 'AboutSection';
