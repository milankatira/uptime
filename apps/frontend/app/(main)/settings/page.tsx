'use client'
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Bell, Moon, Sun } from "lucide-react";

import Link from "next/link";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SettingsPage = () => {
  const { setTheme } = useTheme();

  const settingsForm = useForm({
    defaultValues: {
      emailNotifications: true,
    },
  });

  const handleSettingsSubmit = (data: never) => {
    console.log("Notification settings:", data);
    toast("Notification settings updated");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col w-full">
      <div className="flex justify-between items-center p-4 border-b w-full">
        <div className="flex items-center gap-3">
          <Link href="/">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-medium">Settings</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto ml-0 py-8 px-4">
        <Card className="bg-dark-lighter border-dark-border mb-6">
          <CardHeader>
            <CardTitle>Theme Preferences</CardTitle>
            <CardDescription className="text-gray-400">
              Choose how you want the application to appear
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-white mb-3">Select Theme</h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="default" className="w-full">
                      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                      <span className="sr-only">Toggle theme</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      System
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-lighter border-dark-border">
          <CardHeader>
            <CardTitle className="text-white">Notification Settings</CardTitle>
            <CardDescription className="text-gray-400">
              Manage your email notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...settingsForm}>
              <form onSubmit={settingsForm.handleSubmit((data) => handleSettingsSubmit(data as never))} className="space-y-6">
                <FormField
                  control={settingsForm.control}
                  name="emailNotifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-dark-border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-white">
                          <div className="flex items-center">
                            <Bell className="mr-2 h-4 w-4" />
                            Email Notifications
                          </div>
                        </FormLabel>
                        <FormDescription className="text-gray-400 mt-1">
                          Receive email notifications on status changes and alerts.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">Save Settings</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
