import React from 'react';
import { motion } from 'framer-motion';
import type { TeamMember } from '../types';
import './TeamMemberCard.css';

export interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
}

export const TeamMemberCard: React.FC<TeamMemberCardProps> = React.memo(({ member, index }) => {
  return (
    <motion.div
      className="team-card"
      initial={{ opacity: 0, x: -300 }}
      whileInView={{ opacity: 1, x: 0 }}
      whileHover={{ y: -6, scale: 1.015 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 1.2,
        delay: index * 0.3,
        ease: 'easeOut',
      }}
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
