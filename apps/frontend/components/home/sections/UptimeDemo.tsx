import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AnimatedCard } from '@/components/ui/AnimatedCard';
import { CheckCircle, XCircle, AlertTriangle, Clock } from 'lucide-react';

const UptimeDemoPanel = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [demoSites, setDemoSites] = useState([
    { name: 'Main Website', url: 'example.com', status: 'up', responseTime: 235, uptime: 99.98 },
    { name: 'E-commerce Store', url: 'store.example.com', status: 'up', responseTime: 312, uptime: 99.95 },
    { name: 'API Gateway', url: 'api.example.com', status: 'up', responseTime: 178, uptime: 99.99 },
    { name: 'Help Center', url: 'help.example.com', status: 'degraded', responseTime: 876, uptime: 99.87 },
    { name: 'Admin Portal', url: 'admin.example.com', status: 'down', responseTime: 2100, uptime: 98.76 },
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
      setDemoSites(sites => {
        return sites.map(site => {
          const random = Math.random();
          let newStatus = site.status;
          let newResponseTime = site.responseTime;
          
          if (random < 0.05) {
            newStatus = 'down';
            newResponseTime = 2000 + Math.floor(Math.random() * 1000);
          } else if (random < 0.15) {
            newStatus = 'degraded';
            newResponseTime = 800 + Math.floor(Math.random() * 400);
          } else {
            newStatus = 'up';
            newResponseTime = 100 + Math.floor(Math.random() * 200);
          }
          
          return {
            ...site,
            status: newStatus,
            responseTime: newResponseTime
          };
        });
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'up':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'down':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'degraded':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'up':
        return 'text-green-500 bg-green-500/10';
      case 'down':
        return 'text-red-500 bg-red-500/10';
      case 'degraded':
        return 'text-amber-500 bg-amber-500/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-xl overflow-hidden">
      <div className="h-12 bg-muted border-b border-border flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <div className="text-sm font-medium ml-2">Uptime Dashboard</div>
        </div>
        <div className="text-sm text-muted-foreground">
          {currentTime.toLocaleTimeString()}
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-medium mb-1">Website Monitoring</h3>
            <p className="text-sm text-muted-foreground">Real-time status of your websites</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">Refresh</Button>
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
              className="bg-background rounded-lg border border-border p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {getStatusIcon(site.status)}
                  <span className="font-medium">{site.name}</span>
                </div>
                <div className="text-sm text-muted-foreground">{site.url}</div>
              </div>
              
              <div className="flex flex-wrap gap-3 mt-2 sm:mt-0">
                <div className="flex flex-col items-center">
                  <div className="text-sm text-muted-foreground mb-1">Response</div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${site.responseTime > 500 ? 'bg-amber-500/10 text-amber-500' : 'bg-green-500/10 text-green-500'}`}>
                    {site.responseTime} ms
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="text-sm text-muted-foreground mb-1">Status</div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(site.status)}`}>
                    {site.status.toUpperCase()}
                  </div>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="text-sm text-muted-foreground mb-1">Uptime</div>
                  <div className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500">
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
    <section id="demo" className="py-24 relative">
      <div className="absolute top-1/3 right-0 -z-10 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/3 left-0 -z-10 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block text-sm font-medium text-primary bg-primary/10 rounded-full py-1 px-3 mb-3">
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Real-Time Website Monitoring Made Simple
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Our platform provides comprehensive, real-time monitoring of your websites and applications from multiple locations worldwide.
            </p>

            <div className="space-y-4 mb-8">
              {[
                {
                  title: "Set Up Monitors in Seconds",
                  description: "Simply enter your website URL and configure check frequency, alert parameters, and notification methods."
                },
                {
                  title: "Real-Time Alerting System",
                  description: "Get instant notifications through email, SMS, Slack, or other integrations when issues are detected."
                },
                {
                  title: "Detailed Performance Analytics",
                  description: "Track response times, availability, and other critical metrics with comprehensive dashboards."
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                    <span className="text-primary font-medium text-sm">{idx + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
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