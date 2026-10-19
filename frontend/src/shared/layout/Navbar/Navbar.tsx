import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '@/shared/config/routes';
import { ThemeToggle } from '@/shared/ui/ThemeToggle';
import { SearchModal } from './SearchModal';
import { Search, Menu, X, User, ShoppingBag, ChevronDown } from 'lucide-react';
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
            const isScrolled = window.scrollY > 30;
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

  return (
    <>
      <header className={`navbar-wrapper ${scrolled ? 'scrolled' : 'transparent-top'}`}>
        <nav className="navbar" aria-label="Primary Navigation">
          {/* Exact Ayuva Brand Logo matching screenshot */}
          <div className="navbar-brand-section">
            <Link to={ROUTES.HOME} className="ayuva-brand-header-link" title="Ayuva - Natural Wellness">
              <svg className="ayuva-brand-svg-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C10.5 4.5 10.5 7.5 12 10C13.5 7.5 13.5 4.5 12 2ZM22 12C19.5 10.5 16.5 10.5 14 12C16.5 13.5 19.5 13.5 22 12ZM12 22C13.5 19.5 13.5 16.5 12 14C10.5 16.5 10.5 19.5 12 22ZM2 12C4.5 13.5 7.5 13.5 10 12C7.5 10.5 4.5 10.5 2 12ZM12 11C11.45 11 11 11.45 11 12C11 12.55 11.45 13 12 13C12.55 13 13 12.55 13 12C13 11.45 12.55 11 12 11Z" />
              </svg>
              <span className="ayuva-brand-title">Ayuva</span>
            </Link>
          </div>

          {/* Centered Desktop Menu Links matching the reference */}
          <ul className="navbar-links">
            <li>
              <Link to={ROUTES.HOME} className={location.pathname === ROUTES.HOME ? 'active-link' : ''}>
                Home
              </Link>
            </li>
            <li className="navbar-dropdown-link">
              <Link to={ROUTES.SERVICES}>
                <span>Shop</span>
                <ChevronDown size={14} className="dropdown-caret" />
              </Link>
            </li>
            <li>
              <Link to={ROUTES.SERVICES} className={location.pathname === ROUTES.SERVICES ? 'active-link' : ''}>
                Services
              </Link>
            </li>
            <li>
              <Link to={ROUTES.CONTACT} className={location.pathname === ROUTES.CONTACT ? 'active-link' : ''}>
                Contact Us
              </Link>
            </li>
            <li className="navbar-dropdown-link">
              <Link to={ROUTES.ABOUT} className={location.pathname === ROUTES.ABOUT ? 'active-link' : ''}>
                <span>Pages</span>
                <ChevronDown size={14} className="dropdown-caret" />
              </Link>
            </li>
          </ul>

          {/* Right Icon Actions matching the reference design */}
          <div className="navbar-actions">
            {/* Desktop Search Pill */}
            <button
              type="button"
              className="navbar-search-pill"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search products, pages, blog"
            >
              <Search size={15} className="search-pill-icon" />
              <span className="search-pill-text">Search products, pages, blog</span>
            </button>

            {/* Mobile Icon Button */}
            <button
              type="button"
              className="navbar-icon-btn search-trigger-mobile"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search products"
              title="Search products"
            >
              <Search size={18} />
            </button>

            {/* User Profile */}
            <Link
              to={ROUTES.DOCTOR}
              className="navbar-icon-btn profile-trigger"
              aria-label="User Account"
              title="User Account"
            >
              <User size={19} />
            </Link>

            {/* Cart with green circle badge 0 */}
            <Link
              to={ROUTES.SERVICES}
              className="navbar-icon-btn cart-trigger"
              aria-label="Shopping Cart"
              title="Shopping Cart (0 items)"
            >
              <ShoppingBag size={19} />
              <span className="cart-badge-count">0</span>
            </Link>

            <ThemeToggle />

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
              <span className="ayuva-brand-title">Ayuva</span>
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
              <Link to={ROUTES.SERVICES} onClick={() => setIsMobileMenuOpen(false)}>Shop Products</Link>
              <Link to={ROUTES.SERVICES} onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
              <Link to={ROUTES.CONTACT} onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
              <Link to={ROUTES.ABOUT} onClick={() => setIsMobileMenuOpen(false)}>Pages & Heritage</Link>
              <Link to={ROUTES.DOCTOR} onClick={() => setIsMobileMenuOpen(false)}>Doctor Portal</Link>
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
