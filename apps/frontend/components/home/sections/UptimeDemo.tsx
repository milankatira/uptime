"use client";
import { AnimatedCard } from "@/components/ui/AnimatedCard";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, Clock, XCircle } from "lucide-react";
import React, { useEffect, useState } from "react";

const UptimeDemoPanel = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [demoSites, setDemoSites] = useState([
        {
            name: "Main Website",
            url: "example.com",
            status: "up",
            responseTime: 235,
            uptime: 99.98,
        },
        {
            name: "E-commerce Store",
            url: "store.example.com",
            status: "up",
            responseTime: 312,
            uptime: 99.95,
        },
        {
            name: "API Gateway",
            url: "api.example.com",
            status: "up",
            responseTime: 178,
            uptime: 99.99,
        },
        {
            name: "Help Center",
            url: "help.example.com",
            status: "degraded",
            responseTime: 876,
            uptime: 99.87,
        },
        {
            name: "Admin Portal",
            url: "admin.example.com",
            status: "down",
            responseTime: 2100,
            uptime: 98.76,
        },
    ]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        // Simulate changing statuses
        const interval = setInterval(() => {
            setDemoSites((sites) => {
                return sites.map((site) => {
                    const random = Math.random();
                    let newStatus = site.status;
                    let newResponseTime = site.responseTime;

                    if (random < 0.05) {
                        newStatus = "down";
                        newResponseTime =
                            2000 + Math.floor(Math.random() * 1000);
                    } else if (random < 0.15) {
                        newStatus = "degraded";
                        newResponseTime = 800 + Math.floor(Math.random() * 400);
                    } else {
                        newStatus = "up";
                        newResponseTime = 100 + Math.floor(Math.random() * 200);
                    }

                    return {
                        ...site,
                        status: newStatus,
                        responseTime: newResponseTime,
                    };
                });
            });
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "up":
                return <CheckCircle className="h-5 w-5 text-green-500" />;
            case "down":
                return <XCircle className="h-5 w-5 text-red-500" />;
            case "degraded":
                return <AlertTriangle className="h-5 w-5 text-amber-500" />;
            default:
                return <Clock className="text-muted-foreground h-5 w-5" />;
        }
    };

    const getStatusClass = (status: string) => {
        switch (status) {
            case "up":
                return "text-green-500 bg-green-500/10";
            case "down":
                return "text-red-500 bg-red-500/10";
            case "degraded":
                return "text-amber-500 bg-amber-500/10";
            default:
                return "text-muted-foreground bg-muted";
        }
    };

    return (
        <div className="bg-card border-border overflow-hidden rounded-xl border shadow-xl">
            <div className="bg-muted border-border flex h-12 items-center justify-between border-b px-4">
                <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <div className="ml-2 text-sm font-medium">
                        Uptime Dashboard
                    </div>
                </div>
                <div className="text-muted-foreground text-sm">
                    {currentTime.toLocaleTimeString()}
                </div>
            </div>

            <div className="p-6">
                <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h3 className="mb-1 text-lg font-medium">
                            Website Monitoring
                        </h3>
                        <p className="text-muted-foreground text-sm">
                            Real-time status of your websites
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                            Refresh
                        </Button>
                        <Button size="sm">Add Monitor</Button>
                    </div>
                </div>

                <div className="space-y-4">
                    {demoSites.map((site, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-background border-border flex flex-col items-start justify-between gap-4 rounded-lg border p-4 sm:flex-row sm:items-center"
                        >
                            <div className="flex-1">
                                <div className="mb-1 flex items-center gap-2">
                                    {getStatusIcon(site.status)}
                                    <span className="font-medium">
                                        {site.name}
                                    </span>
                                </div>
                                <div className="text-muted-foreground text-sm">
                                    {site.url}
                                </div>
                            </div>

                            <div className="mt-2 flex flex-wrap gap-3 sm:mt-0">
                                <div className="flex flex-col items-center">
                                    <div className="text-muted-foreground mb-1 text-sm">
                                        Response
                                    </div>
                                    <div
                                        className={`rounded-full px-2 py-1 text-xs font-medium ${site.responseTime > 500 ? "bg-amber-500/10 text-amber-500" : "bg-green-500/10 text-green-500"}`}
                                    >
                                        {site.responseTime} ms
                                    </div>
                                </div>

                                <div className="flex flex-col items-center">
                                    <div className="text-muted-foreground mb-1 text-sm">
                                        Status
                                    </div>
                                    <div
                                        className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusClass(site.status)}`}
                                    >
                                        {site.status.toUpperCase()}
                                    </div>
                                </div>

                                <div className="flex flex-col items-center">
                                    <div className="text-muted-foreground mb-1 text-sm">
                                        Uptime
                                    </div>
                                    <div className="rounded-full bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-500">
                                        {site.uptime}%
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const UptimeDemo = () => {
    return (
        <section id="demo" className="relative py-24">
            <div className="bg-primary/10 absolute top-1/3 right-0 -z-10 h-[300px] w-[300px] rounded-full blur-[100px]" />
            <div className="absolute bottom-1/3 left-0 -z-10 h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-[100px]" />

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="text-primary bg-primary/10 mb-3 inline-block rounded-full px-3 py-1 text-sm font-medium">
                            How It Works
                        </span>
                        <h2 className="mb-6 text-3xl font-bold md:text-4xl">
                            Real-Time Website Monitoring Made Simple
                        </h2>
                        <p className="text-muted-foreground mb-6 text-lg">
                            Our platform provides comprehensive, real-time
                            monitoring of your websites and applications from
                            multiple locations worldwide.
                        </p>

                        <div className="mb-8 space-y-4">
                            {[
                                {
                                    title: "Set Up Monitors in Seconds",
                                    description:
                                        "Simply enter your website URL and configure check frequency, alert parameters, and notification methods.",
                                },
                                {
                                    title: "Real-Time Alerting System",
                                    description:
                                        "Get instant notifications through email, SMS, Slack, or other integrations when issues are detected.",
                                },
                                {
                                    title: "Detailed Performance Analytics",
                                    description:
                                        "Track response times, availability, and other critical metrics with comprehensive dashboards.",
                                },
                            ].map((item, idx) => (
                                <div key={idx} className="flex gap-3">
                                    <div className="bg-primary/20 mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full">
                                        <span className="text-primary text-sm font-medium">
                                            {idx + 1}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="mb-1 font-medium">
                                            {item.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Button className="mt-2">Get Started</Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <AnimatedCard className="overflow-hidden">
                            <UptimeDemoPanel />
                        </AnimatedCard>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default UptimeDemo;
