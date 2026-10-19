import React from 'react';
import { motion } from 'framer-motion';
import { TeamMemberCard } from './TeamMemberCard';
import { useTeam } from '../hooks/useTeam';
import './TeamSection.css';

export const TeamSection: React.FC = React.memo(() => {
  const { members } = useTeam();
  // Display only the 2 primary expert cards as requested
  const expertMembers = members.slice(0, 2);

  return (
    <section id="team" className="team-section">
      <div className="team-header text-center">
        <h4 className="section-subtitle">Our Team</h4>
        <h2 className="section-title">Meet Our Experts</h2>
        <p className="team-subtitle">
          Dedicated professionals bringing you the best of Ayurveda and modern therapy.
        </p>
      </div>

      <motion.div
        className="team-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {expertMembers.map((member, index) => (
          <TeamMemberCard key={member.id} member={member} index={index} />
        ))}
      </motion.div>
    </section>
  );
});

TeamSection.displayName = 'TeamSection';

