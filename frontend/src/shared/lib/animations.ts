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
      staggerChildren: 0.15,
      delayChildren: 0.05,
    },
  },
};

/**
 * Standard Framer Motion Fade-Up Item Variant
 * Transitions elements from opacity 0, y: 50 to opacity 1, y: 0 using a premium cubic bezier ease.
 */
export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1], // Smooth luxury deceleration curve
    },
  },
};

/**
 * Common Viewport Trigger Configuration
 * Triggers once when 20% of the element is visible in the viewport.
 */
export const standardViewport = {
  once: true,
  amount: 0.2,
} as const;
