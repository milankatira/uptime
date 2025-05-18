"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAxiosInstance } from "@/lib/axiosInstance";
import { formatDistanceToNow } from "date-fns";
import { AlertTriangle, ArrowLeft, Heart } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { AddCommentModal } from "@/components/incidents/AddCommentModal"; // Import the new modal component

// Define interfaces for the incident data structure
interface TimelineItem {
  id: number; // Assuming id is a number based on mock data
  type: string; // e.g., "email", "start"
  message: string;
  recipient?: string; // Optional recipient
  time: string; // Assuming time is a string
}

interface IncidentDetail {
  id: string;
  status: string; // e.g., "Ongoing"
  date: string; // Assuming date is a string
  acknowledged: boolean;
  cause: string;
  started: string; // e.g., "1 day ago"
  length: string; // e.g., "Ongoing"
  escalation: string; // e.g., "Entire team"
  errorText: string; // Added based on usage
  createdAt: string; // Added based on usage
  Timeline: TimelineItem[]; // Added based on usage
}

const IncidentDetailPage = () => {
  const [comment, setComment] = useState("");
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false); // State to control modal visibility

  const params = useParams(); // Get params from the URL
  const incidentId = params.id as string; // Extract incidentId from params
  const instance = useAxiosInstance(); // Get the axios instance

  // Update state type to IncidentDetail or null
  const [incidents, setIncident] = useState<IncidentDetail | null>(null); // State to store incident data
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState<string | null>(null); // State for error handling


  useEffect(() => {
    const fetchIncidentDetails = async () => {
      setLoading(true);
      setError(null); // Reset error state on new fetch
      try {
        const response = await instance.get(
          `/api/v1/incident/${incidentId}`, // Use the incidentId from params
        );
        setIncident(response.data);
      } catch (err) {
        console.error("Error fetching incident details:", err);
        setError("Failed to load incident details."); // Set error state
        toast("Failed to load incident details.");
      } finally {
        setLoading(false);
      }
    };

    if (incidentId) { // Only fetch if incidentId is available
      fetchIncidentDetails();
    }
  }, [incidentId, instance]); // Depend on incidentId and instance

  const handleAcknowledge = () => {
    // TODO: Implement actual acknowledge API call
    toast.success("Incident acknowledged", {
      description: "You have acknowledged this incident",
    });
  };

  const handleEscalate = () => {
    // TODO: Implement actual escalate API call
    toast.info("Incident escalated", {
      description: "This incident has been escalated to the team",
    });
  };

  const handlePostComment = () => {
    if (comment.trim()) {
      // TODO: Implement actual post comment API call
      toast.success("Comment posted", {
        description: "Your comment has been added to the timeline",
      });
      setComment("");
      setIsCommentModalOpen(false); // Close the modal after posting
    }
  };

  // Render loading state or actual content
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
          <span className="mx-2 text-gray-400 dark:text-gray-600">/</span>
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
                  {incidents?.id} {/* Use incidents state */}
                </h1>
                <div className="flex items-center text-sm">
                  <span className="mr-2 text-red-500 dark:text-red-400">
                    {incidents?.status} {/* Use incidents state */}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    • {incidents?.date} {/* Use incidents state */}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="bg-dark-lighter border-dark-border hover:bg-dark-border"
              >
                <Heart className="mr-2 h-4 w-4" />
                Heartbeat
              </Button>
              <Button
                variant="outline"

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
                Remove
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
              <h3 className="font-semibold">{incidents?.errorText} {/* Use incidents state */}</h3>
            </CardContent>
          </Card>

          <Card className="bg-dark-lighter border-dark-border">
            <CardContent className="p-5">
              <p className="mb-1 text-sm text-gray-400">Started at</p>
              <h3 className="font-semibold">
                {incidents?.createdAt ? formatDistanceToNow(new Date(incidents.createdAt), { addSuffix: true }) : 'N/A'} {/* Use incidents state */}
              </h3>
            </CardContent>
          </Card>

          <Card className="bg-dark-lighter border-dark-border">
            <CardContent className="p-5">
              <p className="mb-1 text-sm text-gray-400">Length</p>
              <h3 className="font-semibold">{incidents?.length} {/* Use incidents state */}</h3>
            </CardContent>
          </Card>
        </div>

        {/* Escalation section */}
        <Card className="bg-dark-lighter border-dark-border mb-8">
          <CardContent className="p-5">
            <p className="mb-1 text-sm text-gray-400">Escalation</p>
            <h3 className="font-semibold">{incidents?.escalation} {/* Use incidents state */}</h3>
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
          {incidents?.Timeline?.map((item) => {
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
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                      )}
                      {/* Add more icon types as needed */}
                    </div>
                    <div className="h-full w-px bg-gray-700"></div>
                  </div>
                  <div className="flex flex-grow flex-col pb-8">
                    <div className="flex items-center">
                      <p className="text-sm">
                        {item.message}{" "}
                        {item.recipient && (
                          <span className="font-medium">{item.recipient}</span>
                        )}
                      </p>
                    </div>
                    <span className="mt-1 text-xs text-gray-500">{item.time}</span>
                  </div>
                </div>
              </div>
            );
          })}


        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"

            onClick={handleEscalate}
          >
            Escalate
          </Button>
          <Button

            onClick={handleAcknowledge}
          >
            Acknowledge
          </Button>
        </div>
      </div>

      {/* Add the new modal component here */}
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
