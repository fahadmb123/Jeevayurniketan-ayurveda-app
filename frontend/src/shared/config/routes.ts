export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  TEAM: '/team',
  BLOG: '/blog',
  CONTACT: '/contact',
  
  // Auth
  LOGIN: '/login',
  REGISTER: '/register',

  // Doctor Portal
  DOCTOR: '/doctor',
  DOCTOR_PATIENTS: '/doctor/patients',
  DOCTOR_APPOINTMENTS: '/doctor/appointments',
  DOCTOR_RECORDS: '/doctor/records',
  DOCTOR_SETTINGS: '/doctor/settings',
} as const;

export type AppRoute = typeof ROUTES[keyof typeof ROUTES];
