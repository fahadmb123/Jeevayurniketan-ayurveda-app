import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logoPdf from '@/assets/Jeevayurniketan-logo.pdf'; // Assuming Vite alias @ is configured, otherwise relative

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <header className={`navbar-wrapper ${scrolled ? 'scrolled' : ''}`}>
      <nav className="navbar">
        <div className="navbar-logo">
          {/* Embedding PDF directly as an object, with a fallback text */}
          <object data={logoPdf} type="application/pdf" className="logo-pdf">
            <span className="logo-text">Jeevayurniketan</span>
          </object>
        </div>
        
        <ul className="navbar-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#team">Our Team</a></li>
          <li><Link to="/doctor">Doctor Portal</Link></li>
        </ul>
        
        <div className="navbar-actions">
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button className="btn-primary">Book Appointment</button>
        </div>
      </nav>
    </header>
  );
};
