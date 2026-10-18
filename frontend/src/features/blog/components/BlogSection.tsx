import React from 'react';
import { BlogPostCard } from './BlogPostCard';
import { useBlogPosts } from '../hooks/useBlogPosts';
import './BlogSection.css';

export const BlogSection: React.FC = React.memo(() => {
  const { posts } = useBlogPosts();

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
        {posts.map((post, index) => (
          <BlogPostCard key={post.id} post={post} index={index} />
        ))}
      </div>
    </section>
  );
});

BlogSection.displayName = 'BlogSection';

