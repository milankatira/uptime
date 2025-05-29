import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";

import "../globals.css";
import { SidebarDemo } from "./dashboard/components/Sidebar";

/**
 * Serves as the root layout for the application, providing authentication context, sidebar navigation, and global toast notifications.
 *
 * Wraps the application content with {@link ClerkProvider} for authentication, includes {@link Toaster} for notifications, and uses {@link SidebarDemo} to apply the sidebar layout.
 *
 * @param children - The content to display within the layout.
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
                    <SidebarDemo>{children}</SidebarDemo>
                </body>
            </ClerkProvider>
        </html>
    );
}
