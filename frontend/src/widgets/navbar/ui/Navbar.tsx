import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar-wrapper ${scrolled ? 'scrolled' : ''}`}>
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          <img src="/android-chrome-512x512.png" alt="Jeevayurniketan Logo" className="logo-img" />
          <span className="logo-text">Jeevayurniketan</span>
        </Link>
        
        <ul className="navbar-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#team">Our Team</a></li>
          <li><Link to="/doctor">Doctor Portal</Link></li>
        </ul>
        
        <div className="navbar-actions">
          <button className="btn-primary">Book Appointment</button>
        </div>
      </nav>
    </header>
  );
};
