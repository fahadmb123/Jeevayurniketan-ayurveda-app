import type { AyurvedaService, FaqItem } from '../types';

export const MOCK_SERVICES: AyurvedaService[] = [
  {
    id: 'psychotherapy',
    title: 'Psychotherapy',
    description: 'Expert counseling tailored to resolve deep-seated psychological conflicts and bring mental clarity.',
    icon: '🧠',
    benefits: ['Emotional resilience', 'Stress reduction', 'Trauma resolution'],
    duration: '60 mins',
  },
  {
    id: 'smriti-meditation',
    title: 'Smriti Meditation',
    description: 'A guided interactive therapeutic meditation used to identify the root cause of psychosomatic illness.',
    icon: '🧘',
    benefits: ['Subconscious unburdening', 'Somatic relief', 'Mental rejuvenation'],
    duration: '45 mins',
  },
  {
    id: 'stress-management',
    title: 'Stress Management',
    description: 'Comprehensive programs combining ancient wisdom and modern techniques to relieve stress.',
    icon: '🌿',
    benefits: ['Cortisol balance', 'Deep relaxation', 'Sleep quality enhancement'],
    duration: '7-14 days',
  },
  {
    id: 'ayurveda-healing',
    title: 'Ayurveda Healing',
    description: 'Personalized treatments based on traditional Ayurvedic principles for full body wellness.',
    icon: '💊',
    benefits: ['Dosha harmonization', 'Detoxification', 'Immunity revitalization'],
    duration: 'Custom program',
  },
];

export const MOCK_FAQS: FaqItem[] = [
  {
    q: 'What is Smriti Meditation?',
    a: 'Smriti meditation is an interactive Ayurvedic psychotherapeutic procedure where the patient is guided into deep relaxation to re-experience and resolve repressed emotional traumas that manifest as physical and psychological illnesses.',
  },
  {
    q: 'How many sessions are typically required?',
    a: 'Most clinical programs consist of 3 to 7 structured sessions depending on the nature and chronicity of the condition, complemented with follow-up lifestyle and diet protocols.',
  },
  {
    q: 'Can online consultations be conducted for remote patients?',
    a: 'Yes, we provide specialized video telemedicine consultations and remote guided counseling sessions for patients across India and internationally.',
  },
];

export const treatmentService = {
  async getServices(): Promise<AyurvedaService[]> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return MOCK_SERVICES;
  },

  async getFaqs(): Promise<FaqItem[]> {
    return MOCK_FAQS;
  },
};
