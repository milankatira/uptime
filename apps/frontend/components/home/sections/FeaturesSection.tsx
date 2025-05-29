import { MagicCard } from "@/components/magicui/magic-card";
import { TracingBeam } from "@/components/ui/TracingBeam";
import { motion } from "framer-motion";
import {
    AlertTriangle,
    Bell,
    CheckCircle2,
    Clock,
    LineChart,
    RefreshCw,
    Search,
    Settings,
    Shield,
    Users,
    Webhook,
    Zap,
} from "lucide-react";
import React from "react";

const features = [
    {
        icon: <Bell className="text-primary h-8 w-8" />,
        title: "Instant Alerts",
        description:
            "Get notified immediately when your website experiences issues via email, SMS, Slack, or other integrations.",
    },
    {
        icon: <LineChart className="text-primary h-8 w-8" />,
        title: "Performance Monitoring",
        description:
            "Track website speed and performance metrics to ensure optimal user experience.",
    },
    {
        icon: <Shield className="text-primary h-8 w-8" />,
        title: "SSL Certificate Monitoring",
        description:
            "Never miss an SSL certificate expiration with automated monitoring and alerts.",
    },
    {
        icon: <Clock className="text-primary h-8 w-8" />,
        title: "Uptime Monitoring",
        description:
            "24/7 monitoring to ensure your website is always available to your customers.",
    },
    {
        icon: <Search className="text-primary h-8 w-8" />,
        title: "Root Cause Analysis",
        description:
            "Quickly identify and diagnose issues with detailed error logs and traceback information.",
    },
    {
        icon: <AlertTriangle className="text-primary h-8 w-8" />,
        title: "Anomaly Detection",
        description:
            "AI-powered system to detect unusual patterns and potential issues before they become critical.",
    },
    {
        icon: <CheckCircle2 className="text-primary h-8 w-8" />,
        title: "Health Checks",
        description:
            "Regular automated checks for DNS, SSL certificates, server response, and more.",
    },
    {
        icon: <RefreshCw className="text-primary h-8 w-8" />,
        title: "Automated Recovery",
        description:
            "Set up automated actions to restart services or trigger webhooks when issues are detected.",
    },
    {
        icon: <Webhook className="text-primary h-8 w-8" />,
        title: "API Monitoring",
        description:
            "Monitor API endpoints with custom request headers, body data, and response validation.",
    },
    {
        icon: <Users className="text-primary h-8 w-8" />,
        title: "Team Collaboration",
        description:
            "Assign roles, manage permissions, and collaborate effectively with your team.",
    },
    {
        icon: <Settings className="text-primary h-8 w-8" />,
        title: "Custom Configurations",
        description:
            "Tailor monitoring settings to your specific needs with flexible configuration options.",
    },
    {
        icon: <Zap className="text-primary h-8 w-8" />,
        title: "Real-time Metrics",
        description:
            "View real-time performance metrics and analytics from your monitoring dashboard.",
    },
];

const FeaturesSection = () => {
    return (
        <section id="features" className="relative py-24">
            <div className="from-background via-background/50 to-background absolute inset-0 -z-10 bg-gradient-to-b" />
            <div className="bg-primary/5 absolute top-1/4 left-0 -z-10 h-[300px] w-[300px] rounded-full blur-[100px]" />
            <div className="bg-primary/5 absolute right-0 bottom-1/4 -z-10 h-[300px] w-[300px] rounded-full blur-[100px]" />

            <div className="container mx-auto px-4">
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <motion.span
                        className="text-primary bg-primary/10 mb-3 inline-block rounded-full px-3 py-1 text-sm font-medium"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        Features
                    </motion.span>
                    <motion.h2
                        className="mb-4 text-3xl font-bold md:text-4xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Everything You Need to Monitor Your Website
                    </motion.h2>
                    <motion.p
                        className="text-muted-foreground text-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Our comprehensive monitoring platform provides all the
                        tools you need to ensure your website is performing
                        optimally.
                    </motion.p>
                </div>

                <TracingBeam className="w-full">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.05,
                                }}
                            >
                                <MagicCard
                                    className="group hover:border-primary/20 border-border flex h-full flex-col items-center overflow-hidden rounded-xl border p-6 text-center transition-colors duration-300"
                                    gradientOpacity={0.8}
                                    gradientFrom="#6EE7B7"
                                    gradientTo="#059669"
                                >
                                    <div className="flex h-full flex-col p-6 items-center">
                                        <div className="bg-primary/10 mb-4 w-fit rounded-full p-3">
                                            {feature.icon}
                                        </div>
                                        <h3 className="mb-2 text-xl font-semibold">
                                            {feature.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm">
                                            {feature.description}
                                        </p>
                                    </div>
                                </MagicCard>
                            </motion.div>
                        ))}
                    </div>
                </TracingBeam>
            </div>
        </section>
    );
};

export default FeaturesSection;
