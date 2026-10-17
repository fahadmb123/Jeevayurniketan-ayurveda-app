import type { BlogPost } from '../types';

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 'smriti-meditation-science',
    title: 'Science Behind Smriti Meditation',
    author: 'Dr. K.V. Dilipkumar',
    date: 'Aug 12, 2026',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop',
    excerpt: 'It is based on Ayurvedic principles and descriptions in Caraka Samhita. The effects of prajnaparadha may be reflected as disturbances at the psychological level...',
  },
  {
    id: 'intellectual-error-diseases',
    title: 'Intellectual Error & Psychosomatic Diseases',
    author: 'Dr. K.V. Dilipkumar',
    date: 'Sep 05, 2026',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=800&auto=format&fit=crop',
    excerpt: 'Web of causation of diseases are well narrated in Ayurveda classics. Intellectual error is identified as a major cause of diseases...',
  },
  {
    id: 'modern-epidemiological-scenario',
    title: 'The Modern Epidemiological Scenario',
    author: 'Dr. Muhammed Safeer P I',
    date: 'Sep 21, 2026',
    image: 'https://images.unsplash.com/photo-1511295742362-92c96b124e52?q=80&w=800&auto=format&fit=crop',
    excerpt: 'Until 100 years ago the epidemiological scenario of human diseases was concerned with major killer infectious communicable diseases...',
  },
];

export const blogService = {
  async getPosts(): Promise<BlogPost[]> {
    // Simulated network delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    return MOCK_BLOG_POSTS;
  },

  async getPostById(id: string): Promise<BlogPost | undefined> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return MOCK_BLOG_POSTS.find((p) => p.id === id);
  },
};
