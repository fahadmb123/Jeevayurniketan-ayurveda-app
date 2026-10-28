import React from 'react';
import { Navbar, Footer } from '@/shared/layout';
import { HeroSection } from '../components/HeroSection';
import { CategoryCirclesRail } from '../components/CategoryCirclesRail';
import { TrustStatsBar } from '../components/TrustStatsBar';
import { AboutSection } from '@/features/about';
import { HealingJourneySection } from '../components/HealingJourneySection';
import { ServicesSection } from '@/features/services';
import { TeamSection, DoctorIntroSection } from '@/features/team';
import { YogaathmaSection, YogaBookingCard } from '@/features/yoga';
import { FAQSection } from '../components/FAQSection';
import './HomePage.css';

export const HomePage: React.FC = React.memo(() => {
  return (
    <main className="home-page">
      <Navbar />
      <HeroSection />
      <CategoryCirclesRail />
      <TrustStatsBar />
      <DoctorIntroSection />
      <ServicesSection />
      <HealingJourneySection />
      <YogaathmaSection />
      <AboutSection />
      <TeamSection />
      <FAQSection />
      <YogaBookingCard />
      <Footer />
    </main>
  );
});

HomePage.displayName = 'HomePage';
