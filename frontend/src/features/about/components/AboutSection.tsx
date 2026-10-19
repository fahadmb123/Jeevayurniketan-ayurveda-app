import React from 'react';
import herbsBowlImg from '@/assets/ayurvedic_herbs_bowl.png';
import { Leaf, Brain, Sparkles, UserCheck, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
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

export const AboutSection: React.FC = React.memo(() => {
  return (
    <section id="about" className="ayurveda-pure-banner-section" aria-label="About Jeevayurniketan Heritage">
      <div className="pure-banner-outer-wrap">
        
        {/* Main Banner Block */}
        <div className="pure-banner-card">
          
          {/* Overlapping Top-Down Herbal Bowl (Pure Graphic Design) */}
          <div className="pure-banner-bowl-anchor">
            <img 
              src={herbsBowlImg} 
              alt="Top-down view of fresh Ayurvedic medicinal Tulsi and Brahmi herbs in a porcelain bowl" 
              className="pure-banner-bowl-img"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Left Column: 4 Editorial Principles */}
          <div className="pure-banner-content-col">
            <div className="pure-banner-principles-list">
              {PRINCIPLES.map((item) => (
                <div key={item.id} className="pure-principle-block">
                  <h3 className="pure-principle-title">{item.title}</h3>
                  <p className="pure-principle-desc">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="pure-banner-action-row">
              <Link to={ROUTES.ABOUT} className="pure-banner-cta-link">
                <span>Explore Our Full Clinical Heritage & Research</span>
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>

          {/* Right Column: Circular Feature Navigation Pills */}
          <div className="pure-banner-rail-col">
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
          </div>

        </div>
      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';
