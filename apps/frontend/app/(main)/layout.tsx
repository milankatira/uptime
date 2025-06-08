import { Toaster } from "@/components/ui/sonner";
import { SidebarDemo } from "./dashboard/components/Sidebar";

/**
 * Provides the root layout structure for the application, including authentication context, sidebar navigation, and global notifications.
 *
 * Wraps the application content with {@link ClerkProvider} for authentication, displays toast notifications via {@link Toaster}, and applies the sidebar layout using {@link SidebarDemo}.
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
            <Toaster />
            <SidebarDemo>{children}</SidebarDemo>
        </html>
    );
}
