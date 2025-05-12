import { cn } from "@/lib/utils";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
  }, []);

  const y1 = useTransform(scrollYProgress, [0, 0.8], [50, svgHeight - 50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, svgHeight - 50]);

  const pathLength = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.1, 0.5, 0.9],
  );

  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const radius = useTransform(smoothVelocity, [-0.5, 0, 0.5], [0, 25, 0]);

  return (
    <motion.div ref={ref} className={cn("relative mb-[100vh]", className)}>
      <div className="absolute top-3 -left-4 md:-left-20">
        <motion.div
          transition={{
            duration: 0.2,
          }}
          className="relative h-full"
        >
          <svg
            width="40"
            viewBox="0 0 40 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full"
            style={{ height: svgHeight }}
          >
            <motion.path
              d={`M20 0L20 ${svgHeight}`}
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeDasharray="10 5"
              className="opacity-30"
            />
            <motion.path
              d={`M20 0L20 ${svgHeight}`}
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ pathLength }}
              className="relative z-10"
            />
            <motion.circle
              cx="20"
              cy={y1}
              r="6"
              fill="hsl(var(--background))"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              className="relative z-20"
            />
          </svg>
        </motion.div>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};
