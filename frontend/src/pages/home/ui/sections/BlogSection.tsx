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
            className="blog-card group cursor-pointer border border-transparent hover:border-green-500/20 hover:bg-green-50/20 transition-all duration-300 overflow-hidden rounded-2xl" 
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10, scale: 1.02 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            <div className="blog-image-wrapper overflow-hidden relative">
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 z-10"></div>
              <img 
                src={blog.image} 
                alt={blog.title} 
                className="blog-image transform group-hover:scale-110 transition-transform duration-700" 
              />
            </div>
            <div className="blog-content">
              <div className="blog-meta text-sm font-medium">
                <span className="blog-author text-green-700">{blog.author}</span>
                <span className="blog-date text-gray-500">{blog.date}</span>
              </div>
              <h3 className="blog-title group-hover:text-green-700 transition-colors duration-300">{blog.title}</h3>
              <p className="blog-excerpt text-gray-600">{blog.excerpt}</p>
              <button className="btn-read-more group-hover:translate-x-2 transition-transform duration-300">Read More &rarr;</button>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

