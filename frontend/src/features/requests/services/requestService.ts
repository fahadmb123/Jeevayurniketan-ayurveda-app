import type { PatientRequest } from '../types';
import { patientService } from '@/features/patients';

export const INITIAL_REQUESTS: PatientRequest[] = [
  {
    id: 'REQ-101',
    patientName: 'Pooja Nair',
    age: 28,
    gender: 'Female',
    phone: '+91 98450 12345',
    email: 'pooja.nair@gmail.com',
    city: 'Kochi, Kerala',
    service: 'Smriti Meditation Therapy',
    mode: 'Video Call',
    preferredDate: '2026-10-22',
    preferredTimeSlot: '10:00 AM',
    primaryConcern: 'Chronic workplace anxiety, sleep onset insomnia, and restlessness',
    symptoms: ['Palpitations', 'Vata Imbalance', 'Restless Leg', 'Sleep Latency > 1hr'],
    notes: 'Seeking guided Smriti meditation and non-pharmacological Ayurvedic protocols to manage stress.',
    requestedAt: '15 mins ago',
    status: 'pending',
  },
  {
    id: 'REQ-102',
    patientName: 'Harish Chandra',
    age: 44,
    gender: 'Male',
    phone: '+91 94471 88992',
    email: 'harish.chandra@outlook.com',
    city: 'Bengaluru, Karnataka',
    service: 'Nadi Pariksha & Pulse Assessment',
    mode: 'In-Person',
    preferredDate: '2026-10-23',
    preferredTimeSlot: '02:30 PM',
    primaryConcern: 'Persistent joint stiffness and severe sluggish digestion (Ama accumulation)',
    symptoms: ['Morning Joint Stiffness', 'Weak Agni', 'Post-meal Heaviness', 'Fatigue'],
    notes: 'Wants authentic pulse diagnosis and a customized Panchakarma detox roadmap.',
    requestedAt: '45 mins ago',
    status: 'pending',
  },
  {
    id: 'REQ-103',
    patientName: 'Meera Krishnan',
    age: 36,
    gender: 'Female',
    phone: '+91 97455 33441',
    email: 'meera.krishnan@yahoo.com',
    city: 'Trivandrum, Kerala',
    service: 'Stress Management & Shirodhara',
    mode: 'In-Person',
    preferredDate: '2026-10-24',
    preferredTimeSlot: '11:15 AM',
    primaryConcern: 'Severe tension cephalea and occupational burnout',
    symptoms: ['Neck & Shoulder Spasms', 'Frequent Migraines', 'Sensory Sensitivity'],
    notes: 'Prior allopathic treatments offered temporary relief. Looking for deep herbal oil therapies.',
    requestedAt: '2 hours ago',
    status: 'pending',
  },
  {
    id: 'REQ-104',
    patientName: 'Kavita Desai',
    age: 51,
    gender: 'Female',
    phone: '+91 98201 55667',
    email: 'kavita.desai@gmail.com',
    city: 'Mumbai, Maharashtra',
    service: 'Ayurvedic Psychotherapy',
    mode: 'Video Call',
    preferredDate: '2026-10-20',
    preferredTimeSlot: '04:00 PM',
    primaryConcern: 'Post-grief emotional heaviness and low vital energy (Ojas depletion)',
    symptoms: ['Low Energy', 'Loss of Appetite', 'Mood Fluctuations'],
    notes: 'Referred by Dr. Rajesh for Satvavajaya Chikitsa (Ayurvedic psycho-spiritual care).',
    requestedAt: 'Yesterday',
    status: 'accepted',
    acceptedAt: 'Yesterday at 5:15 PM',
  },
  {
    id: 'REQ-105',
    patientName: 'Arjun Singhania',
    age: 26,
    gender: 'Male',
    phone: '+91 99100 77889',
    email: 'arjun.singhania@hotmail.com',
    city: 'New Delhi',
    service: 'General Wellness Consultation',
    mode: 'Video Call',
    preferredDate: '2026-10-19',
    preferredTimeSlot: '06:00 PM',
    primaryConcern: 'Routine gym bodybuilding diet advice without active health symptoms',
    symptoms: ['No active complaints'],
    notes: 'Looking for fast weight loss supplements and gym protein tips.',
    requestedAt: '2 days ago',
    status: 'rejected',
    rejectionReason: 'Outside clinical Ayurvedic scope. Re-routed to sports nutrition counseling.',
  },
];

export const INITIAL_CONSULTATION_REQUESTS = INITIAL_REQUESTS;

let requestsDatabase: PatientRequest[] = [...INITIAL_REQUESTS];
const listeners = new Set<(requests: PatientRequest[]) => void>();

function notify() {
  const current = [...requestsDatabase];
  listeners.forEach((l) => l(current));
}

export const requestService = {
  subscribe(listener: (requests: PatientRequest[]) => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  async getRequests(): Promise<PatientRequest[]> {
    return [...requestsDatabase];
  },

  async acceptRequest(id: string): Promise<PatientRequest> {
    const index = requestsDatabase.findIndex((r) => r.id === id);
    if (index === -1) {
      throw new Error(`Request with id ${id} not found.`);
    }

    const currentReq = requestsDatabase[index];
    const updated: PatientRequest = {
      ...currentReq,
      status: 'accepted',
      acceptedAt: 'Just now',
    };

    requestsDatabase[index] = updated;

    // Automatically enroll as a registered patient in the patient registry
    await patientService.addPatient({
      name: updated.patientName,
      age: updated.age,
      gender: updated.gender,
      phone: updated.phone,
      email: updated.email,
      condition: updated.primaryConcern,
      lastVisit: 'Today (New Request)',
      status: 'Consultation',
    });

    notify();
    return updated;
  },

  async rejectRequest(id: string, reason?: string): Promise<PatientRequest> {
    const index = requestsDatabase.findIndex((r) => r.id === id);
    if (index === -1) {
      throw new Error(`Request with id ${id} not found.`);
    }

    const currentReq = requestsDatabase[index];
    const updated: PatientRequest = {
      ...currentReq,
      status: 'rejected',
      rejectionReason: reason || 'Declined by consulting physician due to scheduling capacity.',
    };

    requestsDatabase[index] = updated;
    notify();
    return updated;
  },
};

export const consultationService = requestService;
