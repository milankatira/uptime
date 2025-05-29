import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import "./globals.css";
import { ProgressBarWrapper } from "@/components/progress-bar";
import { constructMetadata } from "@/config";

export const metadata: Metadata =
    constructMetadata({
        title: "Uptime.com - Website Monitoring Platform",
        description: "Real-time website monitoring with uptime statistics, performance metrics, and instant outage alerts."
    });

/**
 * Provides the root layout for the application, configuring global authentication, theming, toast notifications, and a progress bar.
 *
 * Wraps all page content with shared providers and UI elements to ensure consistent behavior and appearance across the app.
 *
 * @param children - The content to render within the layout.
 */
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <ClerkProvider>
                <body>
                    <Toaster />
                    <ThemeProvider defaultTheme="dark" attribute="class">
                        <ProgressBarWrapper />
                        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                        {/* @ts-ignore */}
                        {children}
                    </ThemeProvider>
                </body>
            </ClerkProvider>
        </html>
    );
}
