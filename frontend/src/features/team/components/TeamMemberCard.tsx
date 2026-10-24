import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { TeamMember } from '../types';
import { DrAhalyaModal } from './DrAhalyaModal';
import { fadeUpVariants } from '@/shared/lib/animations';
import './TeamMemberCard.css';

export interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
}

export const TeamMemberCard: React.FC<TeamMemberCardProps> = React.memo(({ member }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        className="team-card"
        variants={fadeUpVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
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
