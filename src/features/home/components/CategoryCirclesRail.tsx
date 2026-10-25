import React from 'react';
import catCircle1 from '@/assets/cat_circle_1.png';
import catCircle2 from '@/assets/cat_circle_2.png';
import catCircle3 from '@/assets/cat_circle_3.png';
import catCircle4 from '@/assets/cat_circle_4.png';
import catCircle5 from '@/assets/cat_circle_5.png';
import catCircle6 from '@/assets/cat_circle_6.png';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES } from '@/shared/config/routes';
import { staggerContainerVariants, fadeUpVariants, standardViewport } from '@/shared/lib/animations';
import './CategoryCirclesRail.css';

interface CategoryItem {
  id: string;
  img: string;
  alt: string;
  link: string;
}

const CATEGORIES: CategoryItem[] = [
  { id: 'supplements', img: catCircle1, alt: 'Herbal capsules and raw turmeric', link: ROUTES.SERVICES },
  { id: 'teas', img: catCircle2, alt: 'Herbal tea in glass cup with chamomile', link: ROUTES.SERVICES },
  { id: 'oils', img: catCircle3, alt: 'Herbal body oils and moisturizing cream', link: ROUTES.SERVICES },
  { id: 'soaps', img: catCircle4, alt: 'Handmade botanical soaps and citrus slices', link: ROUTES.SERVICES },
  { id: 'amla', img: catCircle5, alt: 'Amla gooseberry vitality oil', link: ROUTES.SERVICES },
  { id: 'roots', img: catCircle6, alt: 'Ashwagandha roots and raw botanical dravya', link: ROUTES.SERVICES },
];

export const CategoryCirclesRail: React.FC = React.memo(() => {
  return (
    <section className="exact-circles-section" aria-label="Ayurvedic Healthcare Focus Areas">
      <div className="exact-circles-container">
        <motion.div
          className="exact-circles-row"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={standardViewport}
        >
          {CATEGORIES.map((cat) => (
            <motion.div key={cat.id} variants={fadeUpVariants}>
              <Link to={cat.link} className="exact-circle-item" title={cat.alt}>
                <img
                  src={cat.img}
                  alt={cat.alt}
                  className="exact-circle-img"
                  loading="lazy"
                  decoding="async"
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

CategoryCirclesRail.displayName = 'CategoryCirclesRail';
