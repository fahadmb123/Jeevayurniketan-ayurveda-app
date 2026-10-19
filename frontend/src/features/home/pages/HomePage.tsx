import React from 'react';
import { Navbar, Footer } from '@/shared/layout';
import { HeroSection } from '../components/HeroSection';
import { TrustStatsBar } from '../components/TrustStatsBar';
import { AboutSection } from '@/features/about';
import { HealingJourneySection } from '../components/HealingJourneySection';
import { ServicesSection } from '@/features/services';
import { TeamSection } from '@/features/team';
import { FAQSection } from '../components/FAQSection';
import { BlogSection } from '@/features/blog';
import './HomePage.css';

export const HomePage: React.FC = React.memo(() => {
  return (
    <main className="home-page">
      <Navbar />
      <HeroSection />
      <TrustStatsBar />
      <AboutSection />
      <HealingJourneySection />
      <ServicesSection />
      <TeamSection />
      <FAQSection />
      <BlogSection />
      <Footer />
    </main>
  );
});

HomePage.displayName = 'HomePage';

