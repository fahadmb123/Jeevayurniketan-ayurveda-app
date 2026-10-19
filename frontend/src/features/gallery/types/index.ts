export type GalleryCategory = 'yoga' | 'treatment';

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  imageUrl: string;
  description?: string;
  createdAt: string;
  author?: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square';
}

export interface GalleryFormData {
  title: string;
  category: GalleryCategory;
  imageUrl: string;
  description?: string;
}
