import React from 'react';
import { motion, type Variants } from 'framer-motion';
import type { BlogPost } from '../types';
import './BlogPostCard.css';

export interface BlogPostCardProps {
  post: BlogPost;
  index: number;
}

const cardVariants: Variants = {
  hidden: ({ direction }: { direction: number; delay: number }) => ({
    opacity: 0,
    x: direction * 72,
    y: 22,
    scale: 0.97,
  }),
  visible: ({ delay }: { direction: number; delay: number }) => ({
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.72,
      ease: [0.16, 1, 0.3, 1],
      delay,
    },
  }),
};

export const BlogPostCard: React.FC<BlogPostCardProps> = React.memo(({ post, index }) => {
  const direction = index % 3 === 0 ? -1 : index % 3 === 1 ? 1 : 0;

  return (
    <motion.article
      className="blog-card"
      custom={{ direction, delay: index * 0.12 }}
      initial="hidden"
      whileInView="visible"
      whileHover={{ y: -8, scale: 1.015 }}
      variants={cardVariants}
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="blog-card__image-wrapper">
        <img src={post.image} alt={post.title} className="blog-card__image" />
      </div>
      <div className="blog-card__content">
        <div className="blog-card__meta">
          <span className="blog-card__author">{post.author}</span>
          <span className="blog-card__dot">•</span>
          <span className="blog-card__date">{post.date}</span>
        </div>
        <h3 className="blog-card__title">{post.title}</h3>
        <p className="blog-card__excerpt">{post.excerpt}</p>
        <button className="blog-card__btn">Read Article &rarr;</button>
      </div>
    </motion.article>
  );
});

BlogPostCard.displayName = 'BlogPostCard';
