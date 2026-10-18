import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '@/shared/config/routes';
import { BookAppointmentButton } from '@/features/appointments';
import { ThemeToggle } from '@/shared/ui/ThemeToggle';
import './Navbar.css';

export const Navbar: React.FC = React.memo(() => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar-wrapper ${scrolled ? 'scrolled' : ''}`}>
      <nav className="navbar">
        <Link to={ROUTES.HOME} className="navbar-logo">
          <img src="/android-chrome-512x512.png" alt="Jeevayurniketan Logo" className="logo-img" />
          <span className="logo-text">Jeevayurniketan</span>
        </Link>
        
        <ul className="navbar-links">
          <li>
            <Link to={ROUTES.HOME} className={location.pathname === ROUTES.HOME ? 'active-link' : ''}>
              Home
            </Link>
          </li>
          <li>
            <Link to={ROUTES.ABOUT} className={location.pathname === ROUTES.ABOUT ? 'active-link' : ''}>
              About Us
            </Link>
          </li>
          <li>
            <Link to={ROUTES.SERVICES} className={location.pathname === ROUTES.SERVICES ? 'active-link' : ''}>
              Services
            </Link>
          </li>
          <li>
            <Link to={ROUTES.TEAM} className={location.pathname === ROUTES.TEAM ? 'active-link' : ''}>
              Our Team
            </Link>
          </li>
          <li>
            <Link to={ROUTES.BLOG} className={location.pathname === ROUTES.BLOG ? 'active-link' : ''}>
              Blog
            </Link>
          </li>
          <li>
            <Link to={ROUTES.CONTACT} className={location.pathname === ROUTES.CONTACT ? 'active-link' : ''}>
              Contact
            </Link>
          </li>
          <li>
            <Link to={ROUTES.DOCTOR} className={location.pathname.startsWith('/doctor') ? 'active-link' : ''}>
              Doctor Portal
            </Link>
          </li>
        </ul>
        
        <div className="navbar-actions">
          <ThemeToggle />
          <BookAppointmentButton size="md" />
        </div>
      </nav>
    </header>
  );
});

Navbar.displayName = 'Navbar';
