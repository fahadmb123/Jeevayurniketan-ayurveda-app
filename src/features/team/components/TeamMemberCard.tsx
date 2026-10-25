import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles, Compass } from 'lucide-react';
import type { TeamMember } from '../types';
import { DrAhalyaModal } from './DrAhalyaModal';
import { DoctorBioModal } from './DoctorBioModal';
import { fadeUpVariants } from '@/shared/lib/animations';
import './TeamMemberCard.css';

export interface TeamMemberCardProps {
  member: TeamMember;
  index?: number;
}

interface DoctorStyleConfig {
  bgColor: string;
  category: string;
  icon: React.ReactNode;
}

const DOCTOR_STYLES: Record<string, DoctorStyleConfig> = {
  'dr-ahalya': {
    bgColor: '#124C38', // Deep Ayurvedic forest emerald
    category: 'CHIEF AYURVEDIC PHYSICIAN',
    icon: <Sparkles size={24} color="#FFFFFF" strokeWidth={2.2} />,
  },
  'devadarsan': {
    bgColor: '#1D3B53', // Deep indigo / oceanic slate
    category: 'YOGA & MEDITATION TEACHER',
    icon: <Compass size={24} color="#FFFFFF" strokeWidth={2.2} />,
  },
};

export const TeamMemberCard: React.FC<TeamMemberCardProps> = React.memo(({ member }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const styleConfig: DoctorStyleConfig = DOCTOR_STYLES[member.id] || {
    bgColor: '#1B6B50',
    category: 'AYURVEDIC PHYSICIAN',
    icon: <Sparkles size={20} color="#FFFFFF" strokeWidth={2.2} />,
  };

  return (
    <>
      <motion.article
        className="team-card"
        variants={fadeUpVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
        whileHover={{ y: -6 }}
        onClick={() => setIsModalOpen(true)}
        role="button"
        tabIndex={0}
        aria-label={`Explore profile of ${member.name}`}
      >
        {/* Top Hero Image Frame */}
        <div className="team-card__image-box">
          <img
            src={member.image}
            alt={member.name}
            className="team-card__img"
            loading="lazy"
            decoding="async"
          />
          <div className="team-card__image-overlay" />
          
          {/* Subtle qualifications floating tag */}
          <div className="team-card__floating-chip">
            <span>{member.qualifications}</span>
          </div>
        </div>

        {/* Bottom Editorial Meta Bar (Matches User's Reference Layout) */}
        <div className="team-card__meta-bar">
          {/* Left Circular Monogram / Emblem */}
          <div
            className="team-card__avatar-badge"
            style={{ backgroundColor: styleConfig.bgColor }}
            aria-hidden="true"
          >
            {styleConfig.icon}
          </div>

          {/* Center Name & Orange Category Text */}
          <div className="team-card__text-group">
            <h3 className="team-card__name">{member.name}</h3>
            <span className="team-card__category">{styleConfig.category}</span>
          </div>

          {/* Right Vibrant Orange Arrow Button */}
          <div className="team-card__action-btn" aria-hidden="true">
            <ArrowUpRight size={24} strokeWidth={2.6} />
          </div>
        </div>
      </motion.article>

      {/* Modal Dialog for Dr. Ahalya (Structured 10-Step Approach) or General Modal */}
      {member.id === 'dr-ahalya' ? (
        <DrAhalyaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      ) : (
        <DoctorBioModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} member={member} />
      )}
    </>
  );
});

TeamMemberCard.displayName = 'TeamMemberCard';
