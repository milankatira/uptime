import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import "./globals.css";
import { ProgressBarWrapper } from "@/components/progress-bar";
import { constructMetadata } from "@/config";

export const metadata: Metadata = constructMetadata({
    title: "Uptime - Website Monitoring Platform",
    description:
        "Real-time website monitoring with uptime statistics, performance metrics, and instant outage alerts.",
});

/**
 * Root layout component that sets up global providers and theming for the application.
 *
 * Wraps the app with authentication, notification, theming, and progress bar providers, and renders the provided children.
 *
 * @param children - The content to be rendered within the layout.
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
