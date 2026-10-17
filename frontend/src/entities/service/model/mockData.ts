import type { AyurvedaService } from './types';

export const AYURVEDA_SERVICES: AyurvedaService[] = [
  {
    id: 'psychotherapy',
    title: 'Psychotherapy',
    description: 'Expert counseling tailored to resolve deep-seated psychological conflicts and bring mental clarity.',
    icon: '🧠'
  },
  {
    id: 'smriti-meditation',
    title: 'Smriti Meditation',
    description: 'A guided interactive therapeutic meditation used to identify the root cause of psychosomatic illness.',
    icon: '🧘'
  },
  {
    id: 'stress-management',
    title: 'Stress Management',
    description: 'Comprehensive programs combining ancient wisdom and modern techniques to relieve stress.',
    icon: '🌿'
  },
  {
    id: 'ayurveda-healing',
    title: 'Ayurveda Healing',
    description: 'Personalized treatments based on traditional Ayurvedic principles for full body wellness.',
    icon: '💊'
  }
];
