import GradientText from "@/components/ui/GradientText";
import { motion } from "framer-motion";
import Link from "next/link";

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.2,
            duration: 0.6,
            ease: [0.25, 0.8, 0.25, 1],
        },
    }),
};

const CtaSection = () => {
    return (
        <section className="relative flex min-h-[70vh] items-center justify-center">
            <div className="relative flex w-full max-w-7xl items-center justify-center overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
                {/* Grid Background */}
                <div
                    className="pointer-events-none absolute top-0 left-1/2 h-2/3 w-full max-w-3xl -translate-x-1/2"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                        backgroundSize: "120px 120px",
                        opacity: 0.25,
                        maskImage:
                            "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
                        WebkitMaskImage:
                            "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
                    }}
                />

                {/* Side SVGs */}
                <SVGLine className="left-0 rotate-x-180 hidden lg:block" />
                <SVGLine className="right-0 hidden lg:block" />

                <div className="relative z-10 flex w-full flex-col items-center text-center">
                    {/* Heading */}
                    <motion.div
                        custom={0}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <GradientText className="from-white to-white/70 mt-4 bg-gradient-to-br bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
                            Start Monitoring Your Website Today
                        </GradientText>
                    </motion.div>

                    {/* Subtext */}
                    <motion.p
                        custom={1}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="mx-auto mt-6 max-w-2xl text-lg text-gray-300 md:text-xl"
                    >
                        Join thousands of teams using our intelligent monitoring
                        to safeguard their uptime and optimize digital
                        experiences.
                    </motion.p>

                    {/* CTA Button */}
                    <motion.div
                        custom={2}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="mt-10"
                    >
                        <Link
                            href="/dashboard"
                            className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-black"
                        >
                            <span className="absolute inset-[-1000%] animate-spin-slow bg-[conic-gradient(from_90deg_at_50%_50%,#CFFFD2_0%,#1E7F37_50%,#CFFFD2_100%)]" />
                            <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-slate-950 px-5 text-sm font-semibold text-white backdrop-blur-2xl">
                                Get Started Now
                            </span>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CtaSection;

const SVGLine = ({ className = "" }: { className?: string }) => (
    <svg
        className={`absolute h-full ${className}`}
        xmlns="http://www.w3.org/2000/svg"
        width="89"
        height="568"
        viewBox="0 0 89 568"
        fill="none"
    >
        <path
            d="M88 0.23938V207.654L1 285.695C1 285.695 1.5 493.945 1 567.813"
            stroke="url(#animation_gradient)"
            pathLength="1"
            strokeDashoffset="0px"
            strokeDasharray="1px 1px"
        />
        <path
            d="M88 0.23938V207.654L1 285.695C1 285.695 1.5 493.945 1 567.813"
            stroke="url(#paint0_linear_right)"
        />
        <defs>
            <linearGradient
                id="animation_gradient"
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="120%"
                x2="0"
                y2="100%"
            >
                <stop stopColor="#2EB9DF" stopOpacity="0" />
                <stop stopColor="#2EB9DF" />
                <stop offset="1" stopColor="#9E00FF" stopOpacity="0" />
            </linearGradient>
            <linearGradient
                id="paint0_linear_right"
                x1="88"
                y1="4.5"
                x2="88"
                y2="568"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#6F6F6F" stopOpacity="0.3" />
                <stop offset="0.8" stopColor="#6F6F6F" />
                <stop offset="1" stopColor="#6F6F6F" stopOpacity="0" />
            </linearGradient>
        </defs>
    </svg>
);
