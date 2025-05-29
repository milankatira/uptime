"use client";
import { useWebsites } from "@/hooks/useWebsites";
import { CreateOrganization, useAuth, useUser } from "@clerk/nextjs";
import { Activity, AlertTriangle, Globe, Plus, XCircle } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { CreateWebsiteModal } from "./components/CreateWebsiteModal";
import { WebsiteCard } from "./components/WebsiteCard"; // Import WebsiteCard from the new file

import { Button } from "@/components/ui/button";
import { useAxiosInstance } from "@/lib/axiosInstance";

import axios from "axios";
import { API_BACKEND_URL } from "@/config";

type UptimeStatus = "good" | "bad" | "unknown";

interface ProcessedWebsite {
    id: string;
    url: string;
    status: UptimeStatus;
    uptimePercentage: number;
    lastChecked: string;
    uptimeTicks: UptimeStatus[];
    interval: number;
}

/**
 * Renders animated placeholder cards to indicate that website data is currently loading.
 */

function LoadingSpinner() {
    return (
        <div className="w-full space-y-6">
            <div className="flex w-full flex-col gap-4">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="animate-pulse rounded-xl border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800"
                    >
                        <div className="flex items-center">
                            <div className="mr-4 h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                            <div>
                                <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700 mb-2"></div>
                                <div className="h-6 w-16 rounded bg-gray-200 dark:bg-gray-700"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/**
 * Renders an error message with a retry button for user-initiated error recovery.
 *
 * @param message - The error message to display to the user.
 * @param onRetry - Function called when the user clicks the retry button.
 */
function ErrorMessage({
    message,
    onRetry,
}: {
    message: string;
    onRetry: () => void;
}) {
    return (
        <div className="my-6 rounded-xl border border-rose-200 bg-rose-50 p-4 text-center dark:border-rose-800 dark:bg-rose-900/20">
            <XCircle className="mx-auto mb-2 h-10 w-10 text-rose-500 dark:text-rose-400" />
            <p className="mb-3 text-rose-700 dark:text-rose-300">{message}</p>
            <button
                onClick={onRetry}
                className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600"
            >
                Try Again
            </button>
        </div>
    );
}

/**
 * Displays a summary of monitored websites, including total count, average uptime percentage, and the number of sites by status.
 *
 * @param websites - The list of processed websites to summarize.
 */
function DashboardSummary({ websites }: { websites: ProcessedWebsite[] }) {
    const stats = useMemo(() => {
        const totalSites = websites.length;
        const sitesByStatus = {
            good: websites.filter((site) => site.status === "good").length,
            bad: websites.filter((site) => site.status === "bad").length,
            unknown: websites.filter((site) => site.status === "unknown")
                .length,
        };

        const averageUptime =
            websites.length > 0
                ? websites.reduce(
                      (sum, site) => sum + site.uptimePercentage,
                      0,
                  ) / websites.length
                : 0;

        return { totalSites, sitesByStatus, averageUptime };
    }, [websites]);

    return (
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-center">
                    <div className="mr-4 rounded-full bg-green-100 p-3 dark:bg-green-900/30">
                        <Globe className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Total Websites
                        </p>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {stats.totalSites}
                        </h3>
                    </div>
                </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-center">
                    <div className="mr-4 rounded-full bg-emerald-100 p-3 dark:bg-emerald-900/30">
                        <Activity className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Average Uptime
                        </p>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {stats.averageUptime.toFixed(1)}%
                        </h3>
                    </div>
                </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-center">
                    <div className="mr-4 rounded-full bg-amber-100 p-3 dark:bg-amber-900/30">
                        <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Site Status
                        </p>
                        <div className="mt-1 flex space-x-2">
                            <div className="flex items-center">
                                <div className="mr-1 h-2 w-2 rounded-full bg-emerald-500"></div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {stats.sitesByStatus.good}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <div className="mr-1 h-2 w-2 rounded-full bg-rose-500"></div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {stats.sitesByStatus.bad}
                                </span>
                            </div>
                            <div className="flex items-center">
                                <div className="mr-1 h-2 w-2 rounded-full bg-gray-400"></div>
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {stats.sitesByStatus.unknown}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * Renders an empty state prompt with a call-to-action for adding the first website when no monitored websites exist.
 *
 * @param onAddWebsite - Function called when the user clicks the "Add Your First Website" button.
 */
function EmptyState({ onAddWebsite }: { onAddWebsite: () => void }) {
    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-8 text-center shadow-md dark:border-gray-700 dark:bg-gray-800">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 p-5 dark:bg-green-900/30">
                <Globe className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                No websites to monitor
            </h3>
            <p className="mx-auto mb-6 max-w-md text-gray-600 dark:text-gray-300">
                Add your first website to start monitoring its uptime and
                performance.
            </p>
            <Button onClick={onAddWebsite}>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Website
            </Button>
        </div>
    );
}

/**
 * Renders the main dashboard for website uptime monitoring, handling authentication, website data processing, and CRUD operations.
 *
 * Displays summary statistics, website cards, loading and error states, and modals for adding new websites or organizations. Processes raw website data into status summaries and uptime metrics for display.
 *
 * @remark If the user has no organization memberships, an organization creation screen is shown instead of the dashboard.
 */
function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { websites, refreshWebsites } = useWebsites();
    const { getToken, orgId } = useAuth();
    const { user } = useUser();
    const instance = useAxiosInstance();

    const processedWebsites = useMemo(() => {
        return websites.map((website) => {
            const sortedTicks = [...website.ticks].sort(
                (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime(),
            );

            const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
            const recentTicks = sortedTicks.filter(
                (tick) => new Date(tick.createdAt) > thirtyMinutesAgo,
            );

            const windows: UptimeStatus[] = [];

            for (let i = 0; i < 10; i++) {
                const windowStart = new Date(
                    Date.now() - (i + 1) * 3 * 60 * 1000,
                );
                const windowEnd = new Date(Date.now() - i * 3 * 60 * 1000);

                const windowTicks = recentTicks.filter((tick) => {
                    const tickTime = new Date(tick.createdAt);
                    return tickTime >= windowStart && tickTime < windowEnd;
                });

                const upTicks = windowTicks.filter(
                    (tick) => tick.status === "Good",
                ).length;
                windows[9 - i] =
                    windowTicks.length === 0
                        ? "unknown"
                        : upTicks / windowTicks.length >= 0.5
                          ? "good"
                          : "bad";
            }

            const totalTicks = sortedTicks.length;
            const upTicks = sortedTicks.filter(
                (tick) => tick.status === "Good",
            ).length;
            const uptimePercentage =
                totalTicks === 0 ? 0 : (upTicks / totalTicks) * 100;

            const lastChecked = sortedTicks[0]
                ? new Date(sortedTicks[0].createdAt).toLocaleTimeString()
                : "Never";

            const lastThreeTicks = windows.slice(-3);
            const goodCount = lastThreeTicks.filter(
                (status) => status === "good",
            ).length;
            const badCount = lastThreeTicks.filter(
                (status) => status === "bad",
            ).length;

            let derivedStatus: "good" | "bad" | "unknown";
            if (goodCount === 3) {
                derivedStatus = "good";
            } else if (badCount === 3) {
                derivedStatus = "bad";
            } else if (lastThreeTicks.every((t) => t === "unknown")) {
                derivedStatus = "unknown";
            } else {
                derivedStatus = "unknown";
            }

            return {
                id: website.id,
                url: website.url,
                status: derivedStatus,
                uptimePercentage,
                lastChecked,
                uptimeTicks: windows,
                interval: website.interval,
            };
        });
    }, [websites]);

    React.useEffect(() => {
        setLoading(true);
        refreshWebsites()
            .then(() => setLoading(false))
            .catch(() => {
                setError("Failed to fetch websites");
                setLoading(false);
            });
        // add orgid here
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orgId]);

    useEffect(() => {
        const syncUser = async () => {
            try {
                await instance.post("/api/v1/user", {
                    email: user?.primaryEmailAddress?.emailAddress,
                    imageUrl: user?.imageUrl,
                });
                toast.success("User synchronized successfully");
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                toast.error("Failed to synchronize user");
            }
        };
        if (user?.primaryEmailAddress?.emailAddress) {
            syncUser();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleAddWebsite = async (url: string | null, interval?: number) => {
        if (url === null) {
            setIsModalOpen(false);
            return;
        }

        setIsModalOpen(false);
        try {
            await instance.post(`/api/v1/website`, {
                url,
                interval,
            });
            await refreshWebsites();
            toast.success(`${url} is now being monitored`);

            toast(`${url} is now being monitored`);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError("Failed to add website");
        }
    };

    // const { user } = useUser(); // This line is now redundant and can be removed

    useEffect(() => {
        if (user?.organizationMemberships) {
            // const organizationIds = user.organizationMemberships.map((m) => m.id);
            // updateUserOrganizationIds(organizationIds).catch((err) =>
            //   console.error("Failed to update organization IDs:", err),
            // );
        }
    }, [user?.organizationMemberships]);

    if (user?.organizationMemberships?.length === 0) {
        return (
            <div className="flex min-h-screen w-full max-w-full items-center justify-center transition-colors duration-200">
                <CreateOrganization />
            </div>
        );
    }
    return (
        <div className="min-h-screen w-full max-w-full bg-white transition-colors duration-200 dark:bg-gray-900">
            <div className="mx-auto px-4 py-6 sm:px-6">
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Dashboard
                        </h1>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Button onClick={() => setIsModalOpen(true)}>
                            <Plus className="h-4 w-4" />
                            <span className="font-medium">Add Website</span>
                        </Button>
                    </div>
                </div>

                {!loading && !error && processedWebsites.length > 0 && (
                    <DashboardSummary websites={processedWebsites} />
                )}

                {loading ? (
                    <LoadingSpinner />
                ) : error ? (
                    <ErrorMessage
                        message={error}
                        onRetry={() => {
                            setError(null);
                            setLoading(true);
                            refreshWebsites()
                                .then(() => setLoading(false))
                                .catch(() => {
                                    setError("Failed to fetch websites");
                                    setLoading(false);
                                });
                        }}
                    />
                ) : (
                    <div className="space-y-4">
                        {processedWebsites.length > 0 ? (
                            processedWebsites.map((website) => (
                                <WebsiteCard
                                    key={website.id}
                                    website={website}
                                    onDelete={async (id) => {
                                        try {
                                            const token = await getToken();
                                            await axios.delete(
                                                `${API_BACKEND_URL}/api/v1/website`,
                                                {
                                                    headers: {
                                                        Authorization: `Bearer ${token}`,
                                                    },
                                                    data: {
                                                        websiteId: id,
                                                    },
                                                },
                                            );
                                            await refreshWebsites();
                                            toast.success(
                                                "Website deleted successfully",
                                            );
                                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                        } catch (err) {
                                            toast.error(
                                                "Failed to delete website",
                                            );
                                        }
                                    }}
                                />
                            ))
                        ) : (
                            <EmptyState
                                onAddWebsite={() => setIsModalOpen(true)}
                            />
                        )}
                    </div>
                )}
            </div>

            <CreateWebsiteModal
                isOpen={isModalOpen}
                onClose={handleAddWebsite}
            />
        </div>
    );
}

export default App;
