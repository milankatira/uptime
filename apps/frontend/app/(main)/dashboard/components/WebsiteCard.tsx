import { API_BACKEND_URL } from "@/config";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import {
  AlertTriangle,
  BarChart4,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { toast } from "sonner";

type UptimeStatus = "good" | "bad" | "unknown";

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

interface ProcessedWebsite {
  id: string;
  url: string;
  status: UptimeStatus;
  uptimePercentage: number;
  lastChecked: string;
  uptimeTicks: UptimeStatus[];
  interval: number;
}

export function WebsiteCard({
  website,
  onDelete,
}: {
  website: ProcessedWebsite;
  onDelete: (id: string) => void;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { getToken } = useAuth();

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

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
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
      onDelete(id);
      toast.success("Website deleted successfully");

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Failed to delete website");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-shadow duration-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 flex flex-row w-full pr-5">
      <Link href={`/dashboard/${website.id}`} passHref className="w-full">
        <div className="dark:hover:bg-gray-750 flex cursor-pointer items-center p-4 transition-colors duration-200 w-full flex-1">
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
                  Last check <Clock className="mx-2 h-3 w-3" />
                  {website.lastChecked}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
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
        <button
          onClick={async (e) => {
            e.stopPropagation();
            await handleDelete(website.id);
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
      </div>
    </div>
  );
}
