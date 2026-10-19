import React from 'react';
import { motion, type Variants } from 'framer-motion';
import type { TeamMember } from '../types';
import './TeamMemberCard.css';

export interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
}

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -220,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.1,
      ease: 'easeOut',
    },
  },
};

export const TeamMemberCard: React.FC<TeamMemberCardProps> = React.memo(({ member }) => {
  return (
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
      </div>
    </motion.div>
  );
});

TeamMemberCard.displayName = 'TeamMemberCard';
