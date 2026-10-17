import { useState, useEffect } from 'react';
import { aboutService } from '../services/aboutService';
import type { AboutFeature, PhilosophyPillar } from '../types';

export const useAbout = () => {
  const [features, setFeatures] = useState<AboutFeature[]>([]);
  const [pillars, setPillars] = useState<PhilosophyPillar[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    Promise.all([aboutService.getFeatures(), aboutService.getPillars()]).then(
      ([featData, pillarData]) => {
        if (mounted) {
          setFeatures(featData);
          setPillars(pillarData);
          setLoading(false);
        }
      }
    );
    return () => {
      mounted = false;
    };
  }, []);

  return { features, pillars, loading };
};
