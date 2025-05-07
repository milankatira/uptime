import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  scale?: number;
  rotate?: number;
  translateX?: number;
  translateY?: number;
}

export const AnimatedCard = ({
  children,
  className,
  scale = 1.05,
  rotate = 2,
  translateX = 5,
  translateY = 5,
  ...props
}: AnimatedCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative overflow-hidden rounded-xl border border-border bg-background p-6",
        className
      )}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        scale,
        zIndex: 10,
        boxShadow: "0 30px 60px -12px rgba(50, 50, 93, 0.25), 0 18px 36px -18px rgba(0, 0, 0, 0.3)",
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      {...props}
    >
      <div className="pointer-events-none absolute -inset-0.5 opacity-0 transition duration-300 group-hover:opacity-100" />

      {children}

      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 backdrop-blur-sm transition-opacity duration-300 hover:opacity-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
};