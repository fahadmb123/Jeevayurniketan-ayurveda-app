import type { TeamMember } from '../types';

export const MOCK_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'dr-ahalya',
    name: 'Dr. Ahalya T.S.',
    role: 'Ayurveda & Wellness Consultant',
    qualifications: 'BAMS, YIC, CSAMT',
    image: 'https://res.cloudinary.com/liccrmic/image/upload/v1792910336/athalya-cmprsd.jpg',
    description: 'Specializing in individualized Ayurvedic care, constitutional health assessment, lifestyle and dietary guidance, and therapeutic yoga.',
  },
  {
    id: 'devadarsan',
    name: 'Devadarsan T.S.',
    role: 'Yoga & Meditation Teacher',
    qualifications: 'PhD Scholar in Yoga',
    qualificationLine2: 'MSc Yoga, MA',
    image: 'https://res.cloudinary.com/liccrmic/image/upload/v1792913029/Devadersan_T.S.jpg',
    description: 'Guiding classical therapeutic yoga, pranayama breath regulation, and restorative meditation routines integrated with Ayurvedic healthcare protocols.',
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