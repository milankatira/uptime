import { cn } from "@/lib/utils";
import React from "react";

export interface AnimatedGradientTextProps
    extends React.HTMLAttributes<HTMLSpanElement> {
    /** Controls the speed of the gradient animation */
    speed?: number;
    /** Gradient start color */
    colorFrom?: string;
    /** Gradient end color */
    colorTo?: string;
}

/**
 * Displays text with an animated gradient effect, allowing customization of gradient colors and animation speed.
 *
 * The gradient animation is controlled via CSS variables and Tailwind CSS classes, and the effect is applied to the text within a span element.
 *
 * @param speed - Animation speed multiplier for the gradient effect.
 * @param colorFrom - Starting color of the gradient.
 * @param colorTo - Ending color of the gradient.
 * @returns A span element rendering its children with an animated gradient text effect.
 */
export function AnimatedGradientText({
    children,
    className,
    style,
    speed = 1,
    colorFrom = "#ffaa40",
    colorTo = "#9c40ff",
    ...props
}: AnimatedGradientTextProps) {
    // our CSS variables for the animation
    const cssVars = {
        "--bg-size": `${speed * 300}%`,
        "--color-from": colorFrom,
        "--color-to": colorTo,
    } as React.CSSProperties;

    return (
        <span
            {...props}
            style={{ ...cssVars, ...style }}
            className={cn(
                "animate-gradient inline bg-gradient-to-r " +
                    "from-[var(--color-from)] via-[var(--color-to)] to-[var(--color-from)]" +
                    "bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent",
                className,
            )}
        >
            {children}
        </span>
    );
}
