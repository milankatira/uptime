"use client";
import { useAxiosInstance } from "@/lib/axiosInstance";
import { useParams } from "next/navigation";
import React, { useEffect, useState, useMemo } from "react";
import {
    Activity,
    AlertTriangle,
    CheckCircle,
    Clock,
    XCircle,
    Edit,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

import { ResponseTimeChart } from "./components/ResponseTimeChart";

type UptimeStatus = "good" | "bad" | "unknown";

interface WebsiteTick {
    id: string;
    createdAt: string;
    status: string;
    latency: number;
}

interface WebsiteDetails {
    id: string;
    url: string;
    interval: number;
    ticks: WebsiteTick[];
}

function StatusCircle({ status }: { status: UptimeStatus }) {
    return (
        <div className="relative flex items-center justify-center">
            <div
                className={`h-3.5 w-3.5 rounded-full ${status === "good"
                    ? "bg-emerald-500 dark:bg-emerald-400"
                    : status === "bad"
                        ? "bg-rose-500 dark:bg-rose-400"
                        : "bg-gray-400 dark:bg-gray-500"
                    }`}
            />
            {status === "good" && (
                <div
                    className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75 dark:bg-emerald-300"
                    style={{ animationDuration: "3s" }}
                ></div>
            )}
        </div>
    );
}

function UptimeTicks({ ticks }: { ticks: WebsiteTick[] }) {

    const processedTicks: UptimeStatus[] = useMemo(() => {
        const sortedTicks = [...ticks].sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
        const recentTicks = sortedTicks.filter(
            (tick) => new Date(tick.createdAt) > thirtyMinutesAgo
        );

        const windows: UptimeStatus[] = [];

        for (let i = 0; i < 10; i++) {
            const windowStart = new Date(Date.now() - (i + 1) * 3 * 60 * 1000);
            const windowEnd = new Date(Date.now() - i * 3 * 60 * 1000);

            const windowTicks = recentTicks.filter((tick) => {
                const tickTime = new Date(tick.createdAt);
                return tickTime >= windowStart && tickTime < windowEnd;
            });

            const upTicks = windowTicks.filter((tick) => tick.status === "Good").length;
            windows[9 - i] =
                windowTicks.length === 0
                    ? "unknown"
                    : upTicks / windowTicks.length >= 0.5
                        ? "good"
                        : "bad";
        }
        return windows;
    }, [ticks]);

    return (
        <div className="mt-3 flex gap-1 h-10">
            {processedTicks.map((tick, index) => {
                const height =
                    tick === "good" ? "h-10" : tick === "bad" ? "h-4" : "h-2";


                const startMinAgo = (10 - index) * 3;
                const endMinAgo = (9 - index) * 3;
                const tooltipContent = `${endMinAgo}-${startMinAgo} min ago: ${tick.charAt(0).toUpperCase() + tick.slice(1)
                    }`;

                return (
                    <TooltipProvider key={index}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div
                                    className={`w-8 ${height} transform rounded-t-sm transition-all duration-300 hover:translate-y-[-2px] ${tick === "good"
                                        ? "bg-gradient-to-b from-emerald-400 to-emerald-500 dark:from-emerald-300 dark:to-emerald-500"
                                        : tick === "bad"
                                            ? "bg-gradient-to-b from-rose-400 to-rose-500 dark:from-rose-300 dark:to-rose-500"
                                            : "bg-gradient-to-b from-gray-300 to-gray-400 dark:from-gray-500 dark:to-gray-600"
                                        }`}
                                    style={{ alignSelf: "flex-end" }}
                                />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{tooltipContent}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                );
            })}
        </div>
    );
}



function getOverallStatus(ticks: WebsiteTick[]): UptimeStatus {
    const sortedTicks = [...ticks].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    const lastThreeTicks = sortedTicks.slice(0, 3);

    if (lastThreeTicks.length === 0) {
        return "unknown";
    }

    const goodCount = lastThreeTicks.filter(
        (tick) => tick.status === "Good"
    ).length;
    const badCount = lastThreeTicks.filter(
        (tick) => tick.status === "Bad"
    ).length;

    if (goodCount === lastThreeTicks.length) {
        return "good";
    } else if (badCount === lastThreeTicks.length) {
        return "bad";
    } else {
        return "unknown";
    }
}


function WebsiteDetailsLoadingShimmer() {
    return (
        <div className="bg-white dark:bg-gray-900 w-full h-full overflow-scroll animate-pulse p-10">
            <div className="container mx-auto py-8 h-full">
                <div className="flex items-center space-x-4 mb-6">
                    <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                    <div>
                        <div className="h-8 w-64 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                        <div className="flex items-center space-x-3">
                            <div className="h-5 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
                            <div className="h-4 w-[1px] bg-gray-400 dark:bg-gray-600"></div>
                            <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
                        </div>
                    </div>
                </div>

                {/* Stat Cards Shimmer */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {[1, 2, 3].map(i => (
                        <Card key={i} className="bg-gray-200 dark:bg-gray-800">
                            <CardHeader>
                                <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                                <div className="h-8 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
                            </CardHeader>
                            <CardContent>
                                <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Uptime Ticks Shimmer */}
                <Card className="mb-6 bg-gray-200 dark:bg-gray-800">
                    <CardHeader>
                        <div className="h-4 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                        <div className="h-4 w-64 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </CardHeader>
                    <CardContent>
                        <div className="mt-3 flex gap-1 h-10">
                            {[...Array(10)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-8 h-full bg-gray-300 dark:bg-gray-700 rounded-t-sm"
                                    style={{ height: `${Math.random() * 60 + 40}%`, alignSelf: "flex-end" }}
                                ></div>
                            ))}
                        </div>
                        <div className="mt-1 flex justify-between text-xs text-gray-400 dark:text-gray-600">
                            <span>30 min ago</span>
                            <span>Now</span>
                        </div>
                        <div className="mt-4 flex space-x-3 text-xs text-gray-400 dark:text-gray-600 justify-center">
                            <div className="flex items-center">
                                <div className="mr-1 h-2 w-2 rounded-full bg-gray-400"></div>
                                Good
                            </div>
                            <div className="flex items-center">
                                <div className="mr-1 h-2 w-2 rounded-full bg-gray-400"></div>
                                Down
                            </div>
                            <div className="flex items-center">
                                <div className="mr-1 h-2 w-2 rounded-full bg-gray-400"></div>
                                Unknown
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Chart Shimmer */}
                <Card className="bg-gray-200 dark:bg-gray-800">
                    <CardHeader>
                        <div className="h-4 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                        <div className="h-4 w-64 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </CardHeader>
                    <CardContent>
                        <div className="min-h-[300px] w-full bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}


export default function WebsiteDetailsPage() {
    const { websiteId } = useParams();
    const instance = useAxiosInstance();
    const [website, setWebsite] = useState<WebsiteDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editUrl, setEditUrl] = useState("");
    const [editInterval, setEditInterval] = useState(60);

    useEffect(() => {
        async function fetchWebsiteDetails() {
            if (!websiteId) return;
            setLoading(true);
            setError(null);
            try {
                const response = await instance.get(`/api/v1/website/status`, {
                    params: { websiteId },
                });
                setWebsite(response.data);

                setEditUrl(response.data.url);
                setEditInterval(response.data.interval);
            } catch (err) {
                console.error("Failed to fetch website details:", err);
                setError("Failed to load website details.");
            } finally {
                setLoading(false);
            }
        }

        fetchWebsiteDetails();
    }, [websiteId, instance]);

    const displayUrl = useMemo(() => {
        if (!website) return "Loading...";
        try {
            const urlObj = new URL(website.url);
            return urlObj.hostname;
        } catch {
            return website.url;
        }
    }, [website]);

    const overallStatus = useMemo(() => {
        if (!website) return "unknown";
        return getOverallStatus(website.ticks);
    }, [website]);

    const statusLabel = useMemo(() => {
        if (overallStatus === "good") {
            return (
                <div className="flex items-center text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    <CheckCircle className="mr-1 h-4 w-4" />
                    Online
                </div>
            );
        } else if (overallStatus === "bad") {
            return (
                <div className="flex items-center text-sm font-medium text-rose-600 dark:text-rose-400">
                    <XCircle className="mr-1 h-4 w-4" />
                    Down
                </div>
            );
        } else {
            return (
                <div className="flex items-center text-sm font-medium text-amber-600 dark:text-amber-400">
                    <AlertTriangle className="mr-1 h-4 w-4" />
                    Unknown
                </div>
            );
        }
    }, [overallStatus]);

    const uptimePercentage = useMemo(() => {
        if (!website || website.ticks.length === 0) return 0;
        const upTicks = website.ticks.filter(tick => tick.status === "Good").length;
        return (upTicks / website.ticks.length) * 100;
    }, [website]);

    const lastChecked = useMemo(() => {
        if (!website || website.ticks.length === 0) return "Never";
        const sortedTicks = [...website.ticks].sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        return new Date(sortedTicks[0].createdAt).toLocaleString();
    }, [website]);

    const handleEditClick = () => {
        if (website) {
            setEditUrl(website.url);
            setEditInterval(website.interval);
            setIsEditModalOpen(true);
        }
    };

    const handleSaveEdit = async () => {
        if (!websiteId || !website) return;

        try {

            await instance.put(`/api/v1/website/${websiteId}`, {
                url: editUrl,
                interval: parseInt(editInterval.toString(), 10),
            });
            toast.success("Website updated successfully!");
            setIsEditModalOpen(false);



            async function refetchWebsiteDetails() {
                if (!websiteId) return;
                try {
                    const response = await instance.get(`/api/v1/website/status`, {
                        params: { websiteId },
                    });
                    setWebsite(response.data);
                } catch (err) {
                    console.error("Failed to re-fetch website details after update:", err);
                }
            }
            refetchWebsiteDetails();

        } catch (err) {
            console.error("Failed to update website:", err);
            toast.error("Failed to update website.");
        }
    };


    if (loading) {
        return <WebsiteDetailsLoadingShimmer />;
    }

    if (error) {
        return <div className="container mx-auto py-8 text-rose-500">Error: {error}</div>;
    }

    if (!website) {
        return <div className="container mx-auto py-8">Website not found.</div>;
    }

    return (
        <div className="bg-white dark:bg-gray-900 w-full h-full overflow-scroll p-10">
            <div className="container mx-auto py-8  h-full">
                <div className="flex items-center space-x-4 mb-6">
                    <StatusCircle status={overallStatus} />
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            {displayUrl}
                        </h1>
                        <div className="mt-1 flex items-center space-x-3">
                            {statusLabel}
                            <div className="h-4 w-[1px] bg-gray-300 dark:bg-gray-600"></div>
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                <Clock className="mr-1 h-4 w-4" />
                                Last check: {lastChecked}
                            </div>
                            {/* Add Edit button here */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                onClick={handleEditClick}
                                aria-label="Edit website"
                            >
                                <Edit className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <Card className="bg-white dark:bg-gray-900">
                        <CardHeader>
                            <CardDescription>Uptime (All Time)</CardDescription>
                            <CardTitle className="text-2xl font-bold">
                                {uptimePercentage.toFixed(1)}%
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Progress value={uptimePercentage} className="w-full" />
                        </CardContent>
                    </Card>
                    <Card className="bg-white dark:bg-gray-900">
                        <CardHeader>
                            <CardDescription>Check Interval</CardDescription>
                            <CardTitle className="text-2xl font-bold">
                                {website.interval}s
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                <Clock className="mr-1 h-4 w-4" />
                                Checked every {website.interval} seconds
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-white dark:bg-gray-900">
                        <CardHeader>
                            <CardDescription>Total Checks</CardDescription>
                            <CardTitle className="text-2xl font-bold">
                                {website.ticks.length}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                <Activity className="mr-1 h-4 w-4" />
                                Total checks recorded
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card className="mb-6 bg-white dark:bg-gray-900">
                    <CardHeader>
                        <CardTitle>Last 30 Minutes Status</CardTitle>
                        <CardDescription>Visual representation of recent checks.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <UptimeTicks ticks={website.ticks} />
                        <div className="mt-1 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                            <span>30 min ago</span>
                            <span>Now</span>
                        </div>
                        <div className="mt-4 flex space-x-3 text-xs text-gray-500 dark:text-gray-400 justify-center">
                            <div className="flex items-center">
                                <div className="mr-1 h-2 w-2 rounded-full bg-emerald-500"></div>
                                Good
                            </div>
                            <div className="flex items-center">
                                <div className="mr-1 h-2 w-2 rounded-full bg-rose-500"></div>
                                Down
                            </div>
                            <div className="flex items-center">
                                <div className="mr-1 h-2 w-2 rounded-full bg-gray-400"></div>
                                Unknown
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <ResponseTimeChart ticks={website.ticks} />
                <br />
            </div>

            {/* Edit Website Modal */}
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                    <DialogHeader>
                        <DialogTitle>Edit Website</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="url" className="text-right">
                                URL
                            </Label>
                            <Input
                                id="url"
                                value={editUrl}
                                onChange={(e) => setEditUrl(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="interval" className="text-right">
                                Check Interval (s)
                            </Label>
                            <Input
                                id="interval"
                                type="number"
                                value={editInterval}
                                onChange={(e) => setEditInterval(parseInt(e.target.value, 10) || 0)}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSaveEdit}>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}