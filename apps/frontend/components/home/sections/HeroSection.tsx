import React from "react";
import { Button } from "@/components/ui/button";
import { Spotlight } from "@/components/ui/Spotlight";
import { motion } from "framer-motion";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

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
          Radically better <br />
          <span className="text-primary">uptime monitoring</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8 max-w-2xl text-center text-lg text-gray-300"
        >
          Ship higher-quality software faster. Be the hero of your engineering teams with instant downtime alerts and actionable insights.
        </motion.p>
        {/* Email Input and CTA */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-4 flex w-full max-w-md flex-col items-center gap-4 sm:flex-row"
          onSubmit={e => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Your work e-mail"
            className="flex-1 rounded-lg bg-[#23243a] px-5 py-3 text-white placeholder-gray-400 outline-none ring-1 ring-[#2a2e45] focus:ring-2 focus:ring-primary transition"
          />
          <Button
            size="lg"
            className="bg-primary text-[#181c2a] font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-[#5bb0f7] transition"
            type="submit"
          >
            Start for free
          </Button>
        </motion.form>
        {/* Secondary action */}
        <div className="mb-10 text-center text-sm text-gray-400">
          Start monitoring for free or{" "}
          <a
            href="#"
            className="rounded px-1.5 py-0.5 font-medium text-[#8ecaff] underline underline-offset-2 hover:bg-[#23243a] transition"
          >
            book a demo
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
