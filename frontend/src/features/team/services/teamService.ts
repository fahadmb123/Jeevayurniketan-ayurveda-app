import type { TeamMember } from '../types';

export const MOCK_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'dr-dilipkumar',
    name: 'Dr. K.V. Dilipkumar',
    role: 'Emeritus Professor & Chief Patron',
    qualifications: 'MD (Ayu), Pioneer in Ayurvedic Psychotherapy',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop',
    description: 'Focusing on Ayurvedic psychotherapy for over two decades. Founder of Clinical Research Institute of Yoga and Ayurveda.',
  },
  {
    id: 'dr-safeer',
    name: 'Dr. Muhammed Safeer P I',
    role: 'Smriti Meditation Practitioner & Trainer',
    qualifications: 'MD (Ayu PSM & Yoga)',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop',
    description: 'Ten years of clinical experience in lifestyle disease and wellness therapy, expert in clinical yoga.',
  },
  {
    id: 'dr-shamna',
    name: 'Dr. Shamna K K',
    role: 'Dedicated Practitioner',
    qualifications: 'BAMS, MD(Ay), CSM',
    image: 'https://images.unsplash.com/photo-1594824432258-2900742194d7?q=80&w=800&auto=format&fit=crop',
    description: 'Guiding individuals toward inner balance with 6+ years of work releasing stress and overcoming inner conflicts.',
  },
];

export const teamService = {
  async getTeamMembers(): Promise<TeamMember[]> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return MOCK_TEAM_MEMBERS;
  },

  async getMemberById(id: string): Promise<TeamMember | undefined> {
    return MOCK_TEAM_MEMBERS.find((m) => m.id === id);
  },
};
