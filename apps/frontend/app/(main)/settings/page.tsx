'use client'
import React, { useState } from "react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";
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
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Bell, Users, ArrowLeft, User, Shield, Globe } from "lucide-react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { toast } from "sonner";

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState("product");

    const productForm = useForm({
        defaultValues: {
            siteName: "UptimeRobot",
            siteDescription: "Monitor your website uptime and performance.",
            publicPage: true,
            allowSubscribers: true,
            emailNotifications: true,
        }
    });

    const userForm = useForm({
        defaultValues: {
            name: "John Doe",
            email: "john@example.com",
            notifications: true,
            marketingEmails: false,
        }
    });

    const handleProductSubmit = (data: never) => {
        console.log("Product settings:", data);
        toast("Settings updated");
    };

    const handleUserSubmit = (data: never) => {
        console.log("User settings:", data);
        toast(
            "User settings updated",
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 w-full">
            <div className="flex justify-between items-center p-4 border-b border-dark-border">
                <div className="flex items-center gap-3">
                    <Link href="/" className="text-gray-300 hover:text-white">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <h1 className="text-xl font-medium text-white">Settings</h1>
                </div>
            </div>

            <div className="max-w-5xl mx-auto py-8 px-4">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid grid-cols-2 max-w-[400px] mb-8 bg-dark-lighter">
                        <TabsTrigger value="product" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                            <Shield className="mr-2 h-4 w-4" />
                            Product Settings
                        </TabsTrigger>
                        <TabsTrigger value="user" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                            <User className="mr-2 h-4 w-4" />
                            User Settings
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="product">
                        <Card className="bg-dark-lighter border-dark-border">
                            <CardHeader>
                                <CardTitle className="text-white">Product Configuration</CardTitle>
                                <CardDescription className="text-gray-400">
                                    Configure how your status page works and appears to visitors.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Form {...productForm}>
                                    <form onSubmit={productForm.handleSubmit((data) => handleProductSubmit(data as never))} className="space-y-6">
                                        <FormField
                                            control={productForm.control}
                                            name="siteName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-white">Site Name</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Your status page name"
                                                            {...field}
                                                            className="bg-dark border-dark-border text-white"
                                                        />
                                                    </FormControl>
                                                    <FormDescription className="text-gray-400">
                                                        This will be displayed as the title of your status page.
                                                    </FormDescription>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={productForm.control}
                                            name="siteDescription"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-white">Description</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Describe your status page purpose"
                                                            {...field}
                                                            className="bg-dark border-dark-border text-white"
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />

                                        <div className="space-y-4">
                                            <FormField
                                                control={productForm.control}
                                                name="publicPage"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-dark-border p-4">
                                                        <div className="space-y-0.5">
                                                            <FormLabel className="text-white">
                                                                <div className="flex items-center">
                                                                    <Globe className="mr-2 h-4 w-4" />
                                                                    Public Status Page
                                                                </div>
                                                            </FormLabel>
                                                            <FormDescription className="text-gray-400">
                                                                Make your status page publicly accessible.
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

                                            <FormField
                                                control={productForm.control}
                                                name="allowSubscribers"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-dark-border p-4">
                                                        <div className="space-y-0.5">
                                                            <FormLabel className="text-white">
                                                                <div className="flex items-center">
                                                                    <Users className="mr-2 h-4 w-4" />
                                                                    Allow Subscribers
                                                                </div>
                                                            </FormLabel>
                                                            <FormDescription className="text-gray-400">
                                                                Let visitors subscribe to incident notifications.
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

                                            <FormField
                                                control={productForm.control}
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
                                                            <FormDescription className="text-gray-400">
                                                                Send email notifications on status changes.
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
                                        </div>

                                        <Button type="submit" className="w-full">Save Product Settings</Button>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="user">
                        <Card className="bg-dark-lighter border-dark-border">
                            <CardHeader>
                                <CardTitle className="text-white">User Preferences</CardTitle>
                                <CardDescription className="text-gray-400">
                                    Manage your personal account settings and preferences.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Form {...userForm}>

                                    <form onSubmit={userForm.handleSubmit((data) => handleUserSubmit(data as never))} className="space-y-6">
                                        <FormField
                                            control={userForm.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-white">Full Name</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Your name"
                                                            {...field}
                                                            className="bg-dark border-dark-border text-white"
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={userForm.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-white">Email Address</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="email"
                                                            placeholder="your@email.com"
                                                            {...field}
                                                            className="bg-dark border-dark-border text-white"
                                                        />
                                                    </FormControl>
                                                    <FormDescription className="text-gray-400">
                                                        {`We'll never share your email with anyone else.`}
                                                    </FormDescription>
                                                </FormItem>
                                            )}
                                        />

                                        <div className="space-y-4">
                                            <FormField
                                                control={userForm.control}
                                                name="notifications"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-dark-border p-4">
                                                        <div className="space-y-0.5">
                                                            <FormLabel className="text-white">
                                                                <div className="flex items-center">
                                                                    <Bell className="mr-2 h-4 w-4" />
                                                                    Notifications
                                                                </div>
                                                            </FormLabel>
                                                            <FormDescription className="text-gray-400">
                                                                Receive notifications about your services.
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

                                            <FormField
                                                control={userForm.control}
                                                name="marketingEmails"
                                                render={({ field }) => (
                                                    <FormItem className="flex items-start space-x-3 space-y-0">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                        </FormControl>
                                                        <div className="space-y-1 leading-none">
                                                            <FormLabel className="text-white">
                                                                Marketing emails
                                                            </FormLabel>
                                                            <FormDescription className="text-gray-400">
                                                                Receive emails about new features and improvements.
                                                            </FormDescription>
                                                        </div>
                                                    </FormItem>
                                                )}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Button type="submit" className="w-full mb-2">Save User Settings</Button>
                                            <Button
                                                variant="outline"
                                                className="w-full border-destructive text-destructive hover:text-destructive-foreground hover:bg-destructive"
                                            >
                                                Delete Account
                                            </Button>
                                        </div>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default SettingsPage;
