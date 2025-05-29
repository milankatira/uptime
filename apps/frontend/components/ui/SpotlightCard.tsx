import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface SpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    spotlightSize?: number;
}

/**
 * Renders a card component with a dynamic spotlight effect that follows the mouse cursor on hover.
 *
 * The spotlight is a radial gradient centered at the cursor position, fading from a semi-transparent primary color to transparent. The effect is visible only while the card is hovered.
 *
 * @param children - React nodes to display inside the card.
 * @param className - Optional additional CSS classes for the card container.
 * @param spotlightSize - Optional radius of the spotlight effect in pixels. Defaults to 400.
 */
export function SpotlightCard({
    children,
    className = "",
    spotlightSize = 400,
    ...props
}: SpotlightProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const mousePosition = useRef({ x: 0, y: 0 });
    const mouse = useRef({ x: 0, y: 0 });
    const containerSize = useRef({ w: 0, h: 0 });
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (!containerRef.current) return;

        containerSize.current.w = containerRef.current.offsetWidth;
        containerSize.current.h = containerRef.current.offsetHeight;
    }, []);

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const { w, h } = containerSize.current;

        mousePosition.current.x = e.clientX - rect.left;
        mousePosition.current.y = e.clientY - rect.top;

        mouse.current.x = mousePosition.current.x / w - 0.5;
        mouse.current.y = mousePosition.current.y / h - 0.5;

        updateSpotlightStyle();
    };

    const updateSpotlightStyle = () => {
        if (containerRef.current) {
            const spotlight = containerRef.current.querySelector(
                ".spotlight",
            ) as HTMLElement;
            if (spotlight) {
                spotlight.style.background = `radial-gradient(
          circle ${spotlightSize}px at ${mousePosition.current.x}px ${mousePosition.current.y}px,
          hsl(var(--primary) / 20%), 
          transparent
        )`;
            }
        }
    };

    return (
        <div
            ref={containerRef}
            className={cn(
                "border-border bg-card relative overflow-hidden rounded-xl border p-6",
                isHovered && "spotlight-card",
                className,
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseMove={onMouseMove}
            onMouseLeave={() => setIsHovered(false)}
            {...props}
        >
            <div className="relative z-10">{children}</div>
            {isHovered && (
                <div className="spotlight pointer-events-none absolute inset-0 transition duration-300" />
            )}
        </div>
    );
}
