import type { Variants } from 'framer-motion';

/**
 * Standard Framer Motion Container Variant with Staggered Children
 * Coordinates sequential appearance of nested items when scrolled into view.
 */
export const staggerContainerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.08,
    },
  },
};

/**
 * Standard Framer Motion Fade-Up Item Variant
 * Longer travel distance (y: 75) and extended duration (0.95s) for a slow, 
 * elegant gliding effect where elements smoothly come up and join their resting position.
 */
export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 75,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.95,
      ease: [0.16, 1, 0.3, 1], // Silky smooth luxury deceleration glide
    },
  },
};

/**
 * Common Viewport Trigger Configuration
 * Triggers once when 15% of the element is visible in the viewport to allow full travel length.
 */
export const standardViewport = {
  once: true,
  amount: 0.15,
} as const;
