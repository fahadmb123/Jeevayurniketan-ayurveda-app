import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, type Variants } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, HeartPulse, Leaf, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BookAppointmentButton } from '@/features/appointments';
import { ROUTES } from '@/shared/config/routes';
import consultationImg from '@/assets/ayurveda_consultation.jpg';
import { DR_AHALYA_DATA } from '../data/drAhalyaData';
import './DoctorIntroSection.css';

// SVG Morphing Coordinate Arrays (11 coordinate values matching the 5 frames)
// Format: [y0, x1, y1, x2, y2, y3, x4, y4, x5, y5, y6]
// M 0 y0 C x1 y1, x2 y2, 50 y3 C x4 y4, x5 y5, 100 y6 L 100 100 L 0 100 Z

// Frame 0 & 5: Completely collapsed at bottom (invisible, height = 100)
const COORDS_START = [100, 25, 100, 25, 100, 100, 75, 100, 75, 100, 100];

// Frame 1: Fluid brushstroke contact & diagonal swell from bottom-right
const COORDS_IN_1 = [100, 30, 98, 48, 84, 68, 66, 54, 84, 36, 26];

// Frame 2: Broad calligraphic paint sweep arching across the center towards top-left
const COORDS_IN_2 = [36, 18, 52, 36, 32, 16, 68, 8, 86, 2, -2];

// Frame 3: Completely covers card in solid color (100% blank)
const COORDS_FULL = [-3, 25, -3, 25, -3, -3, 75, -3, 75, -3, -3];

// Frame 4: Smooth brush wipe-out diagonally downwards
const COORDS_OUT_1 = [24, 20, 38, 36, 56, 68, 76, 76, 90, 84, 92];

// Format closed fill path string
const formatPath = (c: number[]) =>
  `M 0 ${c[0].toFixed(2)} C ${c[1].toFixed(2)} ${c[2].toFixed(2)}, ${c[3].toFixed(2)} ${c[4].toFixed(2)}, 50 ${c[5].toFixed(2)} C ${c[6].toFixed(2)} ${c[7].toFixed(2)}, ${c[8].toFixed(2)} ${c[9].toFixed(2)}, 100 ${c[10].toFixed(2)} L 100 100 L 0 100 Z`;

// Format open drawing stroke line along the leading wave crest
const formatStrokePath = (c: number[]) =>
  `M 0 ${c[0].toFixed(2)} C ${c[1].toFixed(2)} ${c[2].toFixed(2)}, ${c[3].toFixed(2)} ${c[4].toFixed(2)}, 50 ${c[5].toFixed(2)} C ${c[6].toFixed(2)} ${c[7].toFixed(2)}, ${c[8].toFixed(2)} ${c[9].toFixed(2)}, 100 ${c[10].toFixed(2)}`;

// Smooth cubic ease-in-out with natural drawing acceleration
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const interpolateCoords = (from: number[], to: number[], t: number) =>
  from.map((val, i) => lerp(val, to[i], t));

// Frame-by-frame rAF path animator with dual fill + drawing stroke
const animateSvgPath = (
  pathEl: SVGPathElement,
  strokeEl: SVGPathElement | null,
  from: number[],
  to: number[],
  durationMs: number
): Promise<void> => {
  return new Promise((resolve) => {
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = easeInOutCubic(progress);
      const current = interpolateCoords(from, to, eased);
      pathEl.setAttribute('d', formatPath(current));
      if (strokeEl) {
        strokeEl.setAttribute('d', formatStrokePath(current));
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        resolve();
      }
    };
    requestAnimationFrame(step);
  });
};

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export const DoctorIntroSection: React.FC = React.memo(() => {
  const cardRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const strokeRef = useRef<SVGPathElement>(null);
  const primaryImgRef = useRef<HTMLImageElement>(null);
  const secondaryImgRef = useRef<HTMLImageElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  // References for managing smooth queueing during rapid hover transitions
  const currentModeRef = useRef<'primary' | 'secondary'>('primary');
  const desiredModeRef = useRef<'primary' | 'secondary'>('primary');
  const isAnimatingRef = useRef(false);

  // Initialize SVG paths on mount
  useEffect(() => {
    if (pathRef.current) {
      pathRef.current.setAttribute('d', formatPath(COORDS_START));
      pathRef.current.style.opacity = '0';
    }
    if (strokeRef.current) {
      strokeRef.current.setAttribute('d', formatStrokePath(COORDS_START));
      strokeRef.current.style.opacity = '0';
    }
  }, []);

  // Parallax subtle glide inside the frame
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  const imageY = useTransform(smoothProgress, [0, 1], [-20, 20]);

  // Liquid Wave Cycle: Wipe in (Drawing sweep) -> Swap Image -> Wipe out
  const startWipeCycle = useCallback(async () => {
    if (isAnimatingRef.current) return;
    const pathEl = pathRef.current;
    const strokeEl = strokeRef.current;
    const primaryImg = primaryImgRef.current;
    const secondaryImg = secondaryImgRef.current;
    if (!pathEl || !primaryImg || !secondaryImg) return;

    isAnimatingRef.current = true;

    while (currentModeRef.current !== desiredModeRef.current) {
      pathEl.style.opacity = '1';
      if (strokeEl) strokeEl.style.opacity = '1';

      // Phase 1: Hand-drawn paint stroke sweeps across (Frames 1 -> 2 -> 3 100% blank)
      await animateSvgPath(pathEl, strokeEl, COORDS_START, COORDS_IN_1, 130);
      await animateSvgPath(pathEl, strokeEl, COORDS_IN_1, COORDS_IN_2, 130);
      await animateSvgPath(pathEl, strokeEl, COORDS_IN_2, COORDS_FULL, 110);

      if (strokeEl) strokeEl.style.opacity = '0';

      // Phase 2: Instant swap while fully covered in solid green
      const targetMode = desiredModeRef.current;
      if (targetMode === 'secondary') {
        secondaryImg.style.opacity = '1';
        primaryImg.style.opacity = '0';
      } else {
        primaryImg.style.opacity = '1';
        secondaryImg.style.opacity = '0';
      }
      currentModeRef.current = targetMode;

      // Brief hold at peak coverage (Frame 3 "solid blank")
      await new Promise((r) => setTimeout(r, 40));

      if (strokeEl) strokeEl.style.opacity = '1';

      // Phase 3: Drawing stroke lifts and wipes away downwards, revealing new image (Frame 4 -> Frame 5)
      await animateSvgPath(pathEl, strokeEl, COORDS_FULL, COORDS_OUT_1, 130);
      await animateSvgPath(pathEl, strokeEl, COORDS_OUT_1, COORDS_START, 130);

      pathEl.setAttribute('d', formatPath(COORDS_START));
      pathEl.style.opacity = '0';
      if (strokeEl) {
        strokeEl.setAttribute('d', formatStrokePath(COORDS_START));
        strokeEl.style.opacity = '0';
      }
    }

    isAnimatingRef.current = false;
  }, []);

  const handleMouseEnter = () => {
    desiredModeRef.current = 'secondary';
    startWipeCycle();
  };

  const handleMouseLeave = () => {
    desiredModeRef.current = 'primary';
    startWipeCycle();
  };

  const handleCardClick = () => {
    desiredModeRef.current = currentModeRef.current === 'primary' ? 'secondary' : 'primary';
    startWipeCycle();
  };

  return (
    <section className="doctor-intro-section" aria-label={`${DR_AHALYA_DATA.name} introduction`}>
      <div className="doctor-intro-section__glow" />
      <div className="doctor-intro-section__container">
        {/* Outer media container stays steady with no border/card displacement */}
        <div className="doctor-intro-section__media" ref={cardRef}>
          <div className="doctor-intro-section__shadow-carrier">
            <motion.div
              className="doctor-intro-section__portrait-wrap"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleCardClick}
              role="button"
              tabIndex={0}
              aria-label="Click or hover to reveal consultation preview"
              initial={{ clipPath: 'inset(25% 0% 0% 0% round 32px)', opacity: 0.9 }}
              whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 32px)', opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              onAnimationComplete={() => setIsRevealed(true)}
              style={isRevealed ? { clipPath: 'none' } : undefined}
            >
              {/* Smooth animated image container with zero-rerender dual images */}
              <motion.div
                className="doctor-intro-section__portrait-motion"
                style={{ y: imageY }}
              >
                <img
                  ref={primaryImgRef}
                  src={DR_AHALYA_DATA.image}
                  alt={`${DR_AHALYA_DATA.name} — ${DR_AHALYA_DATA.role}`}
                  className="doctor-intro-section__portrait doctor-intro-section__portrait--primary"
                  loading="eager"
                  decoding="async"
                />
                <img
                  ref={secondaryImgRef}
                  src={consultationImg}
                  alt={`${DR_AHALYA_DATA.name} — Personalized Consultations`}
                  className="doctor-intro-section__portrait doctor-intro-section__portrait--secondary"
                  loading="eager"
                  decoding="async"
                  style={{ opacity: 0 }}
                />
              </motion.div>

              {/* Organic Liquid Wave Wipe Curtain Overlay with Hand-Drawn Stroke Rim */}
              <svg
                className="doctor-intro-section__liquid-wipe-svg"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  id="doctor-liquid-path"
                  ref={pathRef}
                  fill="var(--primary-green, #1B6B50)"
                />
                <path
                  id="doctor-drawing-stroke"
                  ref={strokeRef}
                  fill="none"
                  stroke="rgba(235, 195, 125, 0.95)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>

              <div className="doctor-intro-section__credential">
                <CheckCircle2 size={15} />
                <span>{DR_AHALYA_DATA.degrees}</span>
              </div>
            </motion.div>
          </div>
          <div className="doctor-intro-section__stamp" aria-hidden="true">
            <Leaf size={18} />
            <span>Personalized<br />Ayurvedic Care</span>
          </div>
        </div>

        <motion.div
          className="doctor-intro-section__content"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={revealVariants}
        >
          <div className="doctor-intro-section__eyebrow">
            <Sparkles size={15} />
            <span>Meet your practitioner</span>
          </div>
          <h2 className="doctor-intro-section__title">
            Care that sees the person,<br />not just the symptoms.
          </h2>
          <p className="doctor-intro-section__role">{DR_AHALYA_DATA.role}</p>
          <p className="doctor-intro-section__summary">{DR_AHALYA_DATA.shortIntro}</p>

          <div className="doctor-intro-section__principles">
            <div className="doctor-intro-section__principle">
              <HeartPulse size={18} />
              <span>Personalized consultations</span>
            </div>
            <div className="doctor-intro-section__principle">
              <Leaf size={18} />
              <span>Ayurveda, yoga & meditation</span>
            </div>
          </div>

          <div className="doctor-intro-section__actions">
            <BookAppointmentButton size="md" variant="primary" label="Book a consultation" />
            <Link to={ROUTES.TEAM} className="doctor-intro-section__link">
              <span>Read full profile</span>
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

DoctorIntroSection.displayName = 'DoctorIntroSection';
