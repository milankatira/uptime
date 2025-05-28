"use client";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAxiosInstance } from "@/lib/axiosInstance";
// Remove the import for @/action/connection.action
import { Loader2, Mail, X } from "lucide-react";
// import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

/**
 * Displays and manages user integrations and connected email notifications.
 *
 * Provides UI for connecting Discord and Slack accounts, adding or removing notification email addresses, and viewing current integration status. Integrations and email data are fetched and updated via API calls, with user feedback provided through toast notifications.
 */
export default function ConnectionsPage() {
  // const { toast } = useToast();
  const [connections, setConnections] = useState({
    discord: false,
    slack: false,
    emails: [] as { id: string; email: string }[],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [newEmail, setNewEmail] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const instance = useAxiosInstance();

  useEffect(() => {
    fetchConnections();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchConnections() {
    try {
      setLoading(true);
      const res = await instance.get("/api/v1/connections");
      const data = res.data;

      if (Array.isArray(data)) {
        const emailConnections = data
          .filter((conn) => conn.type === "Email")
          .map((conn) => ({ id: conn.id, email: conn.email || "" }));

        setConnections({
          discord: data.some((conn) => conn.type === "Discord"),
          slack: data.some((conn) => conn.type === "Slack"),
          emails: emailConnections,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast("Failed to load connections");
    } finally {
      setLoading(false);
    }
  }

  const handleAddEmail = async () => {
    if (!newEmail || !newEmail.includes("@")) {
      toast("Please enter a valid email address");
      return;
    }

    try {
      const res = await instance.post("/api/v1/connections", {
        email: newEmail,
      });
      const result = res.data;
      setConnections((prev) => ({
        ...prev,
        emails: [
          ...prev.emails,
          { id: result?.id || "", email: result?.email || "" },
        ],
      }));
      setNewEmail("");
      setIsDialogOpen(false);
      toast("Email has been added successfully");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast("Failed to add email");
    }
  };

  const handleRemoveEmail = async (id: string) => {
    try {
      await instance.delete("/api/v1/connections", { data: { id } });
      setConnections((prev) => ({
        ...prev,
        emails: prev.emails.filter((email) => email.id !== id),
      }));
      toast("Email has been removed successfully");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast("Failed to remove email");
    }
  };

  const integrations = [
    {
      name: "Discord",
      description: "Connect your Discord to send notifications and messages.",
      isConnected: connections.discord,
      icon: "https://discord.com/assets/2c21aeda16de354ba5334551a883b481.png",
    },
    {
      name: "Slack",
      description: "Use Slack to send notifications to team members.",
      isConnected: connections.slack,
      icon: "https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png",
    },
    {
      name: "Email",
      description: "Add email addresses for notification delivery.",
      isConnected: connections.emails.length > 0,
      icon: "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico",
    },
  ];

  return (
    <div className="dark:bg-gray-900 mx-auto w-full bg-white px-4 py-10">
      {/* Header Section */}
      <div className="mb-8 space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Integrations</h1>
        <p className="text-muted-foreground text-lg">
          Connect and manage your integrations to streamline your workflow.
        </p>

        <Separator />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Main Integrations */}
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-xl border shadow-sm dark:bg-gray-900 bg-white">
            <div className="border-b p-6">
              <h2 className="text-xl font-semibold">Available Integrations</h2>
              <p className="text-muted-foreground mt-1 text-sm">
                Connect your favorite tools and services
              </p>
            </div>

            <div className="space-y-4 p-6">
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
                </div>
              ) : (
                integrations.map((integration, index) => (
                  <Card
                    key={index}
                    className="flex items-center justify-between p-4 transition-all hover:shadow-md dark:bg-gray-900 bg-white flex-row"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-background relative flex h-12 w-12 items-center justify-center rounded-lg border">
                        <Image
                          src={integration.icon}
                          alt={`${integration.name} Logo`}
                          width={32}
                          height={32}
                          className="rounded-md"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-medium">
                          {integration.name}
                        </CardTitle>
                        <CardDescription className="mt-0.5 text-sm">
                          {integration.description}
                        </CardDescription>
                      </div>
                    </div>
                    {integration.name === "Email" ? (
                      <Dialog
                        open={isDialogOpen}
                        onOpenChange={setIsDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="default"
                            size="sm"
                            className="min-w-[100px]"
                          >
                            Add Email
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Add Email Notification</DialogTitle>
                            <DialogDescription>
                              Enter an email address to receive notifications
                              and updates.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="flex items-center gap-4">
                              <Input
                                placeholder="name@example.com"
                                type="email"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                className="flex-1"
                              />
                              <Button
                                onClick={handleAddEmail}
                                disabled={!newEmail}
                              >
                                Add
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <Button
                        variant={
                          integration.isConnected ? "outline" : "default"
                        }
                        size="sm"
                        className="min-w-[100px]"
                        onClick={() => {
                          if (!integration.isConnected) {
                            const redirectUrl =
                              integration.name === "Discord"
                                ? process.env.NEXT_PUBLIC_DISCORD_REDIRECT
                                : process.env.NEXT_PUBLIC_SLACK_REDIRECT;
                            window.location.href = redirectUrl || "#";
                          }
                        }}
                      >
                        {integration.isConnected ? "Connected" : "Connect"}
                      </Button>
                    )}
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Connected Emails Sidebar */}
        <div className="space-y-6">
          <div className="dark:bg-gray-900 bg-white rounded-xl border shadow-sm">
            <div className="border-b p-6">
              <h2 className="text-xl font-semibold">Connected Emails</h2>
              <p className="text-muted-foreground mt-1 text-sm">
                Manage your notification emails
              </p>
            </div>
            <div className="p-6">
              {connections.emails.length > 0 ? (
                <div className="space-y-3">
                  {connections.emails.map((email) => (
                    <div
                      key={email.id}
                      className="dark:bg-gray-900 bg-white flex items-center justify-between rounded-lg border p-3 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 rounded-md p-2">
                          <Mail className="text-primary h-4 w-4" />
                        </div>
                        <span className="text-sm font-medium">
                          {email.email}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveEmail(email.id)}
                        className="hover:bg-destructive/10 hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-6 text-center">
                  <Mail className="text-muted-foreground/30 mx-auto mb-3 h-12 w-12" />
                  <p className="text-muted-foreground text-sm">
                    No emails connected yet
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
