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
import { Textarea } from "@/components/ui/textarea";
import React from "react";

interface AddCommentModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  comment: string;
  onCommentChange: (value: string) => void;
  onPostComment: () => void;
}

export function AddCommentModal({
  isOpen,
  onOpenChange,
  comment,
  onCommentChange,
  onPostComment,
}: AddCommentModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Comment</DialogTitle>
          <DialogDescription>
            Leave a comment or post-mortem for this incident.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Replace Input with Textarea */}
          <Textarea
            id="comment"
            placeholder="Your comment here..."
            className="col-span-3"
            value={comment}
            onChange={(e) => onCommentChange(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onPostComment}>
            Post Comment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
