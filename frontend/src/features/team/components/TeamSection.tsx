import React from 'react';
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

      <div className="team-grid">
        {expertMembers.map((member, index) => (
          <TeamMemberCard key={member.id} member={member} index={index} />
        ))}
      </div>
    </section>
  );
});

TeamSection.displayName = 'TeamSection';

