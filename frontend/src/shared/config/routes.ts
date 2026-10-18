export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  YOGA: '/yoga',
  TEAM: '/team',
  BLOG: '/blog',
  CONTACT: '/contact',
  
  // Auth
  LOGIN: '/login',
  REGISTER: '/register',

  // Doctor Portal
  DOCTOR: '/doctor',
  DOCTOR_REQUESTS: '/doctor/requests',
  DOCTOR_CONSULTATION_REQUESTS: '/doctor/requests',
  DOCTOR_PATIENTS: '/doctor/patients',
  DOCTOR_APPOINTMENTS: '/doctor/appointments',
  DOCTOR_YOGA: '/doctor/yoga',
  DOCTOR_RECORDS: '/doctor/records',
  DOCTOR_SETTINGS: '/doctor/settings',
} as const;

export type AppRoute = typeof ROUTES[keyof typeof ROUTES];
