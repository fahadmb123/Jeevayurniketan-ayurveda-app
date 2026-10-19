import React from 'react';

interface TornPaperDividerProps {
  className?: string;
  fillColor?: string;
}

export const TornPaperDivider: React.FC<TornPaperDividerProps> = React.memo(({
  className = '',
  fillColor = 'var(--bg-color, #FBFBF9)',
}) => {
  return (
    <div className={`torn-paper-divider-wrapper ${className}`} aria-hidden="true">
      {/* Background shadow layer for paper tear depth */}
      <svg
        className="torn-paper-shadow"
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
      >
        <path
          d="M0,28 Q35,16 70,24 T140,20 T210,32 T280,18 T350,26 T420,15 T490,29 T560,19 T630,30 T700,16 T770,27 T840,18 T910,31 T980,17 T1050,26 T1120,16 T1190,30 T1260,18 T1330,27 T1400,16 L1440,24 L1440,90 L0,90 Z"
          fill="rgba(0, 0, 0, 0.08)"
        />
      </svg>

      {/* Main crisp torn paper deckle edge */}
      <svg
        className="torn-paper-svg"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
      >
        <path
          d="M0,32 
             C25,35 45,22 75,30 
             C105,38 125,25 155,34 
             C185,42 205,28 235,36 
             C265,44 285,26 315,35 
             C345,43 365,29 395,38 
             C425,46 445,25 475,33 
             C505,41 525,27 555,36 
             C585,44 605,24 635,32 
             C665,40 685,28 715,37 
             C745,45 765,26 795,34 
             C825,42 845,27 875,36 
             C905,44 925,25 955,33 
             C985,41 1005,28 1035,37 
             C1065,45 1085,24 1115,32 
             C1145,40 1165,27 1195,35 
             C1225,43 1245,26 1275,34 
             C1305,42 1325,28 1355,36 
             C1385,44 1410,25 1440,33 
             L1440,80 L0,80 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
});

TornPaperDivider.displayName = 'TornPaperDivider';
