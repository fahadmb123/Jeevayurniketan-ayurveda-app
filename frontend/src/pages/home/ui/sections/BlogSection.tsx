import React from 'react';
import { motion } from 'framer-motion';
import './BlogSection.css';

export const BlogSection: React.FC = () => {
  const blogs = [
    {
      title: 'Science Behind Smriti Meditation',
      author: 'Dr. K.V. Dilipkumar',
      date: 'Aug 12, 2026',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop',
      excerpt: 'It is based on Ayurvedic principles and descriptions in Caraka Samhita. The effects of prajnaparadha may be reflected as disturbances at the psychological level...',
    },
    {
      title: 'Intellectual Error & Psychosomatic Diseases',
      author: 'Dr. K.V. Dilipkumar',
      date: 'Sep 05, 2026',
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=800&auto=format&fit=crop',
      excerpt: 'Web of causation of diseases are well narrated in Ayurveda classics. Intellectual error is identified as a major cause of diseases...',
    },
    {
      title: 'The Modern Epidemiological Scenario',
      author: 'Dr. Muhammed Safeer P I',
      date: 'Sep 21, 2026',
      image: 'https://images.unsplash.com/photo-1511295742362-92c96b124e52?q=80&w=800&auto=format&fit=crop',
      excerpt: 'Until 100 years ago the epidemiological scenario of human diseases was concerned with major killer infectious communicable diseases...',
    }
  ];

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
        {blogs.map((blog, index) => (
          <motion.article 
            className="blog-card" 
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            <div className="blog-image-wrapper">
              <img src={blog.image} alt={blog.title} className="blog-image" />
            </div>
            <div className="blog-content">
              <div className="blog-meta">
                <span className="blog-author">{blog.author}</span>
                <span className="blog-date">{blog.date}</span>
              </div>
              <h3 className="blog-title">{blog.title}</h3>
              <p className="blog-excerpt">{blog.excerpt}</p>
              <button className="btn-read-more">Read More &rarr;</button>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

