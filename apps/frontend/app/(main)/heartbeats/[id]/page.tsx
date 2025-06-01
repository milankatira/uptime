"use client";
import { Button } from "@/components/ui/button";
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
import { ArrowLeftCircle, Copy, Send } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const HeartbeatDetailPage = () => {
// Move interfaces to the top of the file

interface HeartbeatRecord {
    id: string;
    heartbeatId: string;
    status: "UP" | "DOWN";
    timestamp: string;
    metadata: Record<string, unknown> | null;
}

interface HeartbeatDetails {
    name: string;
    status: string;
    interval: number;
    HeartbeatRecord: HeartbeatRecord[];
}

const HeartbeatDetailPage = () => {
    // ...rest of your component code (interfaces removed from here)
    const params = useParams();
    const id = params?.id as string;
    const instance = useAxiosInstance();
    const [dateRange, setDateRange] = useState<{ from: string; to: string }>({
        from: "2025-05-10",
        to: "2025-05-13",
    });
    const [heartbeatDetails, setHeartbeatDetails] = useState<HeartbeatDetails>({
        name: "",
        status: "",
        interval: 0,
        HeartbeatRecord: [],
    });
    const [loading, setLoading] = useState(true);

    const heartbeatDownUrl = `${API_BACKEND_URL}/api/v1/heartbeat/down/${id}`;
    const heartbeatUpUrl = `${API_BACKEND_URL}/api/v1/heartbeat/up/${id}`;

    const calculateAvailability = (heartbeats: HeartbeatRecord[]) => {
        const total = heartbeats.length;
        const up = heartbeats.filter((h) => h.status === "UP").length;
        const availability = total
            ? ((up / total) * 100).toFixed(2) + "%"
            : "N/A";
        const downtime = total - up;
        return {
            availability,
            downtime: downtime ? `${downtime} minutes` : "none",
            incidents: downtime,
        };
    };

    const availabilityData = [
        {
            period: "Today",
            ...calculateAvailability(
                heartbeatDetails.HeartbeatRecord.filter(
                    (h) =>
                        new Date(h.timestamp) >
                        new Date(Date.now() - 24 * 60 * 60 * 1000),
                ),
            ),
        },
    ];

    const handleSendTestAlert = async () => {
        try {
            await instance.post(`/api/v1/test-incident/${id}`);
            toast.info("Test alert sent", {
                description:
                    "A test alert has been sent to your configured channels",
            });
        } catch (error) {
            toast.error("Failed to send test alert", {
                description:
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (error as any)?.response?.data?.message || "Unknown error",
            });
        }
    };

    const handleCalculate = () => {
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
                if (!response)
                    throw new Error("Failed to fetch heartbeat details");
                setHeartbeatDetails(response.data);
            } catch (error) {
                toast.error("Failed to fetch heartbeat details", {
                    description:
                        error instanceof Error
                            ? error.message
                            : "An unknown error occurred",
                });
            } finally {
                setLoading(false);
            }
        };
        fetchHeartbeatDetails();
    }, [id, instance]);

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
        <div className="min-h-screen w-full bg-white dark:bg-gray-900 p-6">
            <div className="mb-6 flex items-center text-sm">
                <Link
                    href="/heartbeats"
                    className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    <ArrowLeftCircle className="mr-2 h-4 w-4" />
                    Heartbeats
                </Link>
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-900 dark:text-gray-200">
                    {heartbeatDetails.name}
                </span>
            </div>

            <div className="mb-8">
                <h1 className="text-2xl font-bold mb-1">
                    {heartbeatDetails.name}
                </h1>
                <p className="text-sm text-gray-500">
                    Expected every {heartbeatDetails.interval} seconds
                </p>
            </div>

            <div className="mb-6 flex flex-wrap gap-3">
                <Button variant="outline" onClick={handleSendTestAlert}>
                    <Send className="mr-2 h-4 w-4" />
                    Send Test Alert
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
                                navigator.clipboard.writeText(heartbeatDownUrl)
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
                                navigator.clipboard.writeText(heartbeatUpUrl)
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
                    <code className="text-gray-400">/&lt;exit-code&gt;</code> to
                    the URL. Read our{" "}
                    <a href="#" className="text-blue-400 hover:underline">
                        documentation
                    </a>{" "}
                    for more details.
                </p>
            </div>

            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">
                    Availability (Past 24h)
                </h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Period</TableHead>
                            <TableHead>Availability</TableHead>
                            <TableHead>Downtime</TableHead>
                            <TableHead>Incidents</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {availabilityData.map((item, idx) => (
                            <TableRow key={idx}>
                                <TableCell>{item.period}</TableCell>
                                <TableCell>{item.availability}</TableCell>
                                <TableCell>{item.downtime}</TableCell>
                                <TableCell>{item.incidents}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Date Range</h2>
                <div className="flex gap-4 mb-4">
                    <Input
                        type="date"
                        value={dateRange.from}
                        onChange={(e) =>
                            setDateRange({ ...dateRange, from: e.target.value })
                        }
                    />
                    <Input
                        type="date"
                        value={dateRange.to}
                        onChange={(e) =>
                            setDateRange({ ...dateRange, to: e.target.value })
                        }
                    />
                    <Button onClick={handleCalculate}>Calculate</Button>
                </div>
            </div>

            <div>
                <h2 className="text-lg font-semibold mb-2">
                    Recent Heartbeats
                </h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Timestamp</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {heartbeatDetails.HeartbeatRecord.map((record) => (
                            <TableRow key={record.id}>
                                <TableCell>
                                    {new Date(
                                        record.timestamp,
                                    ).toLocaleString()}
                                </TableCell>
                                <TableCell>{record.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default HeartbeatDetailPage;
