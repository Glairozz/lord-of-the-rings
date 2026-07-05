'use client';

import { useState, useCallback } from 'react';
import { Analytics } from '@vercel/analytics/react';
import LoadingScreen from '@/components/LoadingScreen';
import Navigation from '@/components/Navigation';
import Starfield from '@/components/Starfield';
import ParticleCursor from '@/components/ParticleCursor';
import HeroSection from '@/components/HeroSection';
import BookSection from '@/components/BookSection';
import CharacterSection from '@/components/CharacterSection';
import ThemeAnalysis from '@/components/ThemeAnalysis';
import Footer from '@/components/Footer';

export default function Home() {
  const [loading, setLoading] = useState(true);

  const handleLoadComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <LoadingScreen onComplete={handleLoadComplete} />

      <div
        className={`relative min-h-screen transition-opacity duration-1000 ${
          loading ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ background: 'linear-gradient(135deg, #0d1a29 0%, #1a2f4a 50%, #0d1a29 100%)' }}
      >
        <Starfield />
        <ParticleCursor />
        <Navigation />
        <HeroSection />
        <BookSection />
        <CharacterSection />
        <ThemeAnalysis />
        <Footer />
      </div>

      <Analytics />
    </>
  );
}
