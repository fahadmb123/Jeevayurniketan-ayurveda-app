import React from 'react';
import { motion } from 'framer-motion';
import type { BlogPost } from '../types';
import './BlogPostCard.css';

export interface BlogPostCardProps {
  post: BlogPost;
  index: number;
}

export const BlogPostCard: React.FC<BlogPostCardProps> = React.memo(({ post, index }) => {
  return (
    <motion.article
      className="blog-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.12 }}
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

