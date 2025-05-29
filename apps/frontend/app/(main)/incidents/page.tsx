"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAxiosInstance } from "@/lib/axiosInstance";
import { MoreHorizontal, Search, ShieldAlert } from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ReportIncidentModal } from "@/components/incidents/ReportIncidentModal";

interface Incident {
    id: string;
    status: "Ongoing" | "Resolved" | "Acknowledged";
    errorCode: string;
    errorText: string;
    comments: number;
    date: string;
    duration: number;
    monitorName?: string;
}

const ShimmerIncidentItem = () => (
    <div className="grid animate-pulse grid-cols-[auto_1fr_auto] items-center gap-4 rounded-lg border border-gray-700/50 bg-[#2a2a36]/70 p-4 md:grid-cols-[minmax(0,_3fr)_1fr_1fr_auto]">
        <div className="col-span-3 flex items-center gap-3 md:col-span-1">
            <div className="h-8 w-8 flex-shrink-0 rounded-md bg-gray-600"></div>
            <div>
                <div className="mb-1 h-5 w-32 rounded bg-gray-600"></div>
                <div className="h-3 w-24 rounded bg-gray-600"></div>
            </div>
        </div>
        <div className="h-4 w-20 rounded bg-gray-600 md:text-left"></div>
        <div className="h-4 w-16 rounded bg-gray-600 md:text-left"></div>
        <div className="flex justify-end">
            <div className="h-8 w-8 rounded-full bg-gray-600"></div>
        </div>
    </div>
);

/**
 * Displays a searchable and filterable list of incidents with status indicators and supports reporting new incidents via a modal.
 *
 * Fetches incidents from the API, allows filtering by monitor name, error code, or error text, and presents incident details with visual status cues. The list automatically refreshes after a new incident is reported.
 */
function IncidentsSection() {
    const [incidentsData, setIncidentsData] = useState<Incident[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const instance = useAxiosInstance();

    const fetchIncidents = async () => {
        setLoading(true);
        try {
            const response = await instance.get<{ incidents: Incident[] }>(
                "/api/v1/incidents",
            );
            setIncidentsData(response.data.incidents || []);
        } catch (error) {
            console.error("Failed to fetch incidents:", error);
            setIncidentsData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIncidents();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [instance]);

    const formatDate = (dateString: string | number | Date) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor(
            (now.getTime() - date.getTime()) / 1000,
        );
        if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours} hours ago`;
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const getStatusPill = (status: Incident["status"]) => {
        switch (status) {
            case "Ongoing":
                return (
                    <span className="flex items-center text-red-400">
                        <span className="mr-1.5 h-2 w-2 rounded-full bg-red-500"></span>
                        Ongoing
                    </span>
                );
            case "Resolved":
                return (
                    <span className="flex items-center text-green-400">
                        <span className="mr-1.5 h-2 w-2 rounded-full bg-green-500"></span>
                        Resolved
                    </span>
                );
            case "Acknowledged":
                return (
                    <span className="flex items-center text-yellow-400">
                        <span className="mr-1.5 h-2 w-2 rounded-full bg-yellow-500"></span>
                        Acknowledged
                    </span>
                );
            default:
                return (
                    <span className="flex items-center text-gray-400">
                        <span className="mr-1.5 h-2 w-2 rounded-full bg-gray-500"></span>
                        {status}
                    </span>
                );
        }
    };

    const getIconColorByStatus = (status: Incident["status"]): string => {
        switch (status) {
            case "Ongoing":
                return "text-red-500";
            case "Resolved":
                return "text-green-500";
            case "Acknowledged":
                return "text-yellow-500";
            default:
                return "text-gray-500";
        }
    };

    const filteredIncidents = incidentsData.filter(
        (incident) =>
            incident.errorText
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
            (incident.monitorName &&
                incident.monitorName
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())) ||
            incident.errorCode
                .toLowerCase()
                .includes(searchQuery.toLowerCase()),
    );

    return (
        <div className="min-h-screen w-full bg-white p-6 md:p-8 dark:bg-gray-900">
            <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
                <h1 className="text-3xl font-semibold">Incidents</h1>
                <div className="flex w-full items-center gap-3 md:w-auto md:gap-4">
                    <div className="relative flex-grow md:flex-grow-0">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
                        <Input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button onClick={() => setIsReportModalOpen(true)}>
                        Report a new incident
                    </Button>
                </div>
            </div>

            <div className="mb-3 hidden grid-cols-[minmax(0,_3fr)_1fr_1fr_auto] items-center gap-4 px-4 py-2 text-xs font-medium text-gray-500 md:grid">
                <div>MONITOR</div>
                <div>STARTED AT</div>
                <div>LENGTH</div>
                <div>{/* Actions */}</div>
            </div>

            <div className="space-y-3">
                {loading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                        <ShimmerIncidentItem key={index} />
                    ))
                ) : filteredIncidents.length > 0 ? (
                    filteredIncidents.map((incident) => (
                        <Link
                            key={incident.id}
                            href={`/incidents/${incident.id}`}
                            className="grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-lg border border-gray-700/50 bg-gray-900/70 p-4 hover:bg-gray-800/50 md:grid-cols-[minmax(0,_3fr)_1fr_1fr_auto] cursor-pointer"
                        >
                            <div className="col-span-3 flex items-center gap-3 md:col-span-1">
                                <ShieldAlert
                                    className={`h-8 w-8 ${getIconColorByStatus(incident.status)} flex-shrink-0`}
                                />
                                <div>
                                    <div
                                        className="truncate font-medium text-white"
                                        title={
                                            incident.monitorName ||
                                            incident.errorText
                                        }
                                    >
                                        {incident.monitorName ||
                                            incident.errorText.split(
                                                " is down",
                                            )[0] ||
                                            incident.errorText}
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        {incident.errorCode === "HEARTBEAT_DOWN"
                                            ? "Missed heartbeat"
                                            : incident.errorCode}
                                    </div>
                                </div>
                            </div>

                            <div className="text-sm text-gray-400 md:text-left">
                                <span className="mr-2 text-xs text-gray-500 md:hidden">
                                    Started:
                                </span>
                                {formatDate(incident.date)}
                            </div>

                            <div className="text-sm md:text-left">
                                <span className="mr-2 text-xs text-gray-500 md:hidden">
                                    Status:
                                </span>
                                {getStatusPill(incident.status)}
                            </div>

                            <div className="flex justify-end">
                                <MoreHorizontal className="h-5 w-5 text-gray-500 group-hover:text-white" />
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="py-10 text-center text-gray-500">
                        {incidentsData.length === 0 && !searchQuery && !loading
                            ? "No incidents found."
                            : "No incidents match your search."}
                    </div>
                )}
            </div>

            <ReportIncidentModal
                isOpen={isReportModalOpen}
                onOpenChange={setIsReportModalOpen}
                onIncidentReported={fetchIncidents}
            />
        </div>
    );
}

export default IncidentsSection;
