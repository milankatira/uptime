"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import React, { useCallback, useEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface MagicCardProps {
    children?: React.ReactNode;
    className?: string;
    gradientSize?: number;
    gradientColor?: string;
    gradientOpacity?: number;
    gradientFrom?: string;
    gradientTo?: string;
}

/**
 * Renders a card component with a dynamic radial gradient background that follows the mouse cursor.
 *
 * The gradient's size, colors, and opacity can be customized via props. The background gradient animates smoothly based on mouse movement over the card, creating an interactive visual effect.
 *
 * @param children - Content to display inside the card.
 * @param className - Additional CSS classes for the card container.
 * @param gradientSize - Radius of the radial gradient in pixels. Defaults to 200.
 * @param gradientColor - Optional override for the gradient color. If not provided, uses a theme-based default.
 * @param gradientOpacity - Opacity of the gradient overlay. Defaults to 0.8.
 * @param gradientFrom - Starting color of the background gradient. Defaults to "#9E7AFF".
 * @param gradientTo - Ending color of the background gradient. Defaults to "#FE8BBB".
 *
 * @remark
 * The gradient color defaults to "#262626" in dark mode and "#f3f3f3" in light mode if {@link gradientColor} is not specified.
 */
export function MagicCard({
    children,
    className,
    gradientSize = 200,
    gradientColor,
    gradientOpacity = 0.8,
    gradientFrom = "#9E7AFF",
    gradientTo = "#FE8BBB",
}: MagicCardProps) {
    const { theme } = useTheme();
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(-gradientSize);
    const mouseY = useMotionValue(-gradientSize);

    // Set gradientColor based on theme if not provided
    const resolvedGradientColor =
        gradientColor ?? (theme === "dark" ? "#262626" : "#f3f3f3");

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            if (cardRef.current) {
                const { left, top } = cardRef.current.getBoundingClientRect();
                const clientX = e.clientX;
                const clientY = e.clientY;
                mouseX.set(clientX - left);
                mouseY.set(clientY - top);
            }
        },
        [mouseX, mouseY],
    );

    const handleMouseOut = useCallback(
        (e: MouseEvent) => {
            if (!e.relatedTarget) {
                document.removeEventListener("mousemove", handleMouseMove);
                mouseX.set(-gradientSize);
                mouseY.set(-gradientSize);
            }
        },
        [handleMouseMove, mouseX, gradientSize, mouseY],
    );

    const handleMouseEnter = useCallback(() => {
        document.addEventListener("mousemove", handleMouseMove);
        mouseX.set(-gradientSize);
        mouseY.set(-gradientSize);
    }, [handleMouseMove, mouseX, gradientSize, mouseY]);

    useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseout", handleMouseOut);
        document.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseout", handleMouseOut);
            document.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, [handleMouseEnter, handleMouseMove, handleMouseOut]);

    useEffect(() => {
        mouseX.set(-gradientSize);
        mouseY.set(-gradientSize);
    }, [gradientSize, mouseX, mouseY]);

    return (
        <div
            ref={cardRef}
            className={cn("group relative rounded-[inherit]", className)}
        >
            <motion.div
                className="bg-border pointer-events-none absolute inset-0 rounded-[inherit] duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
          radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
          ${gradientFrom},
          ${gradientTo},
          var(--border) 100%
          )
          `,
                }}
            />
            <div className="bg-background absolute inset-px rounded-[inherit]" />
            <motion.div
                className="pointer-events-none absolute inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${resolvedGradientColor}, transparent 100%)
          `,
                    opacity: gradientOpacity,
                }}
            />
            <div className="relative">{children}</div>
        </div>
    );
}
