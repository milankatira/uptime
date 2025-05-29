"use client";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAxiosInstance } from "@/lib/axiosInstance";
import { BellOff, Maximize, Minimize } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

// TypeScript interfaces for Website and Tick
type Tick = {
    id: string;
    websiteId: string;
    createdAt: string;
    status: string;
    latency: number;
};

type Website = {
    id: string;
    url: string;
    userId?: string;
    interval?: number;
    disabled?: boolean;
    ticks: Tick[];
};

function StatusPage() {
    const params = useParams();
    const id = params?.id as string;
    const instance = useAxiosInstance();
    const [currentTime, setCurrentTime] = useState(new Date());
    const [countdown, setCountdown] = useState(50);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [website, setWebsite] = useState<Website | null>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            if (containerRef.current?.requestFullscreen) {
                containerRef.current.requestFullscreen();
                setIsFullscreen(true);
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
    };

    // Listen for fullscreen change
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => {
            document.removeEventListener(
                "fullscreenchange",
                handleFullscreenChange,
            );
        };
    }, []);
    useEffect(() => {
        const fetchStatus = async () => {
            setLoading(true);
            setError("");
            try {
                const res = await instance.get(
                    `/api/v1/website/status?websiteId=${id}`,
                );
                setWebsite(res.data);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
                setError("Failed to fetch website status");
            } finally {
                setLoading(false);
            }
        };
        fetchStatus();
        // Optionally, refresh every 50s
        const interval = setInterval(fetchStatus, 50000);
        return () => clearInterval(interval);
    }, [id, instance]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
            setCountdown((prev) => (prev > 0 ? prev - 1 : 50));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        return date.toTimeString().substring(0, 8);
    };

    // Compute status, uptime, and latency
    let statusLabel = "Unknown";
    let statusColor = "bg-gray-400";
    let badgeColor = "bg-gray-400";
    let displayStatus = "Unknown";
    let latency = null;
    let uptime = 0;
    if (website && website?.ticks && website.ticks.length > 0) {
        const latestTick = website.ticks[website.ticks.length - 1];
        // Map status values
        if (latestTick.status === "Good" || latestTick.status === "good") {
            statusLabel = "Good";
            statusColor = "bg-green-500";
            badgeColor = "bg-green-500";
            displayStatus = "Operational";
        } else if (
            latestTick.status === "Down" ||
            latestTick.status === "down"
        ) {
            statusLabel = "Down";
            statusColor = "bg-red-500";
            badgeColor = "bg-red-500";
            displayStatus = "Outage";
        } else {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            statusLabel = latestTick.status;
            statusColor = "bg-gray-400";
            badgeColor = "bg-gray-400";
            displayStatus = latestTick.status;
        }
        latency = latestTick.latency;
        // Uptime: percent of ticks with status 'Good' or 'good'
        const upCount = website.ticks.filter(
            (t) => t.status === "Good" || t.status === "good",
        ).length;
        uptime = (upCount / website.ticks.length) * 100;
    }

    return (
        <div ref={containerRef} className="min-h-screen w-full bg-gray-900">
            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-4xl font-bold">Status page</h1>
                    <div className="text-right">
                        <h2 className="mb-1 text-2xl font-medium">
                            Service status
                        </h2>
                        <p className="text-sm text-gray-200">
                            Last updated {formatTime(currentTime)} | Next update
                            in {countdown} sec.
                        </p>
                    </div>
                </div>
                {/* System Status Card */}
                <Card className="mb-8 rounded-lg bg-white p-6 text-black shadow-lg">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full">
                            <div
                                className={`h-8 w-8 rounded-full ${statusColor}`}
                            ></div>
                        </div>
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                            <span className="mr-2 text-2xl font-medium">
                                All systems
                            </span>
                            <span
                                className={`text-2xl font-medium ${badgeColor.replace("bg-", "text-")}`}
                            >
                                {displayStatus}
                            </span>
                            {latency !== null && (
                                <span className="ml-2 text-sm text-gray-800">
                                    Latency:{" "}
                                    <span className="rounded bg-gray-700 px-2 py-0.5 font-semibold text-white">
                                        {latency} ms
                                    </span>
                                </span>
                            )}
                        </div>
                    </div>
                </Card>
                {/* Services Section */}
                <h2 className="mb-4 text-2xl font-bold">Services</h2>
                <Card className="rounded-lg bg-white p-6 text-black shadow-lg">
                    {loading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div className="text-red-500">{error}</div>
                    ) : website ? (
                        <div className="mb-4">
                            <div className="mb-2 flex items-center justify-between">
                                <div className="flex items-center">
                                    <span className="mr-2 font-medium">
                                        {website.url}
                                    </span>
                                    <span className="text-sm text-gray-800">
                                        → {uptime.toFixed(2)}%
                                    </span>
                                </div>
                                <Badge
                                    className={`${badgeColor} border-0 text-white`}
                                >
                                    {displayStatus}
                                </Badge>
                            </div>
                            <div className="h-8">
                                <Progress
                                    value={uptime}
                                    className="h-2"
                                    style={{
                                        background:
                                            "repeating-linear-gradient(90deg, #70809050 0px, #70809050 10px, #6070809050 10px, #70809050 20px)",
                                    }}
                                />
                                <div className="relative mt-1 h-1 w-full bg-transparent">
                                    <div
                                        className={`absolute top-0 right-0 h-2 ${badgeColor}`}
                                        style={{ width: "1%" }}
                                    ></div>
                                </div>
                            </div>
                            {latency !== null && (
                                <div className="mt-2 text-sm text-gray-800">
                                    Latest latency:{" "}
                                    <span className="rounded bg-gray-700 px-2 py-0.5 font-semibold text-white">
                                        {latency} ms
                                    </span>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>No website data found.</div>
                    )}
                </Card>
                {/* Footer */}
                <div className="mt-12 flex items-center justify-between text-sm text-gray-200">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={toggleFullscreen}
                            className="flex items-center gap-2 transition-colors hover:text-white"
                        >
                            {isFullscreen ? (
                                <>
                                    <Minimize size={16} />
                                    <span>Exit fullscreen</span>
                                </>
                            ) : (
                                <>
                                    <Maximize size={16} />
                                    <span>Fullscreen mode</span>
                                </>
                            )}
                        </button>
                        <button className="flex items-center gap-2 hover:text-white">
                            <BellOff size={18} />
                            <span>Alert sound off</span>
                        </button>
                    </div>
                    <div className="flex items-center gap-2">
                        <a href="#" className="hover:text-white">
                            Privacy policy
                        </a>
                        <span>|</span>
                        <a href="#" className="hover:text-white">
                            Terms of Service
                        </a>
                        <span className="ml-2">Status page by</span>
                        <span className="font-medium text-white">
                            UptimeRobot
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StatusPage;
