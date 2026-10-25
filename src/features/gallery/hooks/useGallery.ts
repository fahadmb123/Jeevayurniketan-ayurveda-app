import { useState, useEffect, useMemo, useCallback } from 'react';
import type { GalleryItem, GalleryCategory, GalleryFormData } from '../types';
import { galleryService } from '../services/galleryService';

export type GalleryFilterTab = 'all' | GalleryCategory;

export const useGallery = (initialCategory: GalleryFilterTab = 'all') => {
  const [items, setItems] = useState<GalleryItem[]>(() => galleryService.getItems());
  const [selectedCategory, setSelectedCategory] = useState<GalleryFilterTab>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Sync with service updates
  useEffect(() => {
    const unsubscribe = galleryService.subscribe(() => {
      setItems(galleryService.getItems());
    });
    return unsubscribe;
  }, []);

  // Clear feedback message automatically
  useEffect(() => {
    if (feedbackMessage) {
      const timer = setTimeout(() => setFeedbackMessage(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [feedbackMessage]);

  const yogaCount = useMemo(
    () => items.filter((item) => item.category === 'yoga').length,
    [items]
  );

  const treatmentCount = useMemo(
    () => items.filter((item) => item.category === 'treatment').length,
    [items]
  );

  const totalCount = items.length;

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' ? true : item.category === selectedCategory;

      const matchesSearch =
        searchQuery.trim() === ''
          ? true
          : item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.description &&
              item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (item.author && item.author.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [items, selectedCategory, searchQuery]);

  const handleAddItem = useCallback(async (data: GalleryFormData) => {
    const newItem = galleryService.addItem(data);
    setItems(galleryService.getItems());
    setFeedbackMessage(`Image "${newItem.title}" added to ${newItem.category === 'yoga' ? 'Yoga' : 'Treatment'} showcase.`);
    setIsModalOpen(false);
  }, []);

  const handleDeleteItem = useCallback((id: string, title?: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to remove "${title || 'this image'}" from the gallery?`
    );
    if (!confirmed) return;

    const success = galleryService.deleteItem(id);
    if (success) {
      setItems(galleryService.getItems());
      setFeedbackMessage('Image removed successfully.');
      if (activeLightboxItem?.id === id) {
        setActiveLightboxItem(null);
      }
    }
  }, [activeLightboxItem]);

  const handleResetDefaults = useCallback(() => {
    const confirmed = window.confirm('Reset gallery showcase to authentic clinic defaults?');
    if (!confirmed) return;

    galleryService.resetDefaults();
    setItems(galleryService.getItems());
    setFeedbackMessage('Gallery restored to clinic defaults.');
  }, []);

  return {
    items,
    filteredItems,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    totalCount,
    yogaCount,
    treatmentCount,
    isModalOpen,
    setIsModalOpen,
    activeLightboxItem,
    setActiveLightboxItem,
    feedbackMessage,
    handleAddItem,
    handleDeleteItem,
    handleResetDefaults,
  };
};
