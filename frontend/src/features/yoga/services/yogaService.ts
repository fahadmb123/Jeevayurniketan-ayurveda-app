import type { YogaSession, YogaFormData } from '../types/yoga.types';

const STORAGE_KEY = 'jeevayurniketan_yoga_sessions_v1';

const DEFAULT_YOGA_SESSIONS: YogaSession[] = [
  {
    id: 'yoga-1',
    title: 'Surya Namaskar & Morning Pranayama',
    instructor: 'Acharya Vinod, E-RYT 500',
    duration: '60 mins',
    format: 'hybrid',
    suitableFor: 'Beginners & Energy Vitality',
    ageGroup: 'All Ages (14+)',
    days: ['Monday', 'Wednesday', 'Friday'],
    time: '06:30 AM - 07:30 AM',
    location: 'Open Garden Shala & Live Stream',
    level: 'Beginner',
    description: 'Awaken your Prana (life-force) through traditional sun salutations combined with Anulom-Vilom and Bhastrika breathing techniques to balance Tridoshas.',
    capacity: 25,
    enrolledCount: 18,
    price: '₹450 / session',
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'yoga-2',
    title: 'Therapeutic Yoga for Spine & Joints',
    instructor: 'Dr. Ananya Sharma, BAMS & Yoga Specialist',
    duration: '45 mins',
    format: 'offline',
    suitableFor: 'Joint Stiffness, Back Pain & Seniors',
    ageGroup: 'Seniors & Adults (40+)',
    days: ['Tuesday', 'Thursday', 'Saturday'],
    time: '08:00 AM - 08:45 AM',
    location: 'Therapy Room 3, Kottakkal',
    level: 'All Levels',
    description: 'Gentle micro-movements (Sukshma Vyayama) and customized postures targeting lumbar relaxation, cervical comfort, and arthritis alleviation.',
    capacity: 15,
    enrolledCount: 12,
    price: '₹600 / session',
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'yoga-3',
    title: 'Mindful Yoga Nidra & Stress Dissolution',
    instructor: 'Acharya Vinod & Clinical Psychologist',
    duration: '60 mins',
    format: 'online',
    suitableFor: 'Insomnia, Anxiety & Mental Fatigue',
    ageGroup: 'Adults (18+)',
    days: ['Monday', 'Wednesday', 'Sunday'],
    time: '07:30 PM - 08:30 PM',
    location: 'Live Interactive Zoom / Meet',
    level: 'All Levels',
    description: 'Deep psychological reset through guided psychic sleep (Yoga Nidra). Reduces cortisol, calms hyperactive Vata dosha, and restores restorative sleep cycles.',
    capacity: 40,
    enrolledCount: 29,
    price: '₹400 / session',
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'yoga-4',
    title: 'Ashtanga Vinyasa Flow (Agni Booster)',
    instructor: 'Yogini Devika Nambiar',
    duration: '75 mins',
    format: 'offline',
    suitableFor: 'Intermediate & Metabolic Detox',
    ageGroup: 'Youth & Adults (18-50)',
    days: ['Tuesday', 'Thursday', 'Saturday'],
    time: '06:00 AM - 07:15 AM',
    location: 'Main Shala, Jeevayurniketan',
    level: 'Intermediate',
    description: 'Dynamic synchronized breath-movement sequences to kindle digestive fire (Jatharagni), build muscular endurance, and enhance cardiovascular tone.',
    capacity: 20,
    enrolledCount: 14,
    price: '₹550 / session',
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'yoga-5',
    title: 'Restorative Yin Yoga & Sound Healing',
    instructor: 'Yogini Devika & Guest Ayurvedic Vaidya',
    duration: '90 mins',
    format: 'offline',
    suitableFor: 'Deep Relaxation & Emotional Release',
    ageGroup: 'All Ages (16+)',
    days: ['Saturday', 'Sunday'],
    time: '05:00 PM - 06:30 PM',
    location: 'Lotus Meditation Hall',
    level: 'Beginner',
    description: 'Slow-paced restorative poses supported by bolsters and natural herbs, combined with Tibetan singing bowl resonance for cellular harmony.',
    capacity: 18,
    enrolledCount: 16,
    price: '₹750 / session',
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'yoga-6',
    title: 'Women’s Hormonal Harmony & Prenatal Care',
    instructor: 'Dr. Ananya Sharma, BAMS',
    duration: '60 mins',
    format: 'hybrid',
    suitableFor: 'PCOD, Hormonal Health & Gentle Posture',
    ageGroup: 'Women of All Ages',
    days: ['Monday', 'Thursday'],
    time: '10:00 AM - 11:00 AM',
    location: 'Studio B & Online Tele-Class',
    level: 'All Levels',
    description: 'Specialized therapeutic sequences designed to nourish the reproductive system, ease pelvic tension, and restore metabolic equilibrium.',
    capacity: 15,
    enrolledCount: 11,
    price: '₹500 / session',
    status: 'active',
    imageUrl: 'https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?q=80&w=800&auto=format&fit=crop',
  },
];

const loadSessionsFromStorage = (): YogaSession[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed to parse yoga sessions from localStorage:', err);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_YOGA_SESSIONS));
  return DEFAULT_YOGA_SESSIONS;
};

const saveSessionsToStorage = (sessions: YogaSession[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch (err) {
    console.error('Failed to save yoga sessions to localStorage:', err);
  }
};

export const yogaService = {
  getAll: async (): Promise<YogaSession[]> => {
    // Simulate brief network latency for smooth UI transitions
    await new Promise((resolve) => setTimeout(resolve, 80));
    return loadSessionsFromStorage();
  },

  getById: async (id: string): Promise<YogaSession | undefined> => {
    const sessions = loadSessionsFromStorage();
    return sessions.find((s) => s.id === id);
  },

  create: async (formData: YogaFormData): Promise<YogaSession> => {
    const sessions = loadSessionsFromStorage();
    const newSession: YogaSession = {
      ...formData,
      id: `yoga-${Date.now()}`,
      enrolledCount: 0,
      status: 'active',
      imageUrl: formData.imageUrl?.trim() || 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=800&auto=format&fit=crop',
    };
    const updated = [newSession, ...sessions];
    saveSessionsToStorage(updated);
    return newSession;
  },

  update: async (id: string, formData: Partial<YogaFormData>): Promise<YogaSession> => {
    const sessions = loadSessionsFromStorage();
    const index = sessions.findIndex((s) => s.id === id);
    if (index === -1) {
      throw new Error(`Yoga session with ID ${id} not found.`);
    }
    const updatedSession: YogaSession = {
      ...sessions[index],
      ...formData,
    };
    sessions[index] = updatedSession;
    saveSessionsToStorage(sessions);
    return updatedSession;
  },

  delete: async (id: string): Promise<boolean> => {
    const sessions = loadSessionsFromStorage();
    const filtered = sessions.filter((s) => s.id !== id);
    if (filtered.length === sessions.length) return false;
    saveSessionsToStorage(filtered);
    return true;
  },

  resetDefaults: async (): Promise<YogaSession[]> => {
    saveSessionsToStorage(DEFAULT_YOGA_SESSIONS);
    return DEFAULT_YOGA_SESSIONS;
  },
};
