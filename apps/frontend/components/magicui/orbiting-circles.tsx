import { cn } from "@/lib/utils";
import React from "react";

export interface OrbitingCirclesProps
    extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    children?: React.ReactNode;
    reverse?: boolean;
    duration?: number;
    delay?: number;
    radius?: number;
    path?: boolean;
    iconSize?: number;
    speed?: number;
}

/**
 * Displays child elements orbiting a central point with customizable animation, layout, and optional SVG orbit path.
 *
 * Each child is evenly distributed around a circular orbit, with animation speed, direction, radius, and icon size controlled via props. An SVG path representing the orbit can be shown or hidden.
 *
 * @returns A React fragment containing the orbiting children and, if enabled, the SVG orbit path.
 */
export function OrbitingCircles({
    className,
    children,
    reverse,
    duration = 20,
    radius = 160,
    path = true,
    iconSize = 30,
    speed = 1,
    ...props
}: OrbitingCirclesProps) {
    const calculatedDuration = duration / speed;
    return (
        <>
            {path && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    className="pointer-events-none absolute inset-0 size-full"
                >
                    <circle
                        className="stroke-black/10 stroke-1 dark:stroke-white/10"
                        cx="50%"
                        cy="50%"
                        r={radius}
                        fill="none"
                    />
                </svg>
            )}
            {React.Children.map(children, (child, index) => {
                const angle = (360 / React.Children.count(children)) * index;
                return (
                    <div
                        style={
                            {
                                "--duration": calculatedDuration,
                                "--radius": radius,
                                "--angle": angle,
                                "--icon-size": `${iconSize}px`,
                            } as React.CSSProperties
                        }
                        className={cn(
                            `absolute flex size-[var(--icon-size)] transform-gpu animate-orbit items-center justify-center rounded-full`,
                            { "[animation-direction:reverse]": reverse },
                            className,
                        )}
                        {...props}
                    >
                        {child}
                    </div>
                );
            })}
        </>
    );
}
