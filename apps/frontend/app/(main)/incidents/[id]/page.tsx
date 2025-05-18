"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AlertTriangle, ArrowLeft, Heart } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

const IncidentDetailPage = () => {
  const [comment, setComment] = useState("");

  // Mock incident data
  const incident = {
    id: "dskndnjrd",
    status: "Ongoing",
    date: "May 14, 2025 at 7:57pm IST",
    acknowledged: false,
    cause: "Missed heartbeat",
    started: "1 day ago",
    length: "Ongoing",
    escalation: "Entire team",
    timeline: [
      {
        id: 1,
        type: "email",
        message: "Sent an email to",
        recipient: "milankatira Katira at milankatira26@gmail.com",
        time: "May 14 at 7:57pm IST",
      },
      {
        id: 2,
        type: "start",
        message: "Incident started.",
        time: "May 14 at 7:57pm IST",
      },
    ],
  };

  const handleAcknowledge = () => {
    toast.success("Incident acknowledged", {
      description: "You have acknowledged this incident",
    });
  };

  const handleEscalate = () => {
    toast.info("Incident escalated", {
      description: "This incident has been escalated to the team",
    });
  };

  const handlePostComment = () => {
    if (comment.trim()) {
      toast.success("Comment posted", {
        description: "Your comment has been added to the timeline",
      });
      setComment("");
    }
  };

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
            {incident.id}
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
                  {incident.id}
                </h1>
                <div className="flex items-center text-sm">
                  <span className="mr-2 text-red-500 dark:text-red-400">
                    {incident.status}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    • {incident.date}
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
                className="bg-dark-lighter border-dark-border hover:bg-dark-border"
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
            {!incident.acknowledged && (
              <span className="text-gray-400">Not acknowledged yet</span>
            )}
          </div>
        </div>

        {/* Info cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="bg-dark-lighter border-dark-border">
            <CardContent className="p-5">
              <p className="mb-1 text-sm text-gray-400">Cause</p>
              <h3 className="font-semibold">{incident.cause}</h3>
            </CardContent>
          </Card>

          <Card className="bg-dark-lighter border-dark-border">
            <CardContent className="p-5">
              <p className="mb-1 text-sm text-gray-400">Started at</p>
              <h3 className="font-semibold">{incident.started}</h3>
            </CardContent>
          </Card>

          <Card className="bg-dark-lighter border-dark-border">
            <CardContent className="p-5">
              <p className="mb-1 text-sm text-gray-400">Length</p>
              <h3 className="font-semibold">{incident.length}</h3>
            </CardContent>
          </Card>
        </div>

        {/* Escalation section */}
        <Card className="bg-dark-lighter border-dark-border mb-8">
          <CardContent className="p-5">
            <p className="mb-1 text-sm text-gray-400">Escalation</p>
            <h3 className="font-semibold">{incident.escalation}</h3>
          </CardContent>
        </Card>

        {/* Metadata section */}
        <Card className="bg-dark-lighter border-dark-border mb-8">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">Metadata</p>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-gray-400"
              >
                <span className="mr-1">+</span> Add
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Timeline section */}
        <div className="mb-8">
          <h2 className="mb-6 text-xl font-semibold">Timeline</h2>

          <div className="mb-6">
            <div className="relative flex">
              <div className="mr-4 flex w-10 flex-col items-center">
                <div className="bg-dark-lighter z-10 flex h-10 w-10 items-center justify-center rounded-full text-blue-500">
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
                </div>
                <div className="h-full w-px bg-gray-700"></div>
              </div>
              <div className="flex flex-grow flex-col pb-8">
                <div className="flex items-center">
                  <p className="text-sm">
                    {incident.timeline[0].message}{" "}
                    <span className="font-medium">
                      {incident.timeline[0].recipient}
                    </span>
                  </p>
                </div>
                <span className="mt-1 text-xs text-gray-500">
                  {incident.timeline[0].time}
                </span>
              </div>
              <div className="mt-2 flex justify-end text-xs text-gray-500">
                {incident.timeline[0].time}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="relative flex">
              <div className="mr-4 flex w-10 flex-col items-center">
                <div className="bg-dark-lighter z-10 flex h-10 w-10 items-center justify-center rounded-full text-blue-400">
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
                </div>
                <div className="h-full w-px bg-gray-700"></div>
              </div>
              <div className="flex flex-grow flex-col pb-8">
                <div className="flex items-center">
                  <p className="text-sm">{incident.timeline[1].message}</p>
                </div>
                <span className="mt-1 text-xs text-gray-500">
                  {incident.timeline[1].time}
                </span>
              </div>
              <div className="mt-2 flex justify-end text-xs text-gray-500">
                {incident.timeline[1].time}
              </div>
            </div>
          </div>

          {/* Comment input */}
          <div className="flex items-start">
            <div className="mr-4 h-10 w-10 flex-shrink-0 rounded-full bg-gray-700"></div>
            <div className="relative flex-grow">
              <Input
                className="bg-dark-lighter border-dark-border w-full rounded-md px-4 py-3 pr-12"
                placeholder="Leave a comment or post-mortem. You can use markdown here or @mention a colleague."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <Button
              className="ml-3 bg-gray-700 hover:bg-gray-600"
              onClick={handlePostComment}
            >
              Post
            </Button>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            className="bg-dark-lighter border-dark-border hover:bg-dark-border"
            onClick={handleEscalate}
          >
            Escalate
          </Button>
          <Button
            className="bg-indigo-600 hover:bg-indigo-700"
            onClick={handleAcknowledge}
          >
            Acknowledge
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetailPage;
