import GradientText from "@/components/ui/GradientText";
import { Spotlight } from "@/components/ui/Spotlight";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import React from "react";

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.2,
        },
    },
};

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.8, 0.25, 1],
        },
    },
};

const HeroSection = () => {
    return (
        <section className="relative isolate flex items-start justify-center overflow-hidden py-24 pt-40 sm:pt-48">
            {/* Spotlight Background */}
            <Spotlight
                className="-top-40 left-0 md:-top-20 md:left-60"
                fill="white"
            />
            <div className="background-grid pointer-events-none absolute inset-0 -z-10 opacity-[0.04]" />

            {/* Motion container for sync */}
            <motion.div
                className="container mx-auto flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8"
                initial="hidden"
                animate="show"
                variants={containerVariants}
            >
                {/* 🎉 Promo badge */}
                <motion.div
                    variants={fadeInUp}
                    className="group relative mx-auto mb-8 flex items-center justify-center space-x-3 rounded-full bg-black/20 px-6 py-2 shadow-[inset_0_-8px_10px_#8fdfff1f] hover:shadow-[inset_0_-5px_10px_#8fdfff3f] transition-shadow duration-500 ease-out backdrop-blur-sm"
                >
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
                    <span className="relative z-10 flex items-center gap-2 text-xs font-medium text-white">
                        <span
                            role="img"
                            aria-label="Celebration"
                            className="text-lg"
                        >
                            🎉
                        </span>
                        <span className="text-[#ffaa40]">
                            Real-time alerts & intelligent monitoring.
                        </span>
                        <ChevronRight className="ml-1 size-4 stroke-neutral-500 group-hover:translate-x-1 transition-transform duration-300 ease-in-out" />
                    </span>
                </motion.div>

                {/* 🧠 Headline */}
                <motion.div variants={fadeInUp}>
                    <GradientText className="from-white to-white/70 text-center bg-gradient-to-br bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-6xl md:text-7xl">
                        Master Your <br />
                        <span className="text-primary">Digital Uptime</span>
                    </GradientText>
                </motion.div>

                <motion.p
                    variants={fadeInUp}
                    className="mt-6 mb-10 max-w-2xl text-center text-lg text-gray-400 sm:text-xl"
                >
                    Ensure every service you run is rock-solid. Get instant
                    alerts, deep performance insights, and bulletproof
                    integrations — all in one beautifully simple dashboard.
                </motion.p>

                <SignedOut>
                    <SignInButton>
                        <motion.button
                            variants={fadeInUp}
                            whileHover={{ scale: 1.03 }}
                            className="inline-flex h-12 w-full max-w-[200px] items-center justify-center rounded-full border border-white/10 bg-gradient-to-b from-neutral-900 to-neutral-800 px-6 py-3 text-sm font-semibold text-white shadow-[inset_0_6px_8px_#fafafa40,inset_0_-6px_8px_#fafafa40] transition duration-200 hover:-translate-y-0.5 focus:outline-none sm:w-auto"
                        >
                            Get Started
                        </motion.button>
                    </SignInButton>
                </SignedOut>

                <SignedIn>
                    <motion.a
                        variants={fadeInUp}
                        whileHover={{ scale: 1.03 }}
                        href="/dashboard"
                        className="inline-flex h-12 w-full max-w-[200px] items-center justify-center rounded-full border border-white/10 bg-gradient-to-b from-neutral-900 to-neutral-800 px-6 py-3 text-sm font-semibold text-white shadow-[inset_0_6px_8px_#fafafa40,inset_0_-6px_8px_#fafafa40] transition duration-200 hover:-translate-y-0.5 focus:outline-none sm:w-auto"
                    >
                        Go to Dashboard
                    </motion.a>
                </SignedIn>
            </motion.div>
        </section>
    );
};

export default HeroSection;
