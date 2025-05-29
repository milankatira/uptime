import { HTMLMotionProps, motion } from "framer-motion";
import React from "react";

type AnimatedCardProps = HTMLMotionProps<"div"> & {
    /** Hover scale factor */
    scale?: number;
    /** Hover rotation in degrees */
    rotate?: number;
    /** Hover translation on X axis (px) */
    translateX?: number;
    /** Hover translation on Y axis (px) */
    translateY?: number;
};

export const AnimatedCard = ({
    children,
    className,
    scale = 1.05,
    rotate = 0,
    translateX = 0,
    translateY = 0,
    ...props
}: AnimatedCardProps) => (
    <motion.div
        className={className}
        whileHover={{
            scale,
            rotate,
            x: translateX,
            y: translateY,
            transition: { duration: 0.3, ease: "easeOut" },
        }}
        {...props}
    >
        {children}
    </motion.div>
);
