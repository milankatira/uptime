"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { API_BACKEND_URL } from "@/config";
import { useAxiosInstance } from "@/lib/axiosInstance";
import {
    AlertTriangle,
    ArrowLeftCircle,
    Calendar,
    Copy,
    Pause,
    Send,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const HeartbeatDetailPage = () => {
    const params = useParams();
    const id = params?.id as string;
    const instance = useAxiosInstance();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dateRange, setDateRange] = useState<{ from: string; to: string }>({
        from: "2025-05-10",
        to: "2025-05-13",
    });
    const [heartbeatDetails, setHeartbeatDetails] = useState({
        name: "",
        status: "",
        interval: 0,
        HeartbeatRecord: [],
    });

    const [loading, setLoading] = useState(true);
    const heartbeatDownUrl = `${API_BACKEND_URL}/api/v1/heartbeat/down/${id}`;
    const heartbeatUpUrl = `${API_BACKEND_URL}/api/v1/heartbeat/up/${id}`;

    const mockStats = {
        currentPending: {
            days: 3,
            hours: 14,
            mins: 57,
        },
        lastRecorded: "waiting",
        incidentCount: 0,
    };

    const availabilityData = [
        {
            period: "Today",
            availability: "100.0000%",
            downtime: "none",
            incidents: 0,
            longestIncident: "none",
            avgIncident: "none",
        },
        {
            period: "Last 7 days",
            availability: "100.0000%",
            downtime: "none",
            incidents: 0,
            longestIncident: "none",
            avgIncident: "none",
        },
        {
            period: "Last 30 days",
            availability: "100.0000%",
            downtime: "none",
            incidents: 0,
            longestIncident: "none",
            avgIncident: "none",
        },
        {
            period: "Last 365 days",
            availability: "100.0000%",
            downtime: "none",
            incidents: 0,
            longestIncident: "none",
            avgIncident: "none",
        },
        {
            period: "All time (Last 4 days)",
            availability: "100.0000%",
            downtime: "none",
            incidents: 0,
            longestIncident: "none",
            avgIncident: "none",
        },
    ];

    const handleSendTestAlert = () => {
        // This would handle sending a test alert
        toast.info("Test alert sent", {
            description:
                "A test alert has been sent to your configured channels",
        });
    };

    const handleCalculate = () => {
        // This would handle date range calculations
        toast.info("Calculating availability", {
            description: `Calculating availability between ${dateRange.from} and ${dateRange.to}`,
        });
    };

    useEffect(() => {
        const fetchHeartbeatDetails = async () => {
            try {
                const response = await instance.get(
                    `${API_BACKEND_URL}/api/v1/heartbeat-details/${id}`,
                );
                if (!response) {
                    throw new Error("Failed to fetch heartbeat details");
                }

                setHeartbeatDetails(response.data);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                toast.error("Failed to fetch heartbeat details", {
                    description: error.message,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchHeartbeatDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen w-full bg-white dark:bg-gray-900">
                <div className="max-w-full p-6 md:p-8">
                    {/* Shimmer for breadcrumb */}
                    <div className="mb-10 h-6 w-1/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>

                    {/* Shimmer for header */}
                    <div className="mb-8 flex items-center">
                        <div className="mr-4 h-12 w-12 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
                        <div className="flex-1">
                            <div className="mb-2 h-8 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
                            <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700"></div>
                        </div>
                    </div>

                    {/* Shimmer for action buttons */}
                    <div className="mb-8 flex gap-3">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="h-10 w-24 animate-pulse rounded bg-gray-700"
                            ></div>
                        ))}
                    </div>

                    {/* Shimmer for URL section */}
                    <div className="bg-dark-lighter border-dark-border mb-8 rounded-lg border p-6">
                        <div className="mb-5 h-6 w-1/2 animate-pulse rounded bg-gray-700"></div>
                        <div className="mb-4 h-16 animate-pulse rounded bg-gray-700"></div>
                        <div className="mb-6 h-16 animate-pulse rounded bg-gray-700"></div>
                        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-700"></div>
                    </div>

                    {/* Shimmer for stats grid */}
                    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="h-32 animate-pulse rounded-lg bg-gray-700"
                            ></div>
                        ))}
                    </div>

                    {/* Shimmer for availability table */}
                    <div className="bg-dark-lighter border-dark-border mb-8 overflow-x-auto rounded-lg border">
                        <div className="h-12 animate-pulse rounded-t-lg bg-gray-700"></div>
                        <div className="p-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div
                                    key={i}
                                    className="mb-2 h-12 animate-pulse rounded bg-gray-700"
                                ></div>
                            ))}
                        </div>
                    </div>

                    {/* Shimmer for date range selector */}
                    <div className="bg-dark-lighter border-dark-border mb-8 rounded-lg border p-6">
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <div className="mb-2 h-6 w-16 animate-pulse rounded bg-gray-700"></div>
                                <div className="h-10 animate-pulse rounded bg-gray-700"></div>
                            </div>
                            <div className="flex-1">
                                <div className="mb-2 h-6 w-16 animate-pulse rounded bg-gray-700"></div>
                                <div className="h-10 animate-pulse rounded bg-gray-700"></div>
                            </div>
                            <div className="h-10 w-24 animate-pulse rounded bg-gray-700"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full bg-white dark:bg-gray-900">
            <div className="max-w-full p-6 md:p-8">
                {/* Breadcrumb navigation */}
                <div className="mb-10 flex items-center text-sm">
                    <Link
                        href="/heartbeats"
                        className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <ArrowLeftCircle className="mr-2 h-4 w-4" />
                        Heartbeats
                    </Link>
                    <span className="mx-2 text-gray-400 dark:text-gray-600">
                        /
                    </span>
                    <span className="text-gray-900 dark:text-gray-200">
                        {heartbeatDetails?.name}
                    </span>
                </div>

                {/* Heartbeat header */}
                <div className="mb-8 flex items-center">
                    <div className="bg-dark-lighter border-dark-border mr-4 flex h-12 w-12 items-center justify-center rounded-full border">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            className="h-6 w-6 text-gray-400"
                        >
                            <path
                                d="M22 12h-4l-3 9L9 3l-3 9H2"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold">
                            {" "}
                            {heartbeatDetails?.name}
                        </h1>
                        <div className="flex items-center text-sm text-gray-500">
                            <span className="mr-2">Pending</span>
                            <span className="mx-2">•</span>
                            <span>Expected every 1 day</span>
                        </div>
                    </div>
                </div>

                {/* Action buttons */}
                <div className="mb-8 flex flex-wrap gap-3">
                    <Button
                        variant="outline"
                        className="bg-dark-lighter border-dark-border hover:bg-dark-lighter"
                        onClick={handleSendTestAlert}
                    >
                        <Send className="mr-2 h-4 w-4" />
                        Send test alert
                    </Button>
                    <Button
                        variant="outline"
                        className="bg-dark-lighter border-dark-border hover:bg-dark-lighter"
                    >
                        <AlertTriangle className="mr-2 h-4 w-4" />
                        Incidents
                    </Button>
                    <Button
                        variant="outline"
                        className="bg-dark-lighter border-dark-border hover:bg-dark-lighter"
                    >
                        <Pause className="mr-2 h-4 w-4" />
                        Pause
                    </Button>
                    <Button
                        variant="outline"
                        className="bg-dark-lighter border-dark-border hover:bg-dark-lighter"
                        onClick={() => setIsDialogOpen(true)}
                    >
                        <svg
                            className="mr-2 h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                        Configure
                    </Button>
                </div>

                {/* URL instruction section */}
                <div className="bg-dark-lighter border-dark-border mb-8 rounded-lg border p-6">
                    <div className="mb-5 flex items-center justify-between">
                        <p>
                            Make a HEAD, GET, or a POST request to the following
                            URLs
                        </p>
                    </div>

                    {/* Down URL */}
                    <div className="bg-dark border-dark-border mb-4 rounded border p-4">
                        <div className="flex items-center justify-between">
                            <code className="break-all text-red-500">
                                {heartbeatDownUrl}
                            </code>
                            <Button
                                variant="ghost"
                                size="sm"
                                className=""
                                onClick={() =>
                                    navigator.clipboard.writeText(
                                        heartbeatDownUrl,
                                    )
                                }
                            >
                                <Copy className="mr-2 h-4 w-4" />
                                Copy
                            </Button>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                            Use this URL to report a failure (500 status)
                        </p>
                    </div>

                    {/* Up URL */}
                    <div className="bg-dark border-dark-border mb-6 rounded border p-4">
                        <div className="flex items-center justify-between">
                            <code className="break-all text-green-500">
                                {heartbeatUpUrl}
                            </code>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                    navigator.clipboard.writeText(
                                        heartbeatUpUrl,
                                    )
                                }
                            >
                                <Copy className="mr-2 h-4 w-4" />
                                Copy
                            </Button>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                            Use this URL to report a successful heartbeat
                        </p>
                    </div>

                    <p className="text-sm text-gray-500">
                        You can also append{" "}
                        <code className="text-gray-400">/fail</code> or{" "}
                        <code className="text-gray-400">
                            /&lt;exit-code&gt;
                        </code>{" "}
                        to the URL. Read our{" "}
                        <a href="#" className="text-blue-400 hover:underline">
                            documentation
                        </a>{" "}
                        for more details.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="bg-dark-lighter border-dark-border rounded-lg border p-6">
                        <p className="mb-1 text-sm text-gray-400">
                            Currently pending for
                        </p>
                        <h2 className="text-xl font-semibold">
                            {mockStats.currentPending.days} days{" "}
                            {mockStats.currentPending.hours} hours{" "}
                            {mockStats.currentPending.mins} mins
                        </h2>
                    </div>

                    <div className="bg-dark-lighter border-dark-border rounded-lg border p-6">
                        <p className="mb-1 text-sm text-gray-400">
                            Last heartbeat recorded
                        </p>
                        <h2 className="text-xl font-semibold">
                            {mockStats.lastRecorded}
                        </h2>
                    </div>

                    <div className="bg-dark-lighter border-dark-border rounded-lg border p-6">
                        <p className="mb-1 text-sm text-gray-400">Incidents</p>
                        <h2 className="text-xl font-semibold">
                            {mockStats.incidentCount}
                        </h2>
                    </div>
                </div>

                {/* Availability Table */}
                <div className="bg-dark-lighter border-dark-border mb-8 overflow-x-auto rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-dark border-dark-border hover:bg-dark">
                                <TableHead>Time period</TableHead>
                                <TableHead>Availability</TableHead>
                                <TableHead>Downtime</TableHead>
                                <TableHead>Incidents</TableHead>
                                <TableHead>Longest incident</TableHead>
                                <TableHead>Avg. incident</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {availabilityData.map((row, index) => (
                                <TableRow
                                    key={index}
                                    className="border-dark-border hover:bg-dark/40"
                                >
                                    <TableCell>{row.period}</TableCell>
                                    <TableCell className="text-green-500">
                                        {row.availability}
                                    </TableCell>
                                    <TableCell>{row.downtime}</TableCell>
                                    <TableCell>{row.incidents}</TableCell>
                                    <TableCell>{row.longestIncident}</TableCell>
                                    <TableCell>{row.avgIncident}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Date Range Selector */}
                <div className="bg-dark-lighter border-dark-border mb-8 rounded-lg border p-6">
                    <div className="flex flex-col items-end gap-4 md:flex-row">
                        <div className="flex-1">
                            <label className="mb-2 block text-sm text-gray-400">
                                From
                            </label>
                            <div className="relative">
                                <Calendar className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
                                <Input
                                    type="date"
                                    value={dateRange.from}
                                    onChange={(e) =>
                                        setDateRange({
                                            ...dateRange,
                                            from: e.target.value,
                                        })
                                    }
                                    className="bg-dark border-dark-border pl-10 hover:border-gray-600 focus:border-gray-500"
                                />
                            </div>
                        </div>
                        <div className="flex-1">
                            <label className="mb-2 block text-sm text-gray-400">
                                To
                            </label>
                            <div className="relative">
                                <Calendar className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
                                <Input
                                    type="date"
                                    value={dateRange.to}
                                    onChange={(e) =>
                                        setDateRange({
                                            ...dateRange,
                                            to: e.target.value,
                                        })
                                    }
                                    className="bg-dark border-dark-border pl-10 hover:border-gray-600 focus:border-gray-500"
                                />
                            </div>
                        </div>
                        <div>
                            <Button
                                className="bg-indigo-600 text-white hover:bg-indigo-700"
                                onClick={handleCalculate}
                            >
                                Calculate
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Configure Dialog */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="bg-dark-lighter border-dark-border">
                        <DialogHeader>
                            <DialogTitle>Configure Heartbeat</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-2">
                            <div>
                                <label className="mb-2 block text-sm text-gray-500">
                                    Name
                                </label>
                                <Input
                                    defaultValue="dskndnjrd"
                                    className="bg-dark border-dark-border"
                                />
                            </div>
                            <div>
                                <label className="mb-2 block text-sm text-gray-500">
                                    Expected every
                                </label>
                                <div className="flex gap-2">
                                    <Input
                                        type="number"
                                        defaultValue="1"
                                        className="bg-dark border-dark-border"
                                    />
                                    <select className="bg-dark border-dark-border rounded-md border px-3 py-2">
                                        <option>minute</option>
                                        <option>hour</option>
                                        <option selected>day</option>
                                        <option>week</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                            <Button
                                variant="outline"
                                onClick={() => setIsDialogOpen(false)}
                                className="border-dark-border hover:bg-dark"
                            >
                                Cancel
                            </Button>
                            <Button className="bg-indigo-600 hover:bg-indigo-700">
                                Save changes
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default HeartbeatDetailPage;
