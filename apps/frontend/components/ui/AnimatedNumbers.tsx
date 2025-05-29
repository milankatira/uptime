import { cn } from "@/lib/utils";
import { animate } from "framer-motion";
import { useEffect, useRef } from "react";

interface AnimatedNumbersProps {
    value: number;
    duration?: number;
    formatValue?: (value: number) => string;
    className?: string;
}

export const AnimatedNumbers = ({
    value,
    duration = 1,
    formatValue = (value) => value.toLocaleString(),
    className,
}: AnimatedNumbersProps) => {
    const nodeRef = useRef<HTMLSpanElement>(null);
    const prevValue = useRef<number>(0);

    useEffect(() => {
        const node = nodeRef.current;
        if (!node) return;

        const controls = animate(prevValue.current, value, {
            duration,
            onUpdate(value) {
                if (node) {
                    node.textContent = formatValue(value);
                }
            },
            ease: "easeOut",
        });

        prevValue.current = value;

        return () => controls.stop();
    }, [value, formatValue, duration]);

    return (
        <span ref={nodeRef} className={cn("tabular-nums", className)}>
            {formatValue(0)}
        </span>
    );
};
