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
    Calendar,
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ResponseTimeChart } from "./components/ResponseTimeChart";
import { RecentErrors } from "./components/RecentErrors";

type UptimeStatus = "good" | "bad" | "unknown";
type TimeRange = "30m" | "1w" | "1m" | "1y";

interface AveragedTick {
    windowStart: string;
    avgLatency: number;
    status: "Good" | "Bad";
}

interface WebsiteDetails {
    id: string;
    url: string;
    interval: number;
    disabled: boolean;
    totalTicks: number;
    averagedTicks: AveragedTick[];
    uptimePercentage: number; // Added to API response
}

/**
 * Displays a colored status indicator circle representing uptime status.
 *
 * Shows green for "good", red for "bad", and gray for "unknown" status. A pulsing animation is added for "good" status.
 *
 * @param status - The current uptime status to display.
 */
function StatusCircle({ status }: { status: UptimeStatus }) {
    return (
        <div className="relative flex items-center justify-center">
            <div
                className={`h-3.5 w-3.5 rounded-full ${
                    status === "good"
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

/**
 * Displays a horizontal bar visualization of up to 10 recent uptime status ticks for a website.
 *
 * Each tick is represented as a vertical bar whose height and color indicate the status ("good", "bad", or "unknown"). Tooltips provide contextual time and status information based on the selected {@link timeRange}.
 *
 * @param averagedTicks - Array of recent averaged status ticks to visualize.
 * @param timeRange - The selected time range, which determines tooltip labels and tick grouping.
 */
function UptimeTicks({
    averagedTicks,
    timeRange,
}: {
    averagedTicks: AveragedTick[];
    timeRange: TimeRange;
}) {
    // Process ticks to show most recent with unknown padding
    const displayTicks = useMemo(() => {
        const statuses: UptimeStatus[] = averagedTicks
            .slice(0, 10) // Get most recent 10 ticks
            .map((tick) => (tick.status === "Good" ? "good" : "bad"));

        // Pad with "unknown" if we have less than 10 ticks
        while (statuses.length < 10) {
            statuses.unshift("unknown");
        }

        return statuses;
    }, [averagedTicks]);

    // Function to calculate time ago for tooltip based on time range
    const getTimeAgo = (index: number) => {
        switch (timeRange) {
            case "1w":
                return `${7 - index} day${index !== 6 ? "s" : ""} ago`;
            case "1m":
                return `${30 - index} day${index !== 29 ? "s" : ""} ago`;
            case "1y":
                return `${12 - index} month${index !== 11 ? "s" : ""} ago`;
            default: // 30m
                const minutesAgo = 30 - index * 3;
                return `${minutesAgo - 3}-${minutesAgo} min ago`;
        }
    };

    return (
        <div className="mt-3 flex gap-1 h-10">
            {displayTicks.map((tick, index) => {
                const height =
                    tick === "good" ? "h-10" : tick === "bad" ? "h-4" : "h-2";
                const tooltipContent =
                    tick === "unknown"
                        ? "No data available"
                        : `${getTimeAgo(index)}: ${tick.charAt(0).toUpperCase() + tick.slice(1)}`;

                return (
                    <TooltipProvider key={index}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div
                                    className={`flex-1 ${height} transform rounded-t-sm transition-all duration-300 hover:translate-y-[-2px] ${
                                        tick === "good"
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

/**
 * Determines the overall uptime status based on the most recent averaged tick.
 *
 * @param averagedTicks - Array of averaged status ticks, ordered with the most recent first.
 * @returns The overall status: "good" if the latest tick is "Good", "bad" if "Bad", or "unknown" if no ticks are available.
 */
function getOverallStatus(averagedTicks: AveragedTick[]): UptimeStatus {
    if (!averagedTicks.length) return "unknown";
    const mostRecent = averagedTicks[0];
    return mostRecent.status === "Good" ? "good" : "bad";
}

/**
 * Renders a skeleton loading UI that mimics the layout of the website details page.
 *
 * Displays animated placeholders for the status header, summary cards, uptime ticks visualization, and response time chart while data is loading.
 */
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {[1, 2, 3].map((i) => (
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
                                    style={{
                                        height: `${Math.random() * 60 + 40}%`,
                                        alignSelf: "flex-end",
                                    }}
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

/**
 * Displays and manages detailed uptime and performance information for a specific website.
 *
 * Fetches website status, uptime, and response time data for a selectable time range, and periodically refreshes the data based on the website's configured check interval. Allows users to edit the website's URL and check interval, and provides visualizations for uptime status, response times, and recent errors. Handles loading, error, and not-found states.
 */
export default function WebsiteDetailsPage() {
    const { websiteId } = useParams();
    const instance = useAxiosInstance();
    const [website, setWebsite] = useState<WebsiteDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editUrl, setEditUrl] = useState("");
    const [editInterval, setEditInterval] = useState(60);
    const [timeRange, setTimeRange] = useState<TimeRange>("30m");

    // Fetch website details with time range parameter
    const fetchWebsiteDetails = async () => {
        if (!websiteId) return;

        try {
            const response = await instance.get(`/api/v1/website/status`, {
                params: {
                    websiteId,
                    duration: timeRange,
                },
            });
            setWebsite(response.data);
        } catch (err) {
            console.error("Failed to fetch website details:", err);
            setError("Failed to load website details.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        fetchWebsiteDetails();

        // Set up periodic refresh based on interval
        const refreshInterval = website?.interval
            ? website.interval * 1000
            : 60000;
        // eslint-disable-next-line prefer-const
        timeoutId = setTimeout(fetchWebsiteDetails, refreshInterval);

        return () => {
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [websiteId, instance, timeRange, website?.interval]);

    // Handle time range change
    const handleTimeRangeChange = (newRange: TimeRange) => {
        setTimeRange(newRange);
        fetchWebsiteDetails();
    };

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
        if (!website?.averagedTicks.length) return "unknown";
        return getOverallStatus(website.averagedTicks);
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

    // Get time range label for UI
    const getTimeRangeLabel = () => {
        switch (timeRange) {
            case "1w":
                return "Last 1 week";
            case "1m":
                return "Last 1 month";
            default:
                return "Last 30 min";
        }
    };

    const lastChecked = useMemo(() => {
        if (!website?.averagedTicks.length) return "Never";

        // Get the most recent check time
        const mostRecent = new Date(website.averagedTicks[0].windowStart);
        return mostRecent.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            day: "numeric",
            month: "short",
        });
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
            fetchWebsiteDetails();
        } catch (err) {
            console.error("Failed to update website:", err);
            toast.error("Failed to update website.");
        }
    };

    if (loading) {
        return <WebsiteDetailsLoadingShimmer />;
    }

    if (error) {
        return (
            <div className="container mx-auto py-8 text-rose-500">
                Error: {error}
            </div>
        );
    }

    if (!website) {
        return <div className="container mx-auto py-8">Website not found.</div>;
    }

    return (
        <div className="bg-white dark:bg-gray-900 w-full h-full overflow-scroll p-10">
            <div className="container mx-auto py-8 h-full">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
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

                    <div className="flex items-center space-x-2">
                        <Calendar className="h-5 w-5 text-gray-500" />
                        <Select
                            value={timeRange}
                            onValueChange={(v) =>
                                handleTimeRangeChange(v as TimeRange)
                            }
                        >
                            <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Time Range" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="30m">Last 30 min</SelectItem>
                                <SelectItem value="1w">Last 1 week</SelectItem>
                                <SelectItem value="1m">Last 1 month</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <Card className="bg-white dark:bg-gray-900">
                        <CardHeader>
                            <CardDescription>
                                Uptime ({getTimeRangeLabel()})
                            </CardDescription>
                            <CardTitle className="text-2xl font-bold">
                                {website?.uptimePercentage?.toFixed(1)}%
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Progress
                                value={website.uptimePercentage}
                                className="w-full"
                            />
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
                                {website.totalTicks}
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
                        <CardTitle>{getTimeRangeLabel()} Status</CardTitle>
                        <CardDescription>
                            Visual representation of status windows
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <UptimeTicks
                            averagedTicks={website.averagedTicks}
                            timeRange={timeRange}
                        />
                        <div className="mt-1 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                            <span>
                                {timeRange === "30m"
                                    ? "30 min ago"
                                    : timeRange === "1w"
                                      ? "7 days ago"
                                      : timeRange === "1m"
                                        ? "30 days ago"
                                        : "12 months ago"}
                            </span>
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

                <ResponseTimeChart
                    averagedTicks={website.averagedTicks}
                    timeRange={timeRange}
                />
                <br />
                <RecentErrors />
            </div>

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
                                onChange={(e) =>
                                    setEditInterval(
                                        parseInt(e.target.value, 10) || 0,
                                    )
                                }
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsEditModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleSaveEdit}>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
