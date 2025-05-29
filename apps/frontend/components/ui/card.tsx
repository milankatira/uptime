import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Renders the root container for a Card UI element with default styling.
 *
 * Merges base card styles with any additional class names and props.
 */
function Card({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card"
            className={cn(
                "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
                className,
            )}
            {...props}
        />
    );
}

/**
 * Renders the header section of a card using a grid layout with responsive spacing and support for action elements.
 *
 * @remark
 * If a child with `data-slot="card-action"` is present, the header grid automatically adds a column for action placement.
 */
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-header"
            className={cn(
                "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
                className,
            )}
            {...props}
        />
    );
}

/**
 * Displays the card's title with prominent font styling.
 *
 * Accepts all standard div props and merges additional class names with default styles.
 */
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-title"
            className={cn("leading-none font-semibold", className)}
            {...props}
        />
    );
}

/**
 * Renders a descriptive section within a card with muted foreground color and smaller font size.
 *
 * Use to display supplementary or secondary information inside a card layout.
 */
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-description"
            className={cn("text-muted-foreground text-sm", className)}
            {...props}
        />
    );
}

/**
 * Renders a container for action elements in the top-right corner of the card header.
 *
 * @remark
 * Uses grid positioning to align its content to the top-right of the header area.
 */
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-action"
            className={cn(
                "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
                className,
            )}
            {...props}
        />
    );
}

/**
 * Renders the main content area of a card with horizontal padding.
 *
 * Spreads additional props onto the underlying div element.
 */
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-content"
            className={cn("px-6", className)}
            {...props}
        />
    );
}

/**
 * Renders the footer section of a card with horizontal padding and vertically centered content.
 *
 * Applies extra top padding if a top border is present. Accepts additional class names and div props for customization.
 */
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-footer"
            className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
            {...props}
        />
    );
}

export {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
};
