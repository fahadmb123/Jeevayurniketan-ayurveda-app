import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/config/routes';
import { Navbar, Footer } from '@/shared/layout';
import { Button } from '@/shared/ui/button';
import './NotFoundPage.css';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-page">
      <Navbar />

      <main className="not-found-content">
        <span className="not-found-code">404</span>
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-desc">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to={ROUTES.HOME}>
          <Button variant="primary" size="lg">
            Return to Homepage
          </Button>
        </Link>
      </main>

      <Footer />
    </div>
  );
};
