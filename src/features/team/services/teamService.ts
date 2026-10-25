import type { TeamMember } from '../types';

export const MOCK_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'dr-dilipkumar',
    name: 'Dr. K.V. Dilipkumar',
    role: 'Emeritus Professor & Chief Patron',
    qualifications: 'MD (Ayu), Pioneer in Ayurvedic Psychotherapy',
    image: 'https://res.cloudinary.com/liccrmic/image/upload/v1792913029/Devadersan_T.S.jpg',
    description: 'Providing senior clinical mentorship with over two decades of research in Caraka Samhita and classical Ayurvedic psychotherapy.',
  },
  {
    id: 'dr-ahalya',
    name: 'Dr. Ahalya T.S.',
    role: 'Ayurvedic Physician | Yoga & Holistic Wellness',
    qualifications: "BAMS (Alva's), FCCAP (Kottakkal), YIC (S-VYASA)",
    image: 'https://res.cloudinary.com/liccrmic/image/upload/v1792910336/athalya-cmprsd.jpg',
    description: 'Specializing in individualized Ayurvedic care, constitutional health assessment, lifestyle and dietary guidance, and therapeutic yoga.',
  },
  {
    id: 'dr-safeer',
    name: 'Dr. Muhammed Safeer P I',
    role: 'Smriti Meditation Practitioner & Trainer',
    qualifications: 'MD (Ayu PSM & Yoga)',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=800&auto=format&fit=crop',
    description: 'Ten years of clinical experience in lifestyle disease and wellness therapy, expert in clinical yoga.',
  },
  {
    id: 'dr-shamna',
    name: 'Dr. Shamna K K',
    role: 'Dedicated Practitioner',
    qualifications: 'BAMS, MD(Ay), CSM',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop',
    description: 'Guiding individuals toward inner balance with 6+ years of work releasing stress and overcoming inner conflicts.',
  },
];

export const teamService = {
  async getTeamMembers(): Promise<TeamMember[]> {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return MOCK_TEAM_MEMBERS;
  },

  async getMemberById(id: string): Promise<TeamMember | undefined> {
    return MOCK_TEAM_MEMBERS.find((m) => m.id === id);
  },
};