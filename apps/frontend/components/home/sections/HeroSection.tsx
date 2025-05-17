import React from "react";
import { Spotlight } from "@/components/ui/Spotlight";
import { motion } from "framer-motion";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import GradientText from "@/components/ui/GradientText";

const HeroSection = () => {
  return (
    <section className="relative flex items-start pt-40 justify-center overflow-hidden py-20 ">
      {/* Optional: Spotlight or background effect */}
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="white" />
      {/* Optional: Overlay grid or pattern */}
      <div className="background-grid absolute inset-0 -z-10 opacity-[0.04]" />
      {/* Optional: Subtle overlays */}

      <div className="container mx-auto px-4 flex flex-col items-center justify-center">


        <div className="group relative mx-auto flex items-center justify-center rounded-full px-6 py-2 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f] space-x-3">
          <span
            className={cn(
              "absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]",
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
            <span role="img" aria-label="celebration" className="text-lg">🎉</span>
            <span className="font-medium text-sm text-white">
              <span className="text-[#ffaa40]">Get instant alerts, advanced analytics, and more.</span>
            </span>
            <ChevronRight
              className="ml-1 size-4 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5"
            />
          </span>
        </div>



        {/* Logo or Brand */}
        <div className="my-8 flex items-center justify-center text-4xl font-extrabold gap-2">
          <ShieldCheck className="text-primary" />    Uptime
        </div>
        {/* Main Heading */}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-4 text-center text-5xl font-extrabold tracking-tight text-white lg:text-8xl"
        >
          <GradientText
            className='mt-4 bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl'
            element='H1'
          >

            Radically better <br />
          </GradientText>
            <span className="text-primary">uptime monitoring</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8 max-w-2xl text-center text-lg text-gray-300"
        >
          Ship higher-quality software faster. Be the hero of your engineering teams with instant downtime alerts and actionable insights.
        </motion.p>

        <a className="px-4 py-2 text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 border-white border-[0.6px] border-solid [border-image-source:linear-gradient(180deg,#1F1F1F_0%,#858585_100%),linear-gradient(180deg,#1F1F1F_0%,#858585_100%)] [background:linear-gradient(0deg,#151515,#151515),linear-gradient(180deg,rgba(21,21,21,0)_66.3%,rgba(255,255,255,0.5)_100%),linear-gradient(183.22deg,rgba(255,255,255,0.5)_2.62%,rgba(21,21,21,0)_52.03%)] shadow-[inset_0px_6px_8px_0px_#FAFAFA40,inset_0px_-6px_8px_0px_#FAFAFA40,0px_0px_0px_0px_#FAFAFA40,0px_0px_0px_0px_#FAFAFA40] text-white 0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08), w-full sm:w-40 h-12 rounded-full flex items-center justify-center" href="/login">Get Started</a>
      </div>
    </section>
  );
};

export default HeroSection;
