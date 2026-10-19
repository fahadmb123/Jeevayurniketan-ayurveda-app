import React from 'react';

interface LeafConfig {
  id: number;
  className: string;
  left: string;
  top: string;
  scale: number;
  color: string;
}

const LEAVES: LeafConfig[] = [
  { id: 1, className: 'leaf-anim-1', left: '6%', top: '15%', scale: 0.85, color: '#68c33b' },
  { id: 2, className: 'leaf-anim-2', left: '20%', top: '45%', scale: 0.7, color: '#5eb135' },
  { id: 3, className: 'leaf-anim-3', left: '38%', top: '65%', scale: 0.65, color: '#4d992a' },
  { id: 4, className: 'leaf-anim-4', left: '68%', top: '55%', scale: 0.8, color: '#5eb135' },
  { id: 5, className: 'leaf-anim-5', left: '85%', top: '25%', scale: 0.7, color: '#68c33b' },
  { id: 6, className: 'leaf-anim-6', left: '93%', top: '60%', scale: 0.75, color: '#4d992a' },
];

export const FloatingLeaves: React.FC = React.memo(() => {
  return (
    <div className="floating-leaves-container" aria-hidden="true">
      {LEAVES.map((leaf) => (
        <div
          key={leaf.id}
          className={`floating-leaf-item ${leaf.className}`}
          style={{
            left: leaf.left,
            top: leaf.top,
          }}
        >
          <svg
            width={26 * leaf.scale}
            height={34 * leaf.scale}
            viewBox="0 0 28 36"
            fill="none"
          >
            {/* Natural botanical leaf curve */}
            <path
              d="M14 2 C24 10 28 22 20 32 C17 36 14 36 13 32 C6 22 8 8 14 2 Z"
              fill={leaf.color}
            />
            {/* Central vein */}
            <path
              d="M14 4 Q14 20 15 32"
              stroke="rgba(255, 255, 255, 0.45)"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        </div>
      ))}
    </div>
  );
});

FloatingLeaves.displayName = 'FloatingLeaves';
