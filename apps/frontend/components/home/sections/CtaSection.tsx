import GradientText from "@/components/ui/GradientText";
import { motion } from "framer-motion";

const CtaSection = () => {
  return (
    <section className="flex min-h-[70vh] items-center justify-center">
      <div className="relative flex min-h-[70vh] w-full max-w-7xl items-center justify-center overflow-hidden py-24">
        {/* Centered Faded Grid Background */}
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
        {/* Right Side SVG */}
        <svg
          className="absolute right-0 hidden h-full lg:block"
          xmlns="http://www.w3.org/2000/svg"
          width="89"
          height="568"
          viewBox="0 0 89 568"
          fill="none"
          style={{}}
        >
          <path
            d="M88 0.23938V207.654L1 285.695C1 285.695 1.5 493.945 1 567.813"
            stroke="url(#animation_gradient)"
            opacity="1"
            pathLength="1"
            strokeDashoffset="0px"
            strokeDasharray="1px 1px"
          ></path>
          <path
            d="M88 0.23938V207.654L1 285.695C1 285.695 1.5 493.945 1 567.813"
            stroke="url(#paint0_linear_right)"
          ></path>
          <defs>
            <linearGradient
              id="animation_gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1="120%"
              x2="0"
              y2="100%"
            >
              <stop stopColor="#2EB9DF" stopOpacity="0"></stop>
              <stop stopColor="#2EB9DF"></stop>
              <stop offset="1" stopColor="#9E00FF" stopOpacity="0"></stop>
            </linearGradient>
            <linearGradient
              id="paint0_linear_right"
              x1="88"
              y1="4.50012"
              x2="88"
              y2="568"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#6F6F6F" stopOpacity="0.3"></stop>
              <stop offset="0.797799" stopColor="#6F6F6F"></stop>
              <stop offset="1" stopColor="#6F6F6F" stopOpacity="0"></stop>
            </linearGradient>
          </defs>
        </svg>
        {/* Left Side SVG */}
        <svg
          className="absolute left-0 hidden h-full rotate-x-180 lg:block"
          xmlns="http://www.w3.org/2000/svg"
          width="89"
          height="568"
          viewBox="0 0 89 568"
          fill="none"
          style={{}}
        >
          <path
            d="M88 0.23938V207.654L1 285.695C1 285.695 1.5 493.945 1 567.813"
            stroke="url(#animation_gradient)"
            opacity="1"
            pathLength="1"
            strokeDashoffset="0px"
            strokeDasharray="1px 1px"
          ></path>
          <path
            d="M88 0.23938V207.654L1 285.695C1 285.695 1.5 493.945 1 567.813"
            stroke="url(#paint0_linear_right)"
          ></path>
          <defs>
            <linearGradient
              id="animation_gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1="120%"
              x2="0"
              y2="100%"
            >
              <stop stopColor="#2EB9DF" stopOpacity="0"></stop>
              <stop stopColor="#2EB9DF"></stop>
              <stop offset="1" stopColor="#9E00FF" stopOpacity="0"></stop>
            </linearGradient>
            <linearGradient
              id="paint0_linear_right"
              x1="88"
              y1="4.50012"
              x2="88"
              y2="568"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#6F6F6F" stopOpacity="0.3"></stop>
              <stop offset="0.797799" stopColor="#6F6F6F"></stop>
              <stop offset="1" stopColor="#6F6F6F" stopOpacity="0"></stop>
            </linearGradient>
          </defs>
        </svg>

        <div className="relative z-10 flex w-full flex-col items-center">
          <GradientText
            className="from-foreground to-foreground/70 mt-4 bg-gradient-to-br bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl"
            element="H1"
          >
            Start Monitoring Your Website Today
          </GradientText>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mb-10 max-w-2xl text-center text-lg text-gray-300 md:text-xl"
          >
            Join thousands of businesses that rely on Uptime.com for
            comprehensive website monitoring and performance tracking.
          </motion.p>

          <button className="focus:ring-slate-00 relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 focus:outline-none">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#CFFFD2_0%,#1E7F37_50%,#CFFFD2_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              Get Started Now
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
