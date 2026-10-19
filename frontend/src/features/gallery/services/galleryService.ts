import type { GalleryItem, GalleryFormData } from '../types';

const GALLERY_STORAGE_KEY = 'jeevayurniketan_gallery_items';
const GALLERY_UPDATED_EVENT = 'jeevayurniketan_gallery_updated';

export const INITIAL_GALLERY_ITEMS: GalleryItem[] = [
  // Yoga Items
  {
    id: 'yoga-1',
    title: 'Surya Namaskar at Dawn',
    category: 'yoga',
    imageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80',
    description: 'Traditional 12-step sun salutation flow welcoming the morning prana in our courtyard.',
    createdAt: '2026-10-10',
    author: 'Dr. Akhil Varma',
    aspectRatio: 'landscape',
  },
  {
    id: 'yoga-2',
    title: 'Mindfulness & Dhyana Session',
    category: 'yoga',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    description: 'Deep meditative stillness focusing on breath awareness and nervous system calmitude.',
    createdAt: '2026-10-12',
    author: 'Yogacharya Meera',
    aspectRatio: 'landscape',
  },
  {
    id: 'yoga-3',
    title: 'Lotus Posture (Padmasana) in Shala',
    category: 'yoga',
    imageUrl: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&w=1200&q=80',
    description: 'Root grounding and spine alignment within our natural teakwood yoga shala.',
    createdAt: '2026-10-14',
    author: 'Dr. Akhil Varma',
    aspectRatio: 'portrait',
  },
  {
    id: 'yoga-4',
    title: 'Restorative Vinyasa & Spinal Mobility',
    category: 'yoga',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80',
    description: 'Gentle mindful movement suited for stress relief and musculoskeletal recovery.',
    createdAt: '2026-10-15',
    author: 'Yogacharya Meera',
    aspectRatio: 'landscape',
  },
  {
    id: 'yoga-5',
    title: 'Pranayama & Energy Cleansing',
    category: 'yoga',
    imageUrl: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=1200&q=80',
    description: 'Nadi Shodhana and Kapalabhati practices harmonizing vital bio-energies (Vata & Pitta).',
    createdAt: '2026-10-17',
    author: 'Dr. Akhil Varma',
    aspectRatio: 'landscape',
  },

  // Treatment Items
  {
    id: 'treatment-1',
    title: 'Shirodhara Medicated Oil Pouring',
    category: 'treatment',
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80',
    description: 'Continuous rhythmic stream of warm herbal oil over the forehead chakra to relieve anxiety and insomnia.',
    createdAt: '2026-10-08',
    author: 'Dr. Radhika Sen',
    aspectRatio: 'landscape',
  },
  {
    id: 'treatment-2',
    title: 'Abhyanga Full-Body Herbal Massage',
    category: 'treatment',
    imageUrl: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1200&q=80',
    description: 'Therapeutic warm medicated oil massage along energy meridians to invigorate cellular vitality.',
    createdAt: '2026-10-11',
    author: 'Dr. Akhil Varma',
    aspectRatio: 'landscape',
  },
  {
    id: 'treatment-3',
    title: 'Botanical Herbarium & Fresh Decoctions',
    category: 'treatment',
    imageUrl: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1200&q=80',
    description: 'Hand-ground Ayurvedic roots, Ashwagandha, and therapeutic botanical formulations.',
    createdAt: '2026-10-13',
    author: 'Dr. Radhika Sen',
    aspectRatio: 'landscape',
  },
  {
    id: 'treatment-4',
    title: 'Swedana Herbal Steam & Hydrotherapy',
    category: 'treatment',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    description: 'Detoxifying therapeutic steam bath infused with aromatic medicinal leaves and cedar.',
    createdAt: '2026-10-16',
    author: 'Dr. Akhil Varma',
    aspectRatio: 'landscape',
  },
  {
    id: 'treatment-5',
    title: 'Panchakarma Consultation & Herbal Poultice',
    category: 'treatment',
    imageUrl: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=80',
    description: 'Warm Kizhi herbal bolus application to relieve joint inflammation and muscle stiffness.',
    createdAt: '2026-10-18',
    author: 'Dr. Radhika Sen',
    aspectRatio: 'landscape',
  },
];

export const galleryService = {
  getItems(): GalleryItem[] {
    try {
      const stored = localStorage.getItem(GALLERY_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          let hasMigration = false;
          const sanitized = parsed.map((item: GalleryItem) => {
            if (item.imageUrl && item.imageUrl.includes('photo-1608248597359-5484852c038c')) {
              hasMigration = true;
              return {
                ...item,
                imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80',
              };
            }
            if (item.imageUrl && item.imageUrl.includes('photo-1512290900672-1f55b9e59d43')) {
              hasMigration = true;
              return {
                ...item,
                imageUrl: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1200&q=80',
              };
            }
            return item;
          });

          if (hasMigration) {
            localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(sanitized));
          }
          return sanitized;
        }
      }
    } catch {
      // Fallback to initial items on error
    }
    // Seed initial items if empty
    this.saveItems(INITIAL_GALLERY_ITEMS);
    return INITIAL_GALLERY_ITEMS;
  },

  saveItems(items: GalleryItem[]): void {
    try {
      localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(items));
      window.dispatchEvent(new CustomEvent(GALLERY_UPDATED_EVENT));
    } catch (e) {
      console.error('Failed to save gallery items to localStorage', e);
    }
  },

  addItem(data: GalleryFormData): GalleryItem {
    const current = this.getItems();
    const newItem: GalleryItem = {
      id: `${data.category}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title: data.title.trim(),
      category: data.category,
      imageUrl: data.imageUrl.trim(),
      description: data.description?.trim(),
      createdAt: new Date().toISOString().split('T')[0],
      author: 'Doctor / Wellness Admin',
      aspectRatio: 'landscape',
    };

    const updated = [newItem, ...current];
    this.saveItems(updated);
    return newItem;
  },

  deleteItem(id: string): boolean {
    const current = this.getItems();
    const filtered = current.filter((item) => item.id !== id);
    if (filtered.length !== current.length) {
      this.saveItems(filtered);
      return true;
    }
    return false;
  },

  resetDefaults(): GalleryItem[] {
    this.saveItems(INITIAL_GALLERY_ITEMS);
    return INITIAL_GALLERY_ITEMS;
  },

  subscribe(callback: () => void): () => void {
    const listener = () => callback();
    window.addEventListener(GALLERY_UPDATED_EVENT, listener);
    window.addEventListener('storage', (e) => {
      if (e.key === GALLERY_STORAGE_KEY) {
        callback();
      }
    });
    return () => {
      window.removeEventListener(GALLERY_UPDATED_EVENT, listener);
    };
  },
};
