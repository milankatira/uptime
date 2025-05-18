"use client";
import Footer from "@/components/home/layout/Footer";
import Navbar from "@/components/home/layout/Navbar";
import CtaSection from "@/components/home/sections/CtaSection";
import FeaturesSection from "@/components/home/sections/FeaturesSection";
import HeroSection from "@/components/home/sections/HeroSection";
import MonitoringSection from "@/components/home/sections/MonitoringSection";
import PricingSection from "@/components/home/sections/PricingSection";
import StatsSection from "@/components/home/sections/StatsSection";
import TestimonialsSection from "@/components/home/sections/TestimonialsSection";
import UptimeDemo from "@/components/home/sections/UptimeDemo";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.title = "Uptime.com - Website Monitoring & Performance";
  }, []);

  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col">
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
