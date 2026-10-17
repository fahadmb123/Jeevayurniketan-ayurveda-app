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

export interface YogaSession {
  id: string;
  title: string;
  duration: string;           // e.g. "60 mins"
  format: YogaFormat;         // 'online' | 'offline' | 'hybrid'
  suitableFor: string;        // e.g. "Beginners & Stress Relief", "Gentle Joints & Mobility"
  ageGroup: string;           // e.g. "All Ages", "Adults (18+)", "Seniors (50+)"
  days: DayOfWeek[];          // ['Monday', 'Wednesday', 'Friday']
  time: string;               // e.g. "06:30 AM - 07:30 AM"
  level: YogaLevel;           // 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels'
  description: string;
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
  ageGroup: string;
  days: DayOfWeek[];
  time: string;
  level: YogaLevel;
  description: string;
  instructor?: string;
  location?: string;
  capacity?: number;
  price?: string;
  imageUrl?: string;
}
