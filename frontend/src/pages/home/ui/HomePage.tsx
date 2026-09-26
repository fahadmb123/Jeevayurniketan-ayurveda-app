import React from 'react';
import { Navbar } from '@/widgets/navbar/ui/Navbar';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { ServicesSection } from './sections/ServicesSection';
import { TeamSection } from './sections/TeamSection';
import { BlogSection } from './sections/BlogSection';
import { Footer } from '@/widgets/footer/ui/Footer';
import './HomePage.css';

export const HomePage: React.FC = () => {
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
};
