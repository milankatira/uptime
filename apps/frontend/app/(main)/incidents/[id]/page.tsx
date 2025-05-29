"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAxiosInstance } from "@/lib/axiosInstance";
import { formatDistanceToNow } from "date-fns";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { AddCommentModal } from "@/components/incidents/AddCommentModal";

interface TimelineItem {
    id: number;
    type: string;
    message: string;
    recipient?: string;
    time: string;
}

interface IncidentDetail {
    id: string;
    status: string;
    date: string;
    acknowledged: boolean;
    cause: string;
    started: string;
    length: string;
    escalation: string;
    errorText: string;
    createdAt: string;
    Timeline: TimelineItem[];
}

const IncidentDetailPage = () => {
    const [comment, setComment] = useState("");
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const params = useParams();
    const incidentId = params.id as string;
    const instance = useAxiosInstance();
    const router = useRouter();

    const [incidents, setIncident] = useState<IncidentDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchIncidentDetails = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await instance.get(
                `/api/v1/incident/${incidentId}`,
            );
            setIncident(response.data);
        } catch (err) {
            console.error("Error fetching incident details:", err);
            setError("Failed to load incident details.");
            toast("Failed to load incident details.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (incidentId) {
            fetchIncidentDetails();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [incidentId, instance]);

    const handleAcknowledge = async () => {
        try {
            await instance.put(`/api/v1/incident/${incidentId}`, {
                status: "Acknowledged",
            });
            toast.success("Incident acknowledged", {
                description: "You have acknowledged this incident",
            });
            fetchIncidentDetails();
        } catch (err) {
            console.error("Error acknowledging incident:", err);
            toast.error("Failed to acknowledge incident.");
        }
    };

    const handlePostComment = async () => {
        if (comment.trim()) {
            try {
                await instance.post(`/api/v1/incident/${incidentId}/comment`, {
                    comment,
                });
                toast.success("Comment posted", {
                    description: "Your comment has been added to the timeline",
                });
                setComment("");
                setIsCommentModalOpen(false);
                fetchIncidentDetails();
            } catch (err) {
                console.error("Error posting comment:", err);
                toast.error("Failed to post comment.");
            }
        }
    };

    const handleDeleteIncident = async () => {
        if (
            window.confirm(
                "Are you sure you want to delete this incident? This action cannot be undone.",
            )
        ) {
            setIsDeleting(true);
            try {
                await instance.delete(`/api/v1/incident/${incidentId}`);
                toast.success("Incident deleted successfully", {
                    description: "The incident has been permanently removed.",
                });
                router.push("/incidents");
            } catch (err) {
                console.error("Error deleting incident:", err);
                toast.error("Failed to delete incident.");
            } finally {
                setIsDeleting(false);
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen w-full bg-white dark:bg-gray-900">
                <div className="mx-auto max-w-6xl bg-white px-4 py-6 md:px-6 dark:bg-gray-900">
                    {/* Breadcrumb Placeholder */}
                    <div className="mb-8 h-4 w-40 animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>

                    {/* Header Placeholder */}
                    <div className="mb-8">
                        <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="mb-4 flex items-center md:mb-0">
                                <div className="mr-4 h-10 w-10 animate-pulse rounded-full bg-gray-300 dark:bg-gray-700"></div>
                                <div>
                                    <div className="h-6 w-60 mb-2 animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
                                    <div className="h-4 w-40 animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
                                </div>
                            </div>
                            <div className="flex space-x-3">
                                <div className="h-10 w-24 animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
                                <div className="h-10 w-24 animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
                            </div>
                        </div>
                    </div>

                    {/* Info cards Placeholder */}
                    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="h-24 animate-pulse rounded-xl bg-gray-300 dark:bg-gray-700"></div>
                        <div className="h-24 animate-pulse rounded-xl bg-gray-300 dark:bg-gray-700"></div>
                    </div>

                    {/* Escalation Placeholder */}
                    <div className="mb-8 h-24 animate-pulse rounded-xl bg-gray-300 dark:bg-gray-700"></div>

                    {/* Comments Placeholder */}
                    <div className="mb-8 h-24 animate-pulse rounded-xl bg-gray-300 dark:bg-gray-700"></div>

                    {/* Timeline Placeholder */}
                    <div className="mb-8">
                        <div className="h-6 w-32 mb-6 animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
                        <div className="mb-6 h-20 animate-pulse rounded-xl bg-gray-300 dark:bg-gray-700"></div>
                        <div className="mb-6 h-20 animate-pulse rounded-xl bg-gray-300 dark:bg-gray-700"></div>
                        <div className="mb-6 h-20 animate-pulse rounded-xl bg-gray-300 dark:bg-gray-700"></div>
                    </div>

                    {/* Action buttons Placeholder */}
                    <div className="flex justify-end gap-3">
                        <div className="h-10 w-24 animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
                        <div className="h-10 w-24 animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
                    </div>
                </div>
            </div>
        );
    }

    // Render error state
    if (error) {
        return (
            <div className="min-h-screen w-full bg-white dark:bg-gray-900 flex items-center justify-center">
                <p className="text-red-500 dark:text-red-400">{error}</p>
            </div>
        );
    }

    // Render actual content when not loading and no error
    return (
        <div className="min-h-screen w-full bg-white dark:bg-gray-900">
            <div className="mx-auto max-w-6xl bg-white px-4 py-6 md:px-6 dark:bg-gray-900">
                {/* Breadcrumb navigation */}
                <div className="mb-8 flex items-center text-sm">
                    <Link
                        href="/heartbeats"
                        className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Incidents
                    </Link>
                    <span className="mx-2 text-gray-400 dark:text-gray-600">
                        /
                    </span>
                    <span className="text-gray-900 dark:text-gray-200">
                        {incidents?.id} {/* Use incidents state */}
                    </span>
                </div>

                {/* Header section with status and actions */}
                <div className="mb-8">
                    <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="mb-4 flex items-center md:mb-0">
                            <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-500/20">
                                <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {incidents?.errorText}{" "}
                                    {/* Use incidents state */}
                                </h1>
                                <div className="flex items-center text-sm">
                                    <span className="text-gray-500 dark:text-gray-400">
                                        • {incidents?.date}{" "}
                                        {/* Use incidents state */}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex space-x-3">
                            {/* Add Acknowledge button here if needed */}
                            {incidents?.status !== "Acknowledged" && (
                                <Button
                                    onClick={handleAcknowledge}
                                    disabled={loading || isDeleting}
                                >
                                    Acknowledge
                                </Button>
                            )}

                            <Button
                                variant="outline"
                                onClick={handleDeleteIncident} // Add click handler
                                disabled={loading || isDeleting} // Disable while loading or deleting
                            >
                                <svg
                                    className="mr-2 h-4 w-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M3 6l3 1m0 0l-3 9a5 5 0 0 0 7.5 3h6A2 2 0 0 0 21 16v-5a2 2 0 0 0-2-2h-.5"></path>
                                    <path d="M8.5 12H12a2 2 0 0 0 2-2V8"></path>
                                </svg>
                                {isDeleting ? "Removing..." : "Remove"}{" "}
                                {/* Update button text */}
                            </Button>
                        </div>
                    </div>

                    <div className="text-right text-sm">
                        <span>
                            {incidents?.status} {/* Use incidents state */}
                        </span>
                    </div>
                </div>

                {/* Info cards */}
                <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Card className="bg-dark-lighter border-dark-border">
                        <CardContent className="p-5">
                            <p className="mb-1 text-sm text-gray-400">Cause</p>
                            <h3 className="font-semibold">
                                {incidents?.errorText}{" "}
                                {/* Use incidents state */}
                            </h3>
                        </CardContent>
                    </Card>

                    {incidents?.status !== "Acknowledged" && (
                        <Card className="bg-dark-lighter border-dark-border">
                            <CardContent className="p-5">
                                <p className="mb-1 text-sm text-gray-400">
                                    Started at
                                </p>
                                <h3 className="font-semibold">
                                    {incidents?.createdAt
                                        ? formatDistanceToNow(
                                              new Date(incidents.createdAt),
                                              {
                                                  addSuffix: true,
                                              },
                                          )
                                        : "N/A"}
                                </h3>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Escalation section */}
                <Card className="bg-dark-lighter border-dark-border mb-8">
                    <CardContent className="p-5">
                        <p className="mb-1 text-sm text-gray-400">Escalation</p>
                        <h3 className="font-semibold">
                            {incidents?.escalation} {/* Use incidents state */}
                        </h3>
                    </CardContent>
                </Card>

                {/* comments section */}
                <Card className="bg-dark-lighter border-dark-border mb-8">
                    <CardContent className="p-5">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-400">Comments</p>
                            {/* Use DialogTrigger to open the new modal */}
                            {/* <DialogTrigger asChild>
              </DialogTrigger> */}
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-xs text-gray-400"
                                onClick={() => setIsCommentModalOpen(true)} // Open the modal
                            >
                                <span className="mr-1">+</span> Add
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Timeline section */}
                <div className="mb-8">
                    <h2 className="mb-6 text-xl font-semibold">Timeline</h2>

                    {/* Map over the incident timeline */}
                    {incidents?.Timeline?.map((item, index, arr) => {
                        // Add index and array parameters
                        const isLastItem = index === arr.length - 1; // Check if it's the last item
                        return (
                            <div key={item.id} className="mb-6">
                                <div className="relative flex">
                                    <div className="mr-4 flex w-10 flex-col items-center">
                                        <div className="bg-dark-lighter z-10 flex h-10 w-10 items-center justify-center rounded-full text-blue-500">
                                            {/* Add appropriate icon based on item type */}
                                            {item.type === "email" && (
                                                <svg
                                                    className="h-5 w-5"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                                    <polyline points="22,6 12,13 2,6"></polyline>
                                                </svg>
                                            )}
                                            {item.type === "start" && (
                                                <svg
                                                    className="h-5 w-5"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <circle
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                    ></circle>
                                                    <polyline points="12 6 12 12 16 14"></polyline>
                                                </svg>
                                            )}
                                            {/* Add more icon types as needed */}
                                        </div>
                                        {/* Conditionally render the vertical line */}
                                        {!isLastItem && (
                                            <div className="h-full w-px bg-gray-700"></div>
                                        )}
                                    </div>
                                    <div className="flex flex-grow flex-col pb-8">
                                        <div className="flex items-center">
                                            <p className="text-sm">
                                                {item.message}{" "}
                                                {item.recipient && (
                                                    <span className="font-medium">
                                                        {item.recipient}
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                        <span className="mt-1 text-xs text-gray-500">
                                            {item.time}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Action buttons */}
                <div className="flex justify-end gap-3">
                    {/* Acknowledge button is now moved up */}
                </div>
            </div>

            <AddCommentModal
                isOpen={isCommentModalOpen}
                onOpenChange={setIsCommentModalOpen}
                comment={comment}
                onCommentChange={setComment}
                onPostComment={handlePostComment}
            />
        </div>
    );
};

export default IncidentDetailPage;
