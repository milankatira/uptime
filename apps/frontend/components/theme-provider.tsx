"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

/**
 * Provides theme management to child components using NextThemesProvider.
 *
 * Wraps its children with {@link NextThemesProvider}, forwarding all received props to enable theme switching and theming support.
 *
 * @param children - React nodes to be wrapped by the theme provider.
 */
export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
