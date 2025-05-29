import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Renders a styled container representing the root of a Card UI element.
 *
 * Combines default card styles with any additional class names and props provided.
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
 * Renders the header section of a card with grid layout and responsive spacing.
 *
 * Additional class names and div props can be provided to customize the header.
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
 * Renders the title section of a card with emphasized font styling.
 *
 * Accepts all standard div props and merges any additional class names with the default styles.
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
 * Renders a card description section with muted text styling.
 *
 * Use within a card layout to display supplementary or descriptive text.
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
 * Renders a container for card action elements, positioned in the card header.
 *
 * @remark
 * The action container is aligned to the top-right of the card header using grid positioning.
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
 * Renders the content section of a card with horizontal padding.
 *
 * Additional props are spread onto the underlying div element.
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
 * Renders the footer section of a card with horizontal padding and vertical centering.
 *
 * Additional class names and div props can be provided to customize the footer.
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
