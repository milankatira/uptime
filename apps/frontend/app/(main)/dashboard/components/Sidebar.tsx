"use client";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { useNotifications } from "@/hooks/useNotifications";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { IconAlertCircle, IconApi, IconHeartbeat } from "@tabler/icons-react";
import {
    LayoutDashboard,
    Radio,
    Settings,
    ShieldCheck,
    Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import React, { useState } from "react";

export function SidebarDemo({ children }: { children: React.ReactNode }) {
    const links = [
        {
            label: "Dashboard",
            href: "/dashboard",
            icon: (
                <LayoutDashboard className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Incidents",
            href: "/incidents",
            icon: (
                <IconAlertCircle className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Status Page",
            href: "/status-page",
            icon: (
                <Radio className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Team Members",
            href: "/team-members",
            icon: (
                <Users className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Integrations & API",
            href: "/integrations-api",
            icon: (
                <IconApi className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Heartbeats",
            href: "/heartbeats",
            icon: (
                <IconHeartbeat className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
        {
            label: "Settings",
            href: "/settings",
            icon: (
                <Settings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
            ),
        },
    ];
    const [open, setOpen] = useState(false);

    const { theme } = useTheme();

    useNotifications();
    return (
        <div
            className={cn(
                "bg-accent mx-auto flex w-screen flex-1 flex-col overflow-hidden rounded-md border border-neutral-200 md:flex-row dark:border-neutral-700",
                "h-screen",
            )}
        >
            <Sidebar open={open} setOpen={setOpen} animate={false}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
                        <>
                            <Logo />
                        </>
                        <div className="mt-8 flex flex-col gap-2">
                            <OrganizationSwitcher
                                appearance={{
                                    baseTheme:
                                        theme === "dark" ? dark : undefined,
                                    elements: {
                                        rootBox: "w-full",
                                        organizationSwitcherTrigger:
                                            "w-full justify-between",
                                    },
                                }}
                            />
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                    </div>

                    <UserButton
                        appearance={{
                            baseTheme: theme === "dark" ? dark : undefined,
                        }}
                    />
                </SidebarBody>
            </Sidebar>
            {children}
        </div>
    );
}
export const Logo = () => {
    return (
        <a
            href="#"
            className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
        >
            <ShieldCheck className="text-primary" />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium whitespace-pre text-black dark:text-white"
            >
                Uptime
            </motion.span>
        </a>
    );
};
export const LogoIcon = () => {
    return (
        <a
            href="#"
            className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
        >
            <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
        </a>
    );
};
