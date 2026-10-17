import React from 'react';
import { motion } from 'framer-motion';
import type { TeamMember } from '../model/types';
import './TeamMemberCard.css';

export interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
}

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, index }) => {
  return (
    <motion.div
      className="team-card"
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
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
};
