"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAxiosInstance } from "@/lib/axiosInstance";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Website {
  id: string;
  url: string;
}

interface ReportIncidentModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onIncidentReported: () => void;
}

/**
 * Renders a modal dialog for manually reporting a new incident.
 *
 * The modal allows users to enter an incident title, error details, and optionally select a website. On submission, the incident is reported via an API call, and callbacks are triggered for modal state changes and successful reporting.
 *
 * @param isOpen - Whether the modal is visible.
 * @param onOpenChange - Callback invoked when the modal open state changes.
 * @param onIncidentReported - Callback invoked after a successful incident report.
 */
export function ReportIncidentModal({
  isOpen,
  onOpenChange,
  onIncidentReported,
}: ReportIncidentModalProps) {
  const [title, setTitle] = useState("");
  const [errorText, setErrorText] = useState("");
  const [websiteId, setWebsiteId] = useState<string | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loadingWebsites, setLoadingWebsites] = useState(false);
  const instance = useAxiosInstance();

  useEffect(() => {
    if (isOpen) {
      const fetchWebsites = async () => {
        setLoadingWebsites(true);
        try {
          const response = await instance.get<{ websites: Website[] }>(
            "/api/v1/websites",
          );
          setWebsites(response.data.websites || []);
        } catch (error) {
          console.error("Failed to fetch websites:", error);
          toast.error("Failed to load websites.");
          setWebsites([]);
        } finally {
          setLoadingWebsites(false);
        }
      };
      fetchWebsites();
    } else {
      setTitle("");
      setErrorText("");
      setWebsiteId(undefined);
      setWebsites([]);
    }
  }, [isOpen, instance]);
  const handleSubmit = async () => {
    if (!title.trim() || !errorText.trim()) {
      toast.error("Title and Error Details are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      await instance.post("/api/v1/incident", {
        title,
        errorText,
        websiteId,
      });
      toast.success("Incident reported successfully.");
      setTitle("");
      setErrorText("");
      setWebsiteId(undefined);
      onOpenChange(false);
      onIncidentReported();
    } catch (error) {
      console.error("Failed to report incident:", error);
      toast.error("Failed to report incident.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Report New Incident</DialogTitle>
          <DialogDescription>
            Fill in the details to manually report a new incident.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
              disabled={isSubmitting}
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="errorText" className="text-right">
              Error Details
            </Label>
            <Textarea
              id="errorText"
              value={errorText}
              onChange={(e) => setErrorText(e.target.value)}
              className="col-span-3"
              disabled={isSubmitting}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="websiteId" className="text-right">
              Website (Optional)
            </Label>
            <Select
              onValueChange={setWebsiteId}
              value={websiteId}
              disabled={isSubmitting || loadingWebsites}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue
                  placeholder={
                    loadingWebsites ? "Loading websites..." : "Select a website"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {websites.length === 0 && !loadingWebsites ? (
                  <SelectItem value="no-websites" disabled>
                    No websites available
                  </SelectItem>
                ) : (
                  <>
                    <SelectItem value="none">None</SelectItem>
                    {websites.map((website) => (
                      <SelectItem key={website.id} value={website.id}>
                        {website.url}
                      </SelectItem>
                    ))}
                  </>
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Reporting..." : "Report Incident"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
