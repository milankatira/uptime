import { motion } from 'framer-motion';
import { Terminal, AlertCircle, Clock, Activity, Link, Shield } from 'lucide-react';

const MonitoringSection = () => {
  return (
    <section className="py-24 bg-black text-white">
      <div className="container mx-auto px-4">
        {/* Best-in-class monitoring */}
        <div className="max-w-4xl mx-auto mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Best-in-class uptime monitoring.
              <br />
              No false positives.
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              We've perfected HTTP monitoring over the years to ensure you never get a false alert.
              Our advanced checks ensure accuracy.
            </p>
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg transition-colors">
              Start Monitoring Now
            </button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Code Terminal */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gray-900 rounded-xl p-6 border border-gray-800"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <pre className="text-sm font-mono text-gray-300">
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
              className="bg-gray-900 rounded-xl p-6 border border-gray-800"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>API Endpoint</span>
                  </div>
                  <span className="text-green-500">89ms</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Database</span>
                  </div>
                  <span className="text-green-500">112ms</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>CDN</span>
                  </div>
                  <span className="text-yellow-500">287ms</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Incident Management */}
        <div className="max-w-4xl mx-auto mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              A lot more than uptime monitoring.
              <br />
              Batteries included.
            </h2>
            <p className="text-gray-400 text-lg">
              Complete incident management platform with alerting, on-call schedules, and incident response.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Incidents Panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gray-900 rounded-xl p-6 border border-gray-800"
            >
              <h3 className="text-xl font-semibold mb-6">Incidents</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <AlertCircle className="text-red-500" />
                    <span className="font-medium">API Latency Alert</span>
                  </div>
                  <p className="text-sm text-gray-400">Response time exceeded threshold (&gt;500ms)</p>
                  <div className="mt-2 text-xs text-gray-500">2 minutes ago</div>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="text-yellow-500" />
                    <span className="font-medium">Database Slowdown</span>
                  </div>
                  <p className="text-sm text-gray-400">Query execution time increased by 50%</p>
                  <div className="mt-2 text-xs text-gray-500">15 minutes ago</div>
                </div>
              </div>
            </motion.div>

            {/* Smart Incident Management */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gray-900 rounded-xl p-6 border border-gray-800"
            >
              <h3 className="text-xl font-semibold mb-6">Smart incident merging</h3>
              <p className="text-gray-400 mb-4">
                AI-powered system detects related issues and automatically merges them to reduce alert fatigue.
              </p>
              <div className="relative h-40 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-indigo-500/20 rounded-full animate-pulse"></div>
                </div>
                <Activity className="w-8 h-8 text-indigo-500" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Integration Section */}
        <div className="max-w-4xl mx-auto text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-8">
              Connect your existing
              <br />
              stack in 5 minutes
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              {[
                { icon: Terminal, label: "CLI" },
                { icon: Link, label: "API" },
                { icon: Shield, label: "Auth" },
                { icon: Activity, label: "Metrics" }
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-4 p-6 bg-gray-900 rounded-xl border border-gray-800"
                >
                  <item.icon className="w-8 h-8 text-indigo-500" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Status Page Section */}
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4">Elegant status page</h2>
            <p className="text-gray-400 text-lg mb-8">
              Share real-time status updates with your customers through a beautiful, customizable status page.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <pre className="text-sm font-mono text-gray-300">
                  <code>{`# Status Updates
✓ All systems operational
✓ Last incident: 7 days ago
✓ Uptime: 99.99% (30 days)`}</code>
                </pre>
              </div>
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full w-[98%] bg-green-500/50 rounded-full"></div>
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