"use client";
import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronUp, Globe, Plus, Moon, Sun, Activity, BarChart4, Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { CreateWebsiteModal } from './components/CreateWebsiteModal';
import { useWebsites } from '@/hooks/useWebsites';
import axios from 'axios';
import { API_BACKEND_URL } from '@/config';
import { useAuth } from '@clerk/nextjs';
import { toast } from 'sonner';

type UptimeStatus = "good" | "bad" | "unknown";

// Custom tooltip component
function Tooltip({ content, children }: { content: string; children: React.ReactNode }) {
  return (
    <div className="group relative inline-block">
      {children}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        {content}
        <div className="absolute left-1/2 -translate-x-1/2 top-full -mt-1 border-x-4 border-x-transparent border-t-4 border-t-gray-900 dark:border-t-gray-700"></div>
      </div>
    </div>
  );
}

// Redesigned status circle with pulsing animation for active status
function StatusCircle({ status }: { status: UptimeStatus }) {
  return (
    <div className="relative flex items-center justify-center">
      <div className={`w-3.5 h-3.5 rounded-full ${status === 'good'
        ? 'bg-emerald-500 dark:bg-emerald-400'
        : status === 'bad'
          ? 'bg-rose-500 dark:bg-rose-400'
          : 'bg-gray-400 dark:bg-gray-500'
        }`} />
      {status === 'good' && (
        <div className="absolute inset-0 rounded-full bg-emerald-400 dark:bg-emerald-300 animate-ping opacity-75" style={{ animationDuration: '3s' }}></div>
      )}
    </div>
  );
}

// Enhanced uptime visualization with interactive bars
function UptimeTicks({ ticks, expanded }: { ticks: UptimeStatus[]; expanded: boolean }) {
  return (
    <div className={`flex gap-1 mt-3 transition-all duration-300 ${expanded ? 'h-10' : 'h-4'}`}>
      {ticks.map((tick, index) => {
        const height = expanded ?
          (tick === 'good' ? 'h-10' : tick === 'bad' ? 'h-4' : 'h-2') :
          (tick === 'good' ? 'h-4' : tick === 'bad' ? 'h-2' : 'h-1');

        return (
          <Tooltip key={index} content={`${index * 3}-${(index + 1) * 3} min ago: ${tick.charAt(0).toUpperCase() + tick.slice(1)}`}>
            <div
              className={`w-8 ${height} rounded-t-sm transition-all duration-300 transform hover:translate-y-[-2px] ${tick === 'good'
                ? 'bg-gradient-to-b from-emerald-400 to-emerald-500 dark:from-emerald-300 dark:to-emerald-500'
                : tick === 'bad'
                  ? 'bg-gradient-to-b from-rose-400 to-rose-500 dark:from-rose-300 dark:to-rose-500'
                  : 'bg-gradient-to-b from-gray-300 to-gray-400 dark:from-gray-500 dark:to-gray-600'
                }`}
              style={{ alignSelf: 'flex-end' }}
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

// Redesigned website card with enhanced visuals
function WebsiteCard({ website, onDelete }: { website: ProcessedWebsite; onDelete: (id: string) => void }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Format the URL for display
  const displayUrl = useMemo(() => {
    try {
      const urlObj = new URL(website.url);
      return urlObj.hostname;
    } catch {
      return website.url;
    }
  }, [website.url]);

  // Status label with appropriate icon
  const statusLabel = useMemo(() => {
    if (website.status === 'good') {
      return (
        <div className="flex items-center text-emerald-600 dark:text-emerald-400 text-sm font-medium">
          <CheckCircle className="w-4 h-4 mr-1" />
          Online
        </div>
      );
    } else if (website.status === 'bad') {
      return (
        <div className="flex items-center text-rose-600 dark:text-rose-400 text-sm font-medium">
          <XCircle className="w-4 h-4 mr-1" />
          Down
        </div>
      );
    } else {
      return (
        <div className="flex items-center text-amber-600 dark:text-amber-400 text-sm font-medium">
          <AlertTriangle className="w-4 h-4 mr-1" />
          Unknown
        </div>
      );
    }
  }, [website]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
      <div
        className="p-4 cursor-pointer flex items-center justify-between dark:hover:bg-gray-750 transition-colors duration-200"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <StatusCircle status={website.status} />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{displayUrl}</h3>
            <div className="flex items-center space-x-3 mt-0.5">
              {statusLabel}
              <div className="h-3 w-[1px] bg-gray-300 dark:bg-gray-600"></div>
              <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                <Clock className="w-3 h-3 mr-1" />
                {website.lastChecked}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="flex items-center justify-end">
              <BarChart4 className="w-4 h-4 mr-1 text-indigo-600 dark:text-indigo-400" />
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {website.uptimePercentage.toFixed(1)}%
              </span>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">uptime</span>
          </div>
          <div className="h-8 flex items-center justify-center space-x-2">
            <button
              onClick={async (e) => {
                e.stopPropagation();
                setIsDeleting(true);
                await onDelete(website.id);
                setIsDeleting(false);
              }}
              disabled={isDeleting}
              className="p-1 text-rose-500 hover:text-rose-700 dark:hover:text-rose-400 transition-colors duration-200"
              aria-label="Delete website"
            >
              {isDeleting ? (
                <div className="w-4 h-4 border-2 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <XCircle className="w-5 h-5" />
              )}
            </button>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            )}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pt-1 pb-4 border-t border-gray-100 dark:border-gray-700 animate-expandDown">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Last 30 minutes status:</p>
            <div className="flex space-x-3 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mr-1"></div>
                Good
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-rose-500 mr-1"></div>
                Down
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-gray-400 mr-1"></div>
                Unknown
              </div>
            </div>
          </div>
          <div className=" dark:bg-gray-750 rounded-lg p-3 pt-1">
            <UptimeTicks ticks={website.uptimeTicks} expanded={isExpanded} />
            <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
              <span>30 min ago</span>
              <span>Now</span>
            </div>
          </div>

          {/* Uptime statistics */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className=" dark:bg-gray-750 rounded-lg p-3">
              <h4 className="text-xs text-gray-500 dark:text-gray-400">Response Time</h4>
              <div className="flex items-end mt-1">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {Math.floor(Math.random() * 500) + 100}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1 mb-0.5">ms</span>
              </div>
            </div>
            <div className=" dark:bg-gray-750 rounded-lg p-3">
              <h4 className="text-xs text-gray-500 dark:text-gray-400">Outages (24h)</h4>
              <div className="flex items-end mt-1">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {website.status === 'bad' ? Math.floor(Math.random() * 3) + 1 : 0}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1 mb-0.5">incidents</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Enhanced loading spinner with logo overlay
function LoadingSpinner() {
  return (
    <div className="flex flex-col justify-center items-center py-10">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-indigo-200 dark:border-indigo-900 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Globe className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        </div>
      </div>
      <p className="mt-4 text-gray-600 dark:text-gray-300 animate-pulse">Loading websites...</p>
    </div>
  );
}

// Improved error message with retry button
function ErrorMessage({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-xl p-4 my-6 text-center">
      <XCircle className="w-10 h-10 text-rose-500 dark:text-rose-400 mx-auto mb-2" />
      <p className="text-rose-700 dark:text-rose-300 mb-3">{message}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 dark:bg-rose-500 dark:hover:bg-rose-600 rounded-lg transition-colors duration-200"
      >
        Try Again
      </button>
    </div>
  );
}

// Dashboard summary component
function DashboardSummary({ websites }: { websites: ProcessedWebsite[] }) {
  const stats = useMemo(() => {
    const totalSites = websites.length;
    const sitesByStatus = {
      good: websites.filter(site => site.status === 'good').length,
      bad: websites.filter(site => site.status === 'bad').length,
      unknown: websites.filter(site => site.status === 'unknown').length
    };

    const averageUptime = websites.length > 0
      ? websites.reduce((sum, site) => sum + site.uptimePercentage, 0) / websites.length
      : 0;

    return { totalSites, sitesByStatus, averageUptime };
  }, [websites]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center">
          <div className="rounded-full bg-indigo-100 dark:bg-indigo-900/30 p-3 mr-4">
            <Globe className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Websites</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalSites}</h3>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center">
          <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 p-3 mr-4">
            <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Average Uptime</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.averageUptime.toFixed(1)}%
            </h3>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center">
          <div className="rounded-full bg-amber-100 dark:bg-amber-900/30 p-3 mr-4">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Site Status</p>
            <div className="flex space-x-2 mt-1">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mr-1"></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{stats.sitesByStatus.good}</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-rose-500 mr-1"></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{stats.sitesByStatus.bad}</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-gray-400 mr-1"></div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{stats.sitesByStatus.unknown}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Empty state component
function EmptyState({ onAddWebsite }: { onAddWebsite: () => void }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 p-8 text-center">
      <div className="rounded-full bg-indigo-100 dark:bg-indigo-900/30 p-5 mx-auto w-20 h-20 flex items-center justify-center mb-4">
        <Globe className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No websites to monitor</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
        Add your first website to start monitoring its uptime and performance.
      </p>
      <button
        onClick={onAddWebsite}
        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium rounded-lg transition-colors duration-200 inline-flex items-center"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Your First Website
      </button>
    </div>
  );
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { websites, refreshWebsites } = useWebsites();
  const { getToken } = useAuth();

  const processedWebsites = useMemo(() => {
    return websites.map(website => {
      // Sort ticks by creation time
      const sortedTicks = [...website.ticks].sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      // Get the most recent 30 minutes of ticks
      const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
      const recentTicks = sortedTicks.filter(tick =>
        new Date(tick.createdAt) > thirtyMinutesAgo
      );

      // Aggregate ticks into 3-minute windows (10 windows total)
      const windows: UptimeStatus[] = [];

      for (let i = 0; i < 10; i++) {
        const windowStart = new Date(Date.now() - (i + 1) * 3 * 60 * 1000);
        const windowEnd = new Date(Date.now() - i * 3 * 60 * 1000);

        const windowTicks = recentTicks.filter(tick => {
          const tickTime = new Date(tick.createdAt);
          return tickTime >= windowStart && tickTime < windowEnd;
        });

        const upTicks = windowTicks.filter(tick => tick.status === 'Good').length;
        windows[9 - i] = windowTicks.length === 0
          ? 'unknown'
          : (upTicks / windowTicks.length) >= 0.5 ? 'good' : 'bad';
      }

      // Calculate overall uptime percentage
      const totalTicks = sortedTicks.length;
      const upTicks = sortedTicks.filter(tick => tick.status === 'Good').length;
      const uptimePercentage = totalTicks === 0 ? 100 : (upTicks / totalTicks) * 100;

      // Format the last checked time
      const lastChecked = sortedTicks[0]
        ? new Date(sortedTicks[0].createdAt).toLocaleTimeString()
        : 'Never';

      // ✅ NEW: Derive status from last 3 uptime ticks
      const lastThreeTicks = windows.slice(-3);
      const goodCount = lastThreeTicks.filter(status => status === 'good').length;
      const badCount = lastThreeTicks.filter(status => status === 'bad').length;

      let derivedStatus: 'good' | 'bad' | 'unknown';
      if (goodCount === 3) {
        derivedStatus = 'good';
      } else if (badCount === 3) {
        derivedStatus = 'bad';
      } else if (lastThreeTicks.every(t => t === 'unknown')) {
        derivedStatus = 'unknown';
      } else {
        derivedStatus = 'unknown';
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

  // Toggle dark mode
  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Fetch websites with loading and error handling
  React.useEffect(() => {
    setLoading(true);
    refreshWebsites()
      .then(() => setLoading(false))
      .catch(() => {
        setError('Failed to fetch websites');
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle adding a new website
  const handleAddWebsite = async (url: string | null, interval?: number) => {
    if (url === null) {
      setIsModalOpen(false);
      return;
    }

    setIsModalOpen(false);
    try {
      const token = await getToken();
      await axios.post(`${API_BACKEND_URL}/api/v1/website`, {
        url,
        interval
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await refreshWebsites();
      toast.success(`${url} is now being monitored`);

      toast(`${url} is now being monitored`,)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Failed to add website');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200 max-w-full w-full">
      <div className=" mx-auto py-6 px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 dark:bg-indigo-500 rounded-xl p-2">
              <Globe className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Uptime Monitor</h1>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 border border-gray-200 dark:border-gray-700"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-amber-500" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-600" />
              )}
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-2 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors duration-200 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span className="font-medium">Add Website</span>
            </button>
          </div>
        </div>

        {/* Dashboard summary */}
        {!loading && !error && processedWebsites.length > 0 && (
          <DashboardSummary websites={processedWebsites} />
        )}

        {/* Content */}
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
                  setError('Failed to fetch websites');
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
                          websiteId: id
                        }
                      });
                      await refreshWebsites();
                      toast.success('Website deleted successfully');
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    } catch (err) {
                      toast.error('Failed to delete website');
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

      {/* Add website modal */}
      <CreateWebsiteModal
        isOpen={isModalOpen}
        onClose={handleAddWebsite}
      />
    </div>
  );
}

export default App;
