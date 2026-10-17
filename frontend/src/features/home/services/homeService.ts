import type { HeroContent } from '../types';

export const HERO_DATA: HeroContent = {
  badge: 'Ayurveda Counseling & Psychotherapy',
  title: 'Heal Your Mind,',
  highlightedText: 'Nourish Your Body',
  subtitle:
    'Experience the ancient wisdom of Ayurveda combined with modern psychotherapy for holistic healing. Find balance, peace, and wellness at Jeevayurniketan.',
};

export const homeService = {
  getHeroData(): HeroContent {
    return HERO_DATA;
  },
};
