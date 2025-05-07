'use client'
import { useEffect } from 'react';
import Navbar from '@/components/home/layout/Navbar';
import Footer from '@/components/home/layout/Footer';
import HeroSection from '@/components/home/sections/HeroSection';
import FeaturesSection from '@/components/home/sections/FeaturesSection';
import UptimeDemo from '@/components/home/sections/UptimeDemo';
import MonitoringSection from '@/components/home/sections/MonitoringSection';
import PricingSection from '@/components/home/sections/PricingSection';
import TestimonialsSection from '@/components/home/sections/TestimonialsSection';
import CtaSection from '@/components/home/sections/CtaSection';
import StatsSection from '@/components/home/sections/StatsSection';






function App() {
  useEffect(() => {
    document.title = 'Uptime.com - Website Monitoring & Performance';
  }, []);

  return (

      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <HeroSection />
          <StatsSection />
          <FeaturesSection />
          <MonitoringSection />
          <UptimeDemo />
          <PricingSection />
          <TestimonialsSection />
          <CtaSection />
        </main>
        <Footer />
      </div>

  );
}

export default App;