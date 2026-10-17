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
            className="team-card group cursor-pointer border border-transparent hover:border-green-500/20 hover:bg-green-50/30 transition-all duration-300" 
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ y: -10, scale: 1.02 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="team-image-wrapper overflow-hidden relative">
              <div className="absolute inset-0 bg-green-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 mix-blend-overlay"></div>
              <img src={member.image} alt={member.name} className="team-image transform group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="team-info">
              <h3 className="team-name group-hover:text-green-700 transition-colors">{member.name}</h3>
              <h4 className="team-role text-green-600">{member.role}</h4>
              <p className="team-qualifications font-semibold text-gray-500">{member.qualifications}</p>
              <p className="team-description text-gray-600">{member.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

