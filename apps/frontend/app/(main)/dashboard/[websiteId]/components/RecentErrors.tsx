"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAxiosInstance } from "@/lib/axiosInstance";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

interface ErrorData {
  timestamp: string;
  status: "Bad";
}

/**
 * Renders a card displaying recent error occurrences for a specific website.
 *
 * Fetches and presents error data in a table with status and timestamp columns. Handles loading and error states with appropriate UI feedback. If no errors are found, shows a message indicating all systems are operational.
 */
export function RecentErrors() {
  const { websiteId } = useParams();
  const instance = useAxiosInstance();
  const [errorData, setErrorData] = useState<ErrorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchErrorData = async () => {
      try {
        const response = await instance.get(`/api/v1/website/error-graph`, {
          params: { websiteId },
        });
        setErrorData(response.data);
      } catch (err) {
        console.error("Failed to fetch error data:", err);
        setError("Failed to load error data");
      } finally {
        setLoading(false);
      }
    };

    fetchErrorData();
  }, [websiteId, instance]);

  const formatTimestamp = (isoString: string) => {
    const date = new Date(isoString);
    return format(date, "MMM dd, yyyy HH:mm:ss");
  };

  if (loading) {
    return (
      <Card className="bg-white dark:bg-gray-900 mb-5">
        <CardHeader>
          <CardTitle>Recent Errors</CardTitle>
          <CardDescription>Last 30 error occurrences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-white dark:bg-gray-900 mb-5">
        <CardHeader>
          <CardTitle>Recent Errors</CardTitle>
          <CardDescription>Error loading data</CardDescription>
        </CardHeader>
        <CardContent className="min-h-[100px] flex items-center justify-center">
          <div className="text-center text-rose-500">
            <AlertCircle className="mx-auto h-8 w-8 mb-2" />
            <p>{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white dark:bg-gray-900 mb-5">
      <CardHeader>
        <CardTitle>Recent Errors</CardTitle>
        <CardDescription>Last {errorData.length} error occurrences</CardDescription>
      </CardHeader>
      <CardContent>
        {errorData.length > 0 ? (
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Status</TableHead>
                  <TableHead>Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {errorData.map((error, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="h-3 w-3 rounded-full bg-rose-500 mr-2"></div>
                        <span className="font-medium">{error.status}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-4 w-4" />
                        {formatTimestamp(error.timestamp)}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="min-h-[100px] flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
            <div className="text-center mb-4">
              <div className="bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-full p-3 inline-block">
                <CheckCircle className="h-8 w-8" />
              </div>
            </div>
            <p className="text-lg font-medium">No recent errors</p>
            <p className="text-sm mt-1">All systems operational</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}