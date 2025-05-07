import { motion } from 'framer-motion';
import { TracingBeam } from '@/components/ui/TracingBeam';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { 
  Bell, 
  LineChart, 
  Shield, 
  Clock, 
  BarChart3, 
  Globe, 
  MessageSquare, 
  Smartphone,
  Zap,
  Search,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Webhook,
  Users,
  Settings
} from 'lucide-react';

const features = [
  {
    icon: <Bell className="h-8 w-8 text-primary" />,
    title: "Instant Alerts",
    description:
      "Get notified immediately when your website experiences issues via email, SMS, Slack, or other integrations."
  },
  {
    icon: <LineChart className="h-8 w-8 text-primary" />,
    title: "Performance Monitoring",
    description:
      "Track website speed and performance metrics to ensure optimal user experience."
  },
  {
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: "SSL Certificate Monitoring",
    description:
      "Never miss an SSL certificate expiration with automated monitoring and alerts."
  },
  {
    icon: <Clock className="h-8 w-8 text-primary" />,
    title: "Uptime Monitoring",
    description:
      "24/7 monitoring to ensure your website is always available to your customers."
  },
  {
    icon: <Search className="h-8 w-8 text-primary" />,
    title: "Root Cause Analysis",
    description:
      "Quickly identify and diagnose issues with detailed error logs and traceback information."
  },
  {
    icon: <AlertTriangle className="h-8 w-8 text-primary" />,
    title: "Anomaly Detection",
    description:
      "AI-powered system to detect unusual patterns and potential issues before they become critical."
  },
  {
    icon: <CheckCircle2 className="h-8 w-8 text-primary" />,
    title: "Health Checks",
    description:
      "Regular automated checks for DNS, SSL certificates, server response, and more."
  },
  {
    icon: <RefreshCw className="h-8 w-8 text-primary" />,
    title: "Automated Recovery",
    description:
      "Set up automated actions to restart services or trigger webhooks when issues are detected."
  },
  {
    icon: <Webhook className="h-8 w-8 text-primary" />,
    title: "API Monitoring",
    description:
      "Monitor API endpoints with custom request headers, body data, and response validation."
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Team Collaboration",
    description:
      "Assign roles, manage permissions, and collaborate effectively with your team."
  },
  {
    icon: <Settings className="h-8 w-8 text-primary" />,
    title: "Custom Configurations",
    description:
      "Tailor monitoring settings to your specific needs with flexible configuration options."
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Real-time Metrics",
    description:
      "View real-time performance metrics and analytics from your monitoring dashboard."
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/50 to-background" />
      <div className="absolute top-1/4 left-0 -z-10 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-0 -z-10 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            className="inline-block text-sm font-medium text-primary bg-primary/10 rounded-full py-1 px-3 mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Features
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
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
            Our comprehensive monitoring platform provides all the tools you need to ensure your website is performing optimally.
          </motion.p>
        </div>

        <TracingBeam className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <SpotlightCard className="h-full">
                  <div className="flex flex-col h-full p-6">
                    <div className="mb-4 p-3 bg-primary/10 rounded-full w-fit">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </TracingBeam>
      </div>
    </section>
  );
};

export default FeaturesSection;