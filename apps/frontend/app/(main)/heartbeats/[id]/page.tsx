'use client'
import React,{ useEffect, useState } from "react";
import {
  AlertTriangle,
  Copy,
  Pause,
  Send,
  Calendar,
  ArrowLeftCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import Link from "next/link";
import { useParams } from 'next/navigation';
import { API_BACKEND_URL } from "@/config";
import { useAxiosInstance } from "@/lib/axiosInstance";

const HeartbeatDetailPage = () => {
  const { id } = useParams();
  const instance=useAxiosInstance();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{from: string, to: string}>({
    from: "2025-05-10",
    to: "2025-05-13"
  });
  const [heartbeatDetails, setHeartbeatDetails] = useState({
    name: '',
    status: '',
    interval: 0,
    HeartbeatRecord: []
  });

  console.log(heartbeatDetails,"heartbeatDetails")
  const [loading, setLoading] = useState(true);
  const heartbeatDownUrl = `${API_BACKEND_URL}/api/v1/heartbeat/down/${id}`;
  const heartbeatUpUrl = `${API_BACKEND_URL}/api/v1/heartbeat/up/${id}`;

  const mockStats = {
    currentPending: {
      days: 3,
      hours: 14,
      mins: 57
    },
    lastRecorded: "waiting",
    incidentCount: 0
  };

  const availabilityData = [
    { period: "Today", availability: "100.0000%", downtime: "none", incidents: 0, longestIncident: "none", avgIncident: "none" },
    { period: "Last 7 days", availability: "100.0000%", downtime: "none", incidents: 0, longestIncident: "none", avgIncident: "none" },
    { period: "Last 30 days", availability: "100.0000%", downtime: "none", incidents: 0, longestIncident: "none", avgIncident: "none" },
    { period: "Last 365 days", availability: "100.0000%", downtime: "none", incidents: 0, longestIncident: "none", avgIncident: "none" },
    { period: "All time (Last 4 days)", availability: "100.0000%", downtime: "none", incidents: 0, longestIncident: "none", avgIncident: "none" }
  ];

  const handleSendTestAlert = () => {
    // This would handle sending a test alert
    toast.info("Test alert sent", {
      description: "A test alert has been sent to your configured channels"
    });
  };

  const handleCalculate = () => {
    // This would handle date range calculations
    toast.info("Calculating availability", {
      description: `Calculating availability between ${dateRange.from} and ${dateRange.to}`
    });
  };


  useEffect(() => {
    const fetchHeartbeatDetails = async () => {
      try {
        const response = await instance.get(`${API_BACKEND_URL}/api/v1/heartbeat-details/${id}`);
        if (!response) {
          throw new Error('Failed to fetch heartbeat details');
        }

        setHeartbeatDetails(response.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error:any) {
        toast.error("Failed to fetch heartbeat details", {
          description: error.message
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
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 w-full">
        <div className="max-w-full p-6 md:p-8">
          {/* Shimmer for breadcrumb */}
          <div className="h-6 w-1/3 bg-gray-700 rounded mb-10 animate-pulse"></div>

          {/* Shimmer for header */}
          <div className="flex items-center mb-8">
            <div className="h-12 w-12 bg-gray-700 rounded-full mr-4 animate-pulse"></div>
            <div className="flex-1">
              <div className="h-8 w-1/2 bg-gray-700 rounded mb-2 animate-pulse"></div>
              <div className="h-4 w-3/4 bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Shimmer for action buttons */}
          <div className="flex gap-3 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 w-24 bg-gray-700 rounded animate-pulse"></div>
            ))}
          </div>

          {/* Shimmer for URL section */}
          <div className="bg-dark-lighter rounded-lg border border-dark-border p-6 mb-8">
            <div className="h-6 w-1/2 bg-gray-700 rounded mb-5 animate-pulse"></div>
            <div className="h-16 bg-gray-700 rounded mb-4 animate-pulse"></div>
            <div className="h-16 bg-gray-700 rounded mb-6 animate-pulse"></div>
            <div className="h-4 w-3/4 bg-gray-700 rounded animate-pulse"></div>
          </div>

          {/* Shimmer for stats grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-700 rounded-lg animate-pulse"></div>
            ))}
          </div>

          {/* Shimmer for availability table */}
          <div className="bg-dark-lighter rounded-lg border border-dark-border overflow-x-auto mb-8">
            <div className="h-12 bg-gray-700 rounded-t-lg animate-pulse"></div>
            <div className="p-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-12 bg-gray-700 rounded mb-2 animate-pulse"></div>
              ))}
            </div>
          </div>

          {/* Shimmer for date range selector */}
          <div className="bg-dark-lighter rounded-lg border border-dark-border p-6 mb-8">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="h-6 w-16 bg-gray-700 rounded mb-2 animate-pulse"></div>
                <div className="h-10 bg-gray-700 rounded animate-pulse"></div>
              </div>
              <div className="flex-1">
                <div className="h-6 w-16 bg-gray-700 rounded mb-2 animate-pulse"></div>
                <div className="h-10 bg-gray-700 rounded animate-pulse"></div>
              </div>
              <div className="h-10 w-24 bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 w-full">
      <div className="max-w-full p-6 md:p-8">
        {/* Breadcrumb navigation */}
        <div className="flex items-center mb-10 text-sm">
          <Link href="/heartbeats" className="text-gray-400 hover:text-gray-200 flex items-center">
            <ArrowLeftCircle className="h-4 w-4 mr-2" />
            Heartbeats
          </Link>
          <span className="text-gray-600 mx-2">/</span>
          <span className="text-gray-200">
            {heartbeatDetails?.name}
          </span>
        </div>

        {/* Heartbeat header */}
        <div className="flex items-center mb-8">
          <div className="h-12 w-12 rounded-full bg-dark-lighter border border-dark-border flex items-center justify-center mr-4">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-6 w-6 text-gray-400">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-white">    {heartbeatDetails?.name}</h1>
            <div className="text-gray-400 text-sm flex items-center">
              <span className="mr-2">Pending</span>
              <span className="mx-2">•</span>
              <span>Expected every 1 day</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Button
            variant="outline"
            className="bg-dark-lighter border-dark-border text-gray-300 hover:text-white hover:bg-dark-lighter"
            onClick={handleSendTestAlert}
          >
            <Send className="h-4 w-4 mr-2" />
            Send test alert
          </Button>
          <Button
            variant="outline"
            className="bg-dark-lighter border-dark-border text-gray-300 hover:text-white hover:bg-dark-lighter"
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            Incidents
          </Button>
          <Button
            variant="outline"
            className="bg-dark-lighter border-dark-border text-gray-300 hover:text-white hover:bg-dark-lighter"
          >
            <Pause className="h-4 w-4 mr-2" />
            Pause
          </Button>
          <Button
            variant="outline"
            className="bg-dark-lighter border-dark-border text-gray-300 hover:text-white hover:bg-dark-lighter"
            onClick={() => setIsDialogOpen(true)}
          >
            <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Configure
          </Button>
        </div>

        {/* URL instruction section */}
        <div className="bg-dark-lighter rounded-lg border border-dark-border p-6 mb-8">
          <div className="flex justify-between items-center mb-5">
            <p className="text-gray-300">Make a HEAD, GET, or a POST request to the following URLs</p>
          </div>

          {/* Down URL */}
          <div className="bg-dark border border-dark-border rounded p-4 mb-4">
            <div className="flex justify-between items-center">
              <code className="text-red-500 break-all">{heartbeatDownUrl}</code>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-gray-200"
                onClick={() => navigator.clipboard.writeText(heartbeatDownUrl)}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
            <p className="text-sm text-gray-400 mt-2">Use this URL to report a failure (500 status)</p>
          </div>

          {/* Up URL */}
          <div className="bg-dark border border-dark-border rounded p-4 mb-6">
            <div className="flex justify-between items-center">
              <code className="text-green-500 break-all">{heartbeatUpUrl}</code>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-gray-200"
                onClick={() => navigator.clipboard.writeText(heartbeatUpUrl)}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
            <p className="text-sm text-gray-400 mt-2">Use this URL to report a successful heartbeat</p>
          </div>

          <p className="text-sm text-gray-400">
            You can also append <code className="text-gray-300">/fail</code> or <code className="text-gray-300">/&lt;exit-code&gt;</code> to the URL. Read our <a href="#" className="text-blue-400 hover:underline">documentation</a> for more details.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-dark-lighter rounded-lg border border-dark-border p-6">
            <p className="text-sm text-gray-400 mb-1">Currently pending for</p>
            <h2 className="text-xl font-semibold text-white">
              {mockStats.currentPending.days} days {mockStats.currentPending.hours} hours {mockStats.currentPending.mins} mins
            </h2>
          </div>

          <div className="bg-dark-lighter rounded-lg border border-dark-border p-6">
            <p className="text-sm text-gray-400 mb-1">Last heartbeat recorded</p>
            <h2 className="text-xl font-semibold text-white">{mockStats.lastRecorded}</h2>
          </div>

          <div className="bg-dark-lighter rounded-lg border border-dark-border p-6">
            <p className="text-sm text-gray-400 mb-1">Incidents</p>
            <h2 className="text-xl font-semibold text-white">{mockStats.incidentCount}</h2>
          </div>
        </div>

        {/* Availability Table */}
        <div className="bg-dark-lighter rounded-lg border border-dark-border overflow-x-auto mb-8">
          <Table>
            <TableHeader>
              <TableRow className="bg-dark border-dark-border hover:bg-dark">
                <TableHead className="text-gray-300">Time period</TableHead>
                <TableHead className="text-gray-300">Availability</TableHead>
                <TableHead className="text-gray-300">Downtime</TableHead>
                <TableHead className="text-gray-300">Incidents</TableHead>
                <TableHead className="text-gray-300">Longest incident</TableHead>
                <TableHead className="text-gray-300">Avg. incident</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {availabilityData.map((row, index) => (
                <TableRow
                  key={index}
                  className="border-dark-border hover:bg-dark/40"
                >
                  <TableCell className="text-gray-200">{row.period}</TableCell>
                  <TableCell className="text-green-500">{row.availability}</TableCell>
                  <TableCell className="text-gray-300">{row.downtime}</TableCell>
                  <TableCell className="text-gray-300">{row.incidents}</TableCell>
                  <TableCell className="text-gray-300">{row.longestIncident}</TableCell>
                  <TableCell className="text-gray-300">{row.avgIncident}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Date Range Selector */}
        <div className="bg-dark-lighter rounded-lg border border-dark-border p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm text-gray-400 mb-2">From</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  type="date"
                  value={dateRange.from}
                  onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
                  className="pl-10 bg-dark border-dark-border text-gray-200 hover:border-gray-600 focus:border-gray-500"
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm text-gray-400 mb-2">To</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  type="date"
                  value={dateRange.to}
                  onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
                  className="pl-10 bg-dark border-dark-border text-gray-200 hover:border-gray-600 focus:border-gray-500"
                />
              </div>
            </div>
            <div>
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={handleCalculate}
              >
                Calculate
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-center mb-4">
          <div className="inline-flex items-center bg-dark-lighter px-6 py-3 rounded-full border border-dark-border text-gray-400">
            <span className="h-2 w-2 rounded-full bg-blue-400 mr-2"></span>
            Need help? Let us know at <a href="mailto:hello@betterstack.com" className="ml-1 text-blue-400 hover:underline">hello@betterstack.com</a>
          </div>
        </div>

        {/* Configure Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-dark-lighter border-dark-border text-white">
            <DialogHeader>
              <DialogTitle>Configure Heartbeat</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div>
                <label className="text-sm text-gray-400 block mb-2">Name</label>
                <Input
                  defaultValue="dskndnjrd"
                  className="bg-dark border-dark-border text-gray-200"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-2">Expected every</label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    defaultValue="1"
                    className="bg-dark border-dark-border text-gray-200"
                  />
                  <select className="bg-dark border border-dark-border text-gray-200 rounded-md px-3 py-2">
                    <option>minute</option>
                    <option>hour</option>
                    <option selected>day</option>
                    <option>week</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-dark-border text-gray-300 hover:bg-dark">
                Cancel
              </Button>
              <Button className="bg-indigo-600 hover:bg-indigo-700">Save changes</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default HeartbeatDetailPage;
