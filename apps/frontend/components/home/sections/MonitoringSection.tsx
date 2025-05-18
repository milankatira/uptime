import { Button } from "@/components/ui/button";
import GradientText from "@/components/ui/GradientText";
import { motion } from "framer-motion";
import {
  Activity,
  AlertCircle,
  Clock,
  Link,
  Shield,
  Terminal,
} from "lucide-react";
import React from "react";

const MonitoringSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        {/* Best-in-class monitoring */}
        <div className="mx-auto mb-32 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <GradientText
              className="from-foreground to-foreground/70 mt-4 bg-gradient-to-br bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl"
              element="H1"
            >
              Best-in-class uptime monitoring.
            </GradientText>
            <p className="mb-8 text-lg text-gray-400">
              {`We've perfected HTTP monitoring over the years to ensure you never
              get a false alert. Our advanced checks ensure accuracy.`}
            </p>
            <Button>Start Monitoring Now</Button>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Code Terminal */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-xl border border-gray-800 bg-gray-900 p-6"
            >
              <div className="mb-4 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
              <pre className="font-mono text-sm text-gray-300">
                <code>{`$ curl status.example.com
HTTP/1.1 200 OK
Content-Type: application/json

{
  "status": "healthy",
  "uptime": "99.99%",
  "latency": "89ms",
  "checks": {
    "api": "operational",
    "db": "operational",
    "cdn": "operational"
  }
}`}</code>
              </pre>
            </motion.div>

            {/* Status Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-xl border border-gray-800 bg-gray-900 p-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg bg-gray-800/50 p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span>API Endpoint</span>
                  </div>
                  <span className="text-green-500">89ms</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-800/50 p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span>Database</span>
                  </div>
                  <span className="text-green-500">112ms</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gray-800/50 p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                    <span>CDN</span>
                  </div>
                  <span className="text-yellow-500">287ms</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Incident Management */}
        <div className="mx-auto mb-32 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold">
              A lot more than uptime monitoring.
              <br />
              Batteries included.
            </h2>
            <p className="text-lg text-gray-400">
              Complete incident management platform with alerting, on-call
              schedules, and incident response.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Incidents Panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-xl border border-gray-800 bg-gray-900 p-6"
            >
              <h3 className="mb-6 text-xl font-semibold">Incidents</h3>
              <div className="space-y-4">
                <div className="rounded-lg bg-gray-800/50 p-4">
                  <div className="mb-2 flex items-center gap-3">
                    <AlertCircle className="text-red-500" />
                    <span className="font-medium">API Latency Alert</span>
                  </div>
                  <p className="text-sm text-gray-400">
                    Response time exceeded threshold (&gt;500ms)
                  </p>
                  <div className="mt-2 text-xs text-gray-500">
                    2 minutes ago
                  </div>
                </div>
                <div className="rounded-lg bg-gray-800/50 p-4">
                  <div className="mb-2 flex items-center gap-3">
                    <Clock className="text-yellow-500" />
                    <span className="font-medium">Database Slowdown</span>
                  </div>
                  <p className="text-sm text-gray-400">
                    Query execution time increased by 50%
                  </p>
                  <div className="mt-2 text-xs text-gray-500">
                    15 minutes ago
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Smart Incident Management */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-xl border border-gray-800 bg-gray-900 p-6"
            >
              <h3 className="mb-6 text-xl font-semibold">
                Smart incident merging
              </h3>
              <p className="mb-4 text-gray-400">
                AI-powered system detects related issues and automatically
                merges them to reduce alert fatigue.
              </p>
              <div className="relative flex h-40 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-16 w-16 animate-pulse rounded-full bg-indigo-500/20"></div>
                </div>
                <Activity className="h-8 w-8 text-indigo-500" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Integration Section */}
        <div className="mx-auto mb-32 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-8 text-4xl font-bold">
              Connect your existing
              <br />
              stack in 5 minutes
            </h2>
            <div className="mb-8 grid grid-cols-2 gap-8 md:grid-cols-4">
              {[
                { icon: Terminal, label: "CLI" },
                { icon: Link, label: "API" },
                { icon: Shield, label: "Auth" },
                { icon: Activity, label: "Metrics" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-4 rounded-xl border border-gray-800 bg-gray-900 p-6"
                >
                  <item.icon className="h-8 w-8 text-indigo-500" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Status Page Section */}
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-4xl font-bold">Elegant status page</h2>
            <p className="mb-8 text-lg text-gray-400">
              Share real-time status updates with your customers through a
              beautiful, customizable status page.
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
                <pre className="font-mono text-sm text-gray-300">
                  <code>{`# Status Updates
✓ All systems operational
✓ Last incident: 7 days ago
✓ Uptime: 99.99% (30 days)`}</code>
                </pre>
              </div>
              <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-2 overflow-hidden rounded-full bg-gray-800"
                    >
                      <div className="h-full w-[98%] rounded-full bg-green-500/50"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MonitoringSection;
