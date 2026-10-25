import type { AboutFeature, PhilosophyPillar } from '../types';

export const ABOUT_FEATURES: AboutFeature[] = [
  {
    icon: '✨',
    title: 'Holistic Approach',
    description: 'Treating root causes, not just symptoms.',
  },
  {
    icon: '🌿',
    title: 'Smriti Meditation',
    description: 'Guided therapeutic meditation for emotional healing.',
  },
  {
    icon: '👨‍⚕️',
    title: 'Expert Practitioners',
    description: 'Led by certified Ayurveda Doctors and Counselors.',
  },
];

export const PHILOSOPHY_PILLARS: PhilosophyPillar[] = [
  {
    icon: '🌿',
    title: 'Satvavajaya (Psychotherapy)',
    description:
      'The Ayurvedic psycho-spiritual therapeutic approach designed to restrain the mind from unwholesome objects and restore mental poise.',
  },
  {
    icon: '🧘',
    title: 'Smriti Meditation',
    description:
      'An interactive diagnostic and therapeutic meditation retrieving suppressed emotional memory complexes that trigger psychosomatic illness.',
  },
  {
    icon: '🍃',
    title: 'Yukti Vyapasraya (Herbal Care)',
    description:
      'Custom formulation of rasayanas, medhya herbs, and authentic panchakarma therapies to restore humoral harmony (Vata, Pitta, Kapha).',
  },
];

export const aboutService = {
  async getFeatures(): Promise<AboutFeature[]> {
    return ABOUT_FEATURES;
  },

  async getPillars(): Promise<PhilosophyPillar[]> {
    return PHILOSOPHY_PILLARS;
  },
};
