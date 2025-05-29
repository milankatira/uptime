import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";

import "../globals.css";
import { SidebarDemo } from "./dashboard/components/Sidebar";

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
