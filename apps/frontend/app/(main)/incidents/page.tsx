'use client'
import React, { useEffect, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertCircle, Trash2, X } from "lucide-react";
import { useAxiosInstance } from "@/lib/axiosInstance";

function IncidentsSection() {
  const [incidentsData, setIncidentsData] = useState([]);
  const instance = useAxiosInstance();

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await instance.get("/api/v1/incidents");
        setIncidentsData(response.data?.incidents);
      } catch (error) {
        console.error("Failed to fetch incidents:", error);
      }
    };

    fetchIncidents();
  }, [instance]);

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    });
  };

  const getStatusColor = (status: string) => {
    return status === "Ongoing" ? "text-red-500" : "text-green-500";
  };

  const getErrorColor = (errorCode: string) => {
    switch (errorCode) {
      case "HEARTBEAT_DOWN":
        return { bg: "bg-red-900/30", text: "text-red-300" };
      // Add more cases as needed
      default:
        return { bg: "bg-gray-800", text: "text-gray-300" };
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 p-10 dark:bg-gray-900">
      <h2 className="mb-10 text-2xl font-semibold text-white">Incidents.</h2>

      <Alert className="mb-10 border-indigo-800 bg-indigo-900/40 text-white">
        <AlertCircle className="h-4 w-4 text-white" />
        <AlertDescription className="flex w-full items-center justify-between">
          <div>
            <span className="font-medium">Possible IP Allowlist Issue</span>
            <span className="ml-2 text-gray-300">{`If you're using a firewall, please ensure our new IPs are allowlisted to avoid potential monitoring issues.`}</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="link" className="text-white underline">
              Check IP list
            </Button>
            <Button variant="ghost" size="sm" className="h-auto p-0">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </AlertDescription>
      </Alert>

      <div className="mb-14 flex justify-between flex-col gap-10">
        <div className="mb-10 lg:mb-0 w-full">
          <h1 className="text-4xl font-bold">
            Your <span className="text-green-500">incidents</span>{" "}
            <span className="text-green-500">overview</span> on the way!
          </h1>

          <p className="mt-8 text-gray-300">
            Once we detect some incidents, they will be neatly displayed for
            quick and easy understanding. 🧠
          </p>
        </div>

        <div className="w-full">
          <Table className="overflow-hidden rounded-lg border border-gray-800">
            <TableHeader className="bg-gray-900/60">
              <TableRow className="border-b border-gray-800">
                <TableHead className="font-medium text-gray-400">
                  Status
                </TableHead>
                <TableHead className="font-medium text-gray-400">
                  Root cause
                </TableHead>
                <TableHead className="font-medium text-gray-400">
                  Comments
                </TableHead>
                <TableHead className="font-medium text-gray-400">
                  Started
                </TableHead>
                <TableHead className="font-medium text-gray-400">
                  Duration
                </TableHead>
                <TableHead className="font-medium text-gray-400"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-gray-900/40">
              {incidentsData?.length > 0 ? incidentsData.map((incident: {
                id: string;
                status: string;
                errorCode: string;
                errorText: string;
                comments: number;
                date: string;
                duration: number;
              }) => {
                const errorColors = getErrorColor(incident.errorCode);
                return (
                  <TableRow key={incident.id} className="border-b border-gray-800">
                    <TableCell>
                      <div className="flex items-center">
                        <span className="flex items-center">
                          <span className={`mr-2 h-2 w-2 rounded-full ${incident.status === "Ongoing" ? "bg-red-500" : "bg-green-500"}`}></span>
                          <span className={getStatusColor(incident.status)}>
                            {incident.status}
                          </span>
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center ${errorColors.bg} ${errorColors.text} rounded-md px-2 py-1`}>
                        <span className="mr-2 font-medium">
                          {incident.errorCode}
                        </span>
                        <span className="text-sm">{incident.errorText}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-400">
                        {incident.comments} comments
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-300">
                        {formatDate(incident.date)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-400">
                        {incident.duration} min
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-gray-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              }) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-400">
                    No incidents found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default IncidentsSection;
