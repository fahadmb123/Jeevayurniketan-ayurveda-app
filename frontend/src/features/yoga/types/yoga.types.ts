export type YogaFormat = 'online' | 'offline' | 'hybrid';

export type YogaLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';

export type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export const DAYS_OF_WEEK: DayOfWeek[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const SUITABLE_FOR_OPTIONS = [
  'Beginner (All Ages)',
  'Intermediate (Adults 18-50)',
  'Advanced (Adults 18+)',
  'All Levels (All Ages)',
  'Gentle & Restorative (Seniors 50+)',
] as const;

export interface YogaSession {
  id: string;
  title: string;
  duration: string;           // e.g. "60 mins"
  format: YogaFormat;         // 'online' | 'offline' | 'hybrid'
  suitableFor: string;        // e.g. "Beginner (All Ages)"
  days: DayOfWeek[];          // ['Monday', 'Wednesday', 'Friday']
  time: string;               // e.g. "06:30 AM - 07:30 AM"
  description: string;
  level?: YogaLevel;
  ageGroup?: string;
  instructor?: string;
  location?: string;
  capacity?: number;
  enrolledCount?: number;
  price?: string;             // e.g. "₹500 / session" or "Included in Retreat"
  status?: 'active' | 'upcoming';
  imageUrl?: string;
}

export interface YogaFormData {
  title: string;
  duration: string;
  format: YogaFormat;
  suitableFor: string;
  days: DayOfWeek[];
  time: string;
  description: string;
  level?: YogaLevel;
  ageGroup?: string;
  instructor?: string;
  location?: string;
  capacity?: number;
  price?: string;
  imageUrl?: string;
}
