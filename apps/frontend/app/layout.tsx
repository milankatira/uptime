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
 * Root layout component that sets up global providers and UI elements for the application.
 *
 * Wraps all pages with authentication, theme management, toast notifications, and a progress bar.
 *
 * @param children - The page content to render within the layout.
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
