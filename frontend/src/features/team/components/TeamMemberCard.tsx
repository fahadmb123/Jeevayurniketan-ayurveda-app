import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import type { TeamMember } from '../types';
import { DrAhalyaModal } from './DrAhalyaModal';
import './TeamMemberCard.css';

export interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
}

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -380,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.35,
      ease: [0.22, 1, 0.36, 1],
      opacity: {
        duration: 1.25,
        ease: 'easeOut',
      },
    },
  },
};

export const TeamMemberCard: React.FC<TeamMemberCardProps> = React.memo(({ member }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        className="team-card"
        variants={cardVariants}
        whileHover={{ y: -6, scale: 1.015 }}
      >
        <div className="team-card__image-wrapper">
          <img src={member.image} alt={member.name} className="team-card__image" />
        </div>
        <div className="team-card__info">
          <h3 className="team-card__name">{member.name}</h3>
          <h4 className="team-card__role">{member.role}</h4>
          <p className="team-card__qualifications">{member.qualifications}</p>
          <p className="team-card__desc">{member.description}</p>
          
          {member.id === 'dr-ahalya' && (
            <button
              type="button"
              className="team-card__bio-link"
              onClick={() => setIsModalOpen(true)}
            >
              <span>Explore Bio & 10-Step Approach</span>
              <span className="bio-arrow">→</span>
            </button>
          )}
        </div>
      </motion.div>

      {member.id === 'dr-ahalya' && (
        <DrAhalyaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
});

TeamMemberCard.displayName = 'TeamMemberCard';
