"use client";
import { API_BACKEND_URL } from "@/config";
import { useWebsites } from "@/hooks/useWebsites";
import { CreateOrganization, useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import {
  Activity,
  AlertTriangle,
  BarChart4,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Globe,
  Plus,
  XCircle,
} from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { CreateWebsiteModal } from "./components/CreateWebsiteModal";

// import { syncUserInDb, updateUserOrganizationIds } from "@/action/user.action";
import { Button } from "@/components/ui/button";
import { useAxiosInstance } from "@/lib/axiosInstance";

type UptimeStatus = "good" | "bad" | "unknown";

function Tooltip({
  content,
  children,
}: {
  content: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative inline-block">
      {children}
      <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-md bg-gray-900 px-3 py-2 text-xs whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:bg-gray-700">
        {content}
        <div className="absolute top-full left-1/2 -mt-1 -translate-x-1/2 border-x-4 border-t-4 border-x-transparent border-t-gray-900 dark:border-t-gray-700"></div>
      </div>
    </div>
  );
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

function UptimeTicks({
  ticks,
  expanded,
}: {
  ticks: UptimeStatus[];
  expanded: boolean;
}) {
  return (
    <div
      className={`mt-3 flex gap-1 transition-all duration-300 ${expanded ? "h-10" : "h-4"}`}
    >
      {ticks.map((tick, index) => {
        const height = expanded
          ? tick === "good"
            ? "h-10"
            : tick === "bad"
              ? "h-4"
              : "h-2"
          : tick === "good"
            ? "h-4"
            : tick === "bad"
              ? "h-2"
              : "h-1";

        return (
          <Tooltip
            key={index}
            content={`${index * 3}-${(index + 1) * 3} min ago: ${tick.charAt(0).toUpperCase() + tick.slice(1)}`}
          >
            <div
              className={`w-8 ${height} transform rounded-t-sm transition-all duration-300 hover:translate-y-[-2px] ${tick === "good"
                ? "bg-gradient-to-b from-emerald-400 to-emerald-500 dark:from-emerald-300 dark:to-emerald-500"
                : tick === "bad"
                  ? "bg-gradient-to-b from-rose-400 to-rose-500 dark:from-rose-300 dark:to-rose-500"
                  : "bg-gradient-to-b from-gray-300 to-gray-400 dark:from-gray-500 dark:to-gray-600"
                }`}
              style={{ alignSelf: "flex-end" }}
            />
          </Tooltip>
        );
      })}
    </div>
  );
}

interface ProcessedWebsite {
  id: string;
  url: string;
  status: UptimeStatus;
  uptimePercentage: number;
  lastChecked: string;
  uptimeTicks: UptimeStatus[];
}

function WebsiteCard({
  website,
  onDelete,
}: {
  website: ProcessedWebsite;
  onDelete: (id: string) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const displayUrl = useMemo(() => {
    try {
      const urlObj = new URL(website.url);
      return urlObj.hostname;
    } catch {
      return website.url;
    }
  }, [website.url]);

  const statusLabel = useMemo(() => {
    if (website.status === "good") {
      return (
        <div className="flex items-center text-sm font-medium text-emerald-600 dark:text-emerald-400">
          <CheckCircle className="mr-1 h-4 w-4" />
          Online
        </div>
      );
    } else if (website.status === "bad") {
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
  }, [website]);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-shadow duration-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <div
        className="dark:hover:bg-gray-750 flex cursor-pointer items-center justify-between p-4 transition-colors duration-200"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <StatusCircle status={website.status} />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {displayUrl}
            </h3>
            <div className="mt-0.5 flex items-center space-x-3">
              {statusLabel}
              <div className="h-3 w-[1px] bg-gray-300 dark:bg-gray-600"></div>
              <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                <Clock className="mr-1 h-3 w-3" />
                {website.lastChecked}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="flex items-center justify-end">
              <BarChart4 className="mr-1 h-4 w-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {website.uptimePercentage.toFixed(1)}%
              </span>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              uptime
            </span>
          </div>
          <div className="flex h-8 items-center justify-center space-x-2">
            <button
              onClick={async (e) => {
                e.stopPropagation();
                setIsDeleting(true);
                await onDelete(website.id);
                setIsDeleting(false);
              }}
              disabled={isDeleting}
              className="p-1 text-rose-500 transition-colors duration-200 hover:text-rose-700 dark:hover:text-rose-400"
              aria-label="Delete website"
            >
              {isDeleting ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-rose-500 border-t-transparent"></div>
              ) : (
                <XCircle className="h-5 w-5" />
              )}
            </button>
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            )}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="animate-expandDown border-t border-gray-100 px-4 pt-1 pb-4 dark:border-gray-700">
          <div className="mb-1 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Last 30 minutes status:
            </p>
            <div className="flex space-x-3 text-xs text-gray-500 dark:text-gray-400">
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
          </div>
          <div className="dark:bg-gray-750 rounded-lg p-3 pt-1">
            <UptimeTicks ticks={website.uptimeTicks} expanded={isExpanded} />
            <div className="mt-1 flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>30 min ago</span>
              <span>Now</span>
            </div>
          </div>

          {/* Uptime statistics */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="dark:bg-gray-750 rounded-lg p-3">
              <h4 className="text-xs text-gray-500 dark:text-gray-400">
                Response Time
              </h4>
              <div className="mt-1 flex items-end">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {Math.floor(Math.random() * 500) + 100}
                </span>
                <span className="mb-0.5 ml-1 text-xs text-gray-500 dark:text-gray-400">
                  ms
                </span>
              </div>
            </div>
            <div className="dark:bg-gray-750 rounded-lg p-3">
              <h4 className="text-xs text-gray-500 dark:text-gray-400">
                Outages (24h)
              </h4>
              <div className="mt-1 flex items-end">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {website.status === "bad"
                    ? Math.floor(Math.random() * 3) + 1
                    : 0}
                </span>
                <span className="mb-0.5 ml-1 text-xs text-gray-500 dark:text-gray-400">
                  incidents
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="w-full space-y-4">
      {/* Shimmer effect for summary cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-32 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700"
          />
        ))}
      </div>

      {/* Shimmer effect for website cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-40 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700"
          />
        ))}
      </div>
    </div>
  );
}

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

function DashboardSummary({ websites }: { websites: ProcessedWebsite[] }) {
  const stats = useMemo(() => {
    const totalSites = websites.length;
    const sitesByStatus = {
      good: websites.filter((site) => site.status === "good").length,
      bad: websites.filter((site) => site.status === "bad").length,
      unknown: websites.filter((site) => site.status === "unknown").length,
    };

    const averageUptime =
      websites.length > 0
        ? websites.reduce((sum, site) => sum + site.uptimePercentage, 0) /
        websites.length
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
        Add your first website to start monitoring its uptime and performance.
      </p>
      <Button onClick={onAddWebsite}>
        <Plus className="mr-2 h-4 w-4" />
        Add Your First Website
      </Button>
    </div>
  );
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { websites, refreshWebsites } = useWebsites();
  const { getToken } = useAuth();
  const { user } = useUser(); // Removed the 'as userData' alias
  const instance = useAxiosInstance(); // Get the authenticated axios instance




  const processedWebsites = useMemo(() => {
    return websites.map((website) => {
      const sortedTicks = [...website.ticks].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

      const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
      const recentTicks = sortedTicks.filter(
        (tick) => new Date(tick.createdAt) > thirtyMinutesAgo,
      );

      const windows: UptimeStatus[] = [];

      for (let i = 0; i < 10; i++) {
        const windowStart = new Date(Date.now() - (i + 1) * 3 * 60 * 1000);
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
        totalTicks === 0 ? 100 : (upTicks / totalTicks) * 100;

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const syncUser = async () => {
      try {
        console.log("user", user?.imageUrl, user?.primaryEmailAddress?.emailAddress)
        // await syncUserInDb(); // Commented out the old call
        await instance.post("/api/v1/user", { email: user?.primaryEmailAddress?.emailAddress, imageUrl: user?.imageUrl });
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
      await instance.post(
        `/api/v1/website`,
        {
          url,
          interval,
        }
      );
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
                      await axios.delete(`${API_BACKEND_URL}/api/v1/website`, {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                        data: {
                          websiteId: id,
                        },
                      });
                      await refreshWebsites();
                      toast.success("Website deleted successfully");
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    } catch (err) {
                      toast.error("Failed to delete website");
                    }
                  }}
                />
              ))
            ) : (
              <EmptyState onAddWebsite={() => setIsModalOpen(true)} />
            )}
          </div>
        )}
      </div>

      <CreateWebsiteModal isOpen={isModalOpen} onClose={handleAddWebsite} />
    </div>
  );
}

export default App;
