import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '@/shared/config/routes';
import { BookAppointmentButton } from '@/features/appointments';
import { ThemeToggle } from '@/shared/ui/ThemeToggle';
import { BrandLogo } from '@/shared/ui/BrandLogo';
import { SearchModal } from './SearchModal';
import { Search, Sparkles, Menu, X } from 'lucide-react';
import './Navbar.css';

export const Navbar: React.FC = React.memo(() => {
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(prev => {
            const isScrolled = window.scrollY > 40;
            return prev !== isScrolled ? isScrolled : prev;
          });
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavAnchor = useCallback((targetId: string) => {
    setIsMobileMenuOpen(false);
    if (location.pathname === ROUTES.HOME) {
      const el = document.querySelector(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.pathname]);

  return (
    <>
      <header className={`navbar-wrapper ${scrolled ? 'scrolled' : 'transparent-top'}`}>
        <nav className="navbar" aria-label="Primary Navigation">
          {/* Brand Logo & Typography */}
          <div className="navbar-brand-section">
            <BrandLogo linkTo={ROUTES.HOME} showDivider={false} size="md" />
          </div>

          {/* Centered Desktop Menu Links matching the reference */}
          <ul className="navbar-links">
            <li>
              <Link
                to={ROUTES.ABOUT}
                onClick={() => handleNavAnchor('#about')}
                className={location.pathname === ROUTES.ABOUT ? 'active-link' : ''}
              >
                Events & Heritage
              </Link>
            </li>
            <li>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavAnchor('#about');
                }}
              >
                Yoga & Meditation
              </a>
            </li>
            <li>
              <a
                href="#healing"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavAnchor('#healing');
                }}
              >
                Healing
              </a>
            </li>
            <li>
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavAnchor('#services');
                }}
              >
                Physiotherapy
              </a>
            </li>
            <li>
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavAnchor('#services');
                }}
              >
                Spa & Rejuvenation
              </a>
            </li>
            <li>
              <Link
                to={ROUTES.DOCTOR}
                className={location.pathname.startsWith('/doctor') ? 'active-link' : ''}
              >
                Doctor Portal
              </Link>
            </li>
          </ul>

          {/* Right Icon Actions matching the reference design */}
          <div className="navbar-actions">
            <button
              type="button"
              className="navbar-icon-btn search-trigger"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search therapies and treatments"
              title="Search therapies and treatments"
            >
              <Search size={19} />
            </button>

            <Link
              to={ROUTES.DOCTOR}
              className="navbar-icon-btn profile-trigger"
              aria-label="Doctor and Patient Sanctuary"
              title="Doctor and Patient Sanctuary"
            >
              <span className="profile-leaf-badge">
                <Sparkles size={14} />
              </span>
            </Link>

            <ThemeToggle />

            <div className="navbar-cta-wrap">
              <BookAppointmentButton size="sm" />
            </div>

            <button
              type="button"
              className="navbar-mobile-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-backdrop" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-menu-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <BrandLogo linkTo={ROUTES.HOME} size="sm" />
              <button
                type="button"
                className="mobile-menu-close"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X size={22} />
              </button>
            </div>

            <div className="mobile-menu-links">
              <Link to={ROUTES.HOME} onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              <a href="#about" onClick={(e) => { e.preventDefault(); handleNavAnchor('#about'); }}>
                Yoga & Meditation
              </a>
              <a href="#healing" onClick={(e) => { e.preventDefault(); handleNavAnchor('#healing'); }}>
                Healing Journey
              </a>
              <a href="#services" onClick={(e) => { e.preventDefault(); handleNavAnchor('#services'); }}>
                Physiotherapy & Panchakarma
              </a>
              <a href="#services" onClick={(e) => { e.preventDefault(); handleNavAnchor('#services'); }}>
                Spa & Herbal Care
              </a>
              <Link to={ROUTES.ABOUT} onClick={() => setIsMobileMenuOpen(false)}>About Our Heritage</Link>
              <Link to={ROUTES.GALLERY} onClick={() => setIsMobileMenuOpen(false)}>Photo Gallery</Link>
              <Link to={ROUTES.DOCTOR} onClick={() => setIsMobileMenuOpen(false)}>Doctor Portal</Link>
            </div>

            <div className="mobile-menu-footer">
              <BookAppointmentButton size="lg" />
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
});

Navbar.displayName = 'Navbar';
