"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

/**
 * Wraps child components with the NextThemesProvider to enable theme management.
 *
 * Accepts all props supported by NextThemesProvider and passes them through unchanged.
 *
 * @param children - The React nodes to be wrapped by the theme provider.
 */
export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
