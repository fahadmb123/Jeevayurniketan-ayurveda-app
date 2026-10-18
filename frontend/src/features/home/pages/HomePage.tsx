import React from 'react';
import { Navbar, Footer } from '@/shared/layout';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '@/features/about';
import { ServicesSection } from '@/features/services';
import { TeamSection } from '@/features/team';
import { BlogSection } from '@/features/blog';
import './HomePage.css';

export const HomePage: React.FC = React.memo(() => {
  return (
    <main className="home-page">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <TeamSection />
      <BlogSection />
      <Footer />
    </main>
  );
});

HomePage.displayName = 'HomePage';

