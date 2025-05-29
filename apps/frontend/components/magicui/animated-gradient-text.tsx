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
