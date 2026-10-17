import { useState } from 'react';
import { homeService } from '../services/homeService';
import type { HeroContent } from '../types';

export const useHome = () => {
  const [heroData] = useState<HeroContent>(() => homeService.getHeroData());

  return { heroData };
};
