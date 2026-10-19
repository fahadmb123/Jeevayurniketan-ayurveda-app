import React from 'react';
import { motion } from 'framer-motion';

interface LeafConfig {
  id: number;
  left: string;
  top: string;
  scale: number;
  rotate: number;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
  color?: string;
}

const LEAVES: LeafConfig[] = [
  { id: 1, left: '6%', top: '15%', scale: 0.9, rotate: 35, duration: 6, delay: 0, driftX: 18, driftY: 15, color: '#68c33b' },
  { id: 2, left: '18%', top: '55%', scale: 0.75, rotate: -25, duration: 7.5, delay: 1.2, driftX: -15, driftY: 20, color: '#5eb135' },
  { id: 3, left: '32%', top: '75%', scale: 0.65, rotate: 60, duration: 8, delay: 0.5, driftX: 20, driftY: -15, color: '#4d992a' },
  { id: 4, left: '65%', top: '65%', scale: 0.85, rotate: -45, duration: 6.8, delay: 1.8, driftX: -22, driftY: 18, color: '#5eb135' },
  { id: 5, left: '82%', top: '25%', scale: 0.7, rotate: 20, duration: 7.2, delay: 0.8, driftX: 16, driftY: -12, color: '#68c33b' },
  { id: 6, left: '92%', top: '70%', scale: 0.8, rotate: -30, duration: 6.5, delay: 2.2, driftX: -18, driftY: 16, color: '#4d992a' },
];

export const FloatingLeaves: React.FC = React.memo(() => {
  return (
    <div className="floating-leaves-container" aria-hidden="true">
      {LEAVES.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="floating-leaf-item"
          style={{
            left: leaf.left,
            top: leaf.top,
          }}
          animate={{
            x: [0, leaf.driftX, 0],
            y: [0, leaf.driftY, 0],
            rotate: [leaf.rotate, leaf.rotate + 18, leaf.rotate],
          }}
          transition={{
            duration: leaf.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: leaf.delay,
          }}
        >
          <svg
            width={28 * leaf.scale}
            height={36 * leaf.scale}
            viewBox="0 0 28 36"
            fill="none"
            style={{ filter: 'drop-shadow(0 4px 8px rgba(35, 90, 45, 0.22))' }}
          >
            {/* Natural botanical leaf curve */}
            <path
              d="M14 2 C24 10 28 22 20 32 C17 36 14 36 13 32 C6 22 8 8 14 2 Z"
              fill={leaf.color || '#5eb135'}
            />
            {/* Central vein */}
            <path
              d="M14 4 Q14 20 15 32"
              stroke="rgba(255, 255, 255, 0.45)"
              strokeWidth="1"
              strokeLinecap="round"
            />
            {/* Side veins */}
            <path
              d="M14 12 Q18 10 20 12 M14 18 Q19 17 21 20 M14 15 Q10 13 8 15 M14 22 Q9 21 8 24"
              stroke="rgba(255, 255, 255, 0.35)"
              strokeWidth="0.75"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
});

FloatingLeaves.displayName = 'FloatingLeaves';
