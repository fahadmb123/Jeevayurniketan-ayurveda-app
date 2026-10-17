import React from 'react';
import { Navbar } from '@/widgets/navbar';
import { HeroSection } from '@/widgets/hero-section';
import { AboutSection } from '@/widgets/about-section';
import { ServicesSection } from '@/widgets/services-section';
import { TeamSection } from '@/widgets/team-section';
import { BlogSection } from '@/widgets/blog-section';
import { Footer } from '@/widgets/footer';
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
