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
import ConnectAppsSection from "@/components/home/sections/ConnectAppsSection";

/**
 * Renders the main layout of the web page, including navigation, content sections, and footer.
 *
 * Composes multiple UI sections in a vertical layout to form the complete page structure.
 *
 * @returns The root React element for the application's main page.
 */
function App() {
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
                <ConnectAppsSection /> {/* Add the new component here */}
                <CtaSection />
            </main>
            <Footer />
        </div>
    );
}

export default App;
