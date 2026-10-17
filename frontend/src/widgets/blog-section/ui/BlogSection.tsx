import React from 'react';
import { BLOG_POSTS, BlogPostCard } from '@/entities/blog-post';
import './BlogSection.css';

export const BlogSection: React.FC = () => {
  return (
    <section id="blog" className="blog-section">
      <div className="blog-header text-center">
        <h4 className="section-subtitle">Our Blog</h4>
        <h2 className="section-title">Insights & Articles</h2>
        <p className="blog-subtitle">
          Read about the latest research and thoughts in Ayurvedic Psychotherapy.
        </p>
      </div>

      <div className="blog-grid">
        {BLOG_POSTS.map((post, index) => (
          <BlogPostCard key={post.id} post={post} index={index} />
        ))}
      </div>
    </section>
  );
};
