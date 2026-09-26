import React from 'react';
import { motion } from 'framer-motion';
import './TeamSection.css';

export const TeamSection: React.FC = () => {
  const teamMembers = [
    {
      name: 'Dr. K.V. Dilipkumar',
      role: 'Emeritus Professor & Chief Patron',
      qualifications: 'MD (Ayu), Pioneer in Ayurvedic Psychotherapy',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop', // Realistic placeholder
      description: 'Focusing on Ayurvedic psychotherapy for over two decades. Founder of Clinical Research Institute of Yoga and Ayurveda.'
    },
    {
      name: 'Dr. Muhammed Safeer P I',
      role: 'Smriti Meditation Practitioner & Trainer',
      qualifications: 'MD (Ayu PSM & Yoga)',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop',
      description: 'Ten years of clinical experience in lifestyle disease and wellness therapy, expert in clinical yoga.'
    },
    {
      name: 'Dr. Shamna K K',
      role: 'Dedicated Practitioner',
      qualifications: 'BAMS, MD(Ay), CSM',
      image: 'https://images.unsplash.com/photo-1594824432258-2900742194d7?q=80&w=800&auto=format&fit=crop',
      description: 'Guiding individuals toward inner balance with 6+ years of work releasing stress and overcoming inner conflicts.'
    }
  ];

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
        {teamMembers.map((member, index) => (
          <motion.div 
            className="team-card" 
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="team-image-wrapper">
              <img src={member.image} alt={member.name} className="team-image" />
            </div>
            <div className="team-info">
              <h3 className="team-name">{member.name}</h3>
              <h4 className="team-role">{member.role}</h4>
              <p className="team-qualifications">{member.qualifications}</p>
              <p className="team-description">{member.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

