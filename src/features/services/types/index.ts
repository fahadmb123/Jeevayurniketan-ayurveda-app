export interface AyurvedaService {
  id: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
  categoryTag?: string;
  benefits?: string[];
  duration?: string;
}

export interface FaqItem {
  q: string;
  a: string;
}
