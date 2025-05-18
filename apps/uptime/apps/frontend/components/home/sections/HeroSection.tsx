import GradientText from "@/components/ui/GradientText";
import { Spotlight } from "@/components/ui/Spotlight";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronRight, ShieldCheck } from "lucide-react";
import React from "react";

const HeroSection = () => {
  return (
    <section className="relative flex items-start justify-center overflow-hidden py-20 pt-40">
      {/* Optional: Spotlight or background effect */}
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />
      {/* Optional: Overlay grid or pattern */}
      <div className="background-grid absolute inset-0 -z-10 opacity-[0.04]" />
      {/* Optional: Subtle overlays */}

      <div className="container mx-auto flex flex-col items-center justify-center px-4">
        <div className="group relative mx-auto flex items-center justify-center space-x-3 rounded-full px-6 py-2 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f]">
          <span
            className={cn(
              "animate-gradient absolute inset-0 block h-full w-full rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]",
            )}
            style={{
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "destination-out",
              mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              maskComposite: "subtract",
              WebkitClipPath: "padding-box",
            }}
          />
          <span className="relative z-10 flex items-center gap-2">
            <span role="img" aria-label="celebration" className="text-lg">
              🎉
            </span>
            <span className="text-sm font-medium text-white">
              <span className="text-[#ffaa40]">
                Get instant alerts, advanced analytics, and more.
              </span>
            </span>
            <ChevronRight className="ml-1 size-4 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </span>
        </div>

        {/* Logo or Brand */}
        <div className="my-8 flex items-center justify-center gap-2 text-4xl font-extrabold">
          <ShieldCheck className="text-primary" /> Uptime
        </div>
        {/* Main Heading */}


        <GradientText
          className="from-foreground to-foreground/70 mt-4 bg-gradient-to-br bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl"
          element="H1"
        >
          Radically better <br />
        </GradientText>
        <span className="text-primary">uptime monitoring</span>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8 max-w-2xl text-center text-lg text-gray-300"
        >
          Ship higher-quality software faster. Be the hero of your engineering
          teams with instant downtime alerts and actionable insights.
        </motion.p>

        <a
          className="0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08), relative flex h-12 w-full cursor-pointer items-center justify-center rounded-full border-[0.6px] border-solid border-white px-4 py-2 text-sm font-bold text-white shadow-[inset_0px_6px_8px_0px_#FAFAFA40,inset_0px_-6px_8px_0px_#FAFAFA40,0px_0px_0px_0px_#FAFAFA40,0px_0px_0px_0px_#FAFAFA40] transition duration-200 [background:linear-gradient(0deg,#151515,#151515),linear-gradient(180deg,rgba(21,21,21,0)_66.3%,rgba(255,255,255,0.5)_100%),linear-gradient(183.22deg,rgba(255,255,255,0.5)_2.62%,rgba(21,21,21,0)_52.03%)] [border-image-source:linear-gradient(180deg,#1F1F1F_0%,#858585_100%),linear-gradient(180deg,#1F1F1F_0%,#858585_100%)] hover:-translate-y-0.5 sm:w-40"
          href="/login"
        >
          Get Started
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
