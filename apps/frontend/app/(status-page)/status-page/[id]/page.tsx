"use client"
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Maximize, BellOff } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useAxiosInstance } from "@/lib/axiosInstance";

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
  const { id } = useParams();
  const instance = useAxiosInstance();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [countdown, setCountdown] = useState(50);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [website, setWebsite] = useState<Website | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await instance.get(`/api/v1/website/status?websiteId=${id}`);
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
    } else if (latestTick.status === "Down" || latestTick.status === "down") {
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
    const upCount = website.ticks.filter((t) => t.status === "Good" || t.status === "good").length;
    uptime = (upCount / website.ticks.length) * 100;
  }

  return (
    <div className="min-h-screen bg-dark w-full bg-gray-100 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Status page</h1>
          <div className="text-right">
            <h2 className="text-2xl font-medium mb-1">Service status</h2>
            <p className="text-sm text-muted-foreground">
              Last updated {formatTime(currentTime)} | Next update in {countdown} sec.
            </p>
          </div>
        </div>
        {/* System Status Card */}
        <Card className="mb-8 rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center">
              <div className={`w-8 h-8 rounded-full ${statusColor}`}></div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span className="text-2xl font-medium mr-2">All systems</span>
              <span className={`text-2xl font-medium ${badgeColor.replace('bg-', 'text-')}`}>{displayStatus}</span>
              {latency !== null && (
                <span className="ml-2 text-sm text-muted-foreground">Latency: <span className="font-semibold text-white bg-gray-700 rounded px-2 py-0.5">{latency} ms</span></span>
              )}
            </div>
          </div>
        </Card>
        {/* Services Section */}
        <h2 className="text-2xl font-bold mb-4">Services</h2>
        <Card className="p-6 rounded-lg shadow-lg">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : website ? (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <span className="font-medium mr-2">{website.url}</span>
                  <span className="text-sm text-muted-foreground">→ {uptime.toFixed(2)}%</span>
                </div>
                <Badge className={`${badgeColor} text-white border-0`}>
                  {displayStatus}
                </Badge>
              </div>
              <div className="h-8">
                <Progress
                  value={uptime}
                  className="h-2"
                  style={{
                    background: "repeating-linear-gradient(90deg, #70809050 0px, #70809050 10px, #6070809050 10px, #70809050 20px)",
                  }}
                />
                <div className="h-1 w-full mt-1 bg-transparent relative">
                  <div
                    className={`absolute right-0 top-0 h-2 ${badgeColor}`}
                    style={{ width: '1%' }}
                  ></div>
                </div>
              </div>
              {latency !== null && (
                <div className="mt-2 text-sm text-muted-foreground">Latest latency: <span className="font-semibold text-white bg-gray-700 rounded px-2 py-0.5">{latency} ms</span></div>
              )}
            </div>
          ) : (
            <div>No website data found.</div>
          )}
        </Card>
        {/* Footer */}
        <div className="mt-12 flex justify-between items-center text-sm text-muted-foreground">
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 hover:text-white">
              <Maximize size={18} />
              <span>Fullscreen mode</span>
            </button>
            <button className="flex items-center gap-2 hover:text-white">
              <BellOff size={18} />
              <span>Alert sound off</span>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <a href="#" className="hover:text-white">Privacy policy</a>
            <span>|</span>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <span className="ml-2">Status page by</span>
            <span className="text-white font-medium">UptimeRobot</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatusPage;

