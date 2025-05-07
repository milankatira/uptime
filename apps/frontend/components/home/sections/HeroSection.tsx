import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { GlowingEffect } from '@/components/ui/GlowingEffect';
import { SpotlightEffect } from '@/components/ui/SpotlightEffect';
import { ArrowRight, Shield, Zap, LineChart, CheckCircle, Globe, Clock, Bell, Search, Activity } from 'lucide-react';

const features = [
  {
    id: 'monitoring',
    title: 'Website Monitoring',
    description: 'Monitor your websites from 180+ locations worldwide',
    icon: Globe,
    screen: (
      <div className="relative bg-gradient-to-b from-card to-card/80 rounded-xl overflow-hidden border border-foreground/[0.06]">
        <div className="h-10 bg-foreground/[0.02] border-b border-foreground/[0.06] flex items-center gap-2 px-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-foreground/10"></div>
            <div className="w-3 h-3 rounded-full bg-foreground/10"></div>
            <div className="w-3 h-3 rounded-full bg-foreground/10"></div>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              { status: 'success', time: '234ms', name: 'API Endpoint' },
              { status: 'success', time: '187ms', name: 'Main Website' },
              { status: 'warning', time: '892ms', name: 'Dashboard' },
              { status: 'success', time: '156ms', name: 'CDN' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.2 }}
                className="flex items-center gap-4 p-4 rounded-lg border border-foreground/[0.06] bg-gradient-to-r from-foreground/[0.02] to-transparent hover:border-foreground/20 transition-colors"
              >
                <div className={`h-2 w-2 rounded-full ${item.status === 'success' ? 'bg-green-500' : 'bg-yellow-500'} glow-dot`} />
                <div className="flex-grow">
                  <div className="text-sm font-medium">{item.name}</div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {item.time}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'alerts',
    title: 'Instant Alerts',
    description: 'Get notified immediately when issues occur',
    icon: Bell,
    screen: (
      <div className="relative bg-gradient-to-b from-card to-card/80 rounded-xl overflow-hidden border border-foreground/[0.06]">
        <div className="h-10 bg-foreground/[0.02] border-b border-foreground/[0.06] flex items-center gap-2 px-4">
          <Bell className="h-4 w-4 text-foreground/70" />
          <span className="text-sm">Alerts</span>
        </div>
        <div className="p-6 space-y-4">
          {[
            { type: 'critical', message: 'API latency exceeded threshold', time: '2m ago' },
            { type: 'warning', message: 'High memory usage detected', time: '5m ago' },
            { type: 'info', message: 'SSL certificate expires in 30 days', time: '10m ago' }
          ].map((alert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="p-4 rounded-lg border border-foreground/[0.06] bg-foreground/[0.02]"
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  alert.type === 'critical' ? 'bg-red-500/10 text-red-500' :
                  alert.type === 'warning' ? 'bg-yellow-500/10 text-yellow-500' :
                  'bg-blue-500/10 text-blue-500'
                }`}>
                  {alert.type.toUpperCase()}
                </span>
                <span className="text-xs text-muted-foreground">{alert.time}</span>
              </div>
              <p className="text-sm">{alert.message}</p>
            </motion.div>
          ))}
        </div>
      </div>
    )
  },
  {
    id: 'performance',
    title: 'Performance Tracking',
    description: 'Monitor response times and performance metrics',
    icon: Activity,
    screen: (
      <div className="relative bg-gradient-to-b from-card to-card/80 rounded-xl overflow-hidden border border-foreground/[0.06]">
        <div className="h-10 bg-foreground/[0.02] border-b border-foreground/[0.06] flex items-center gap-2 px-4">
          <Activity className="h-4 w-4 text-foreground/70" />
          <span className="text-sm">Performance</span>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {[
              { label: 'Response Time', value: '245ms', trend: 'down' },
              { label: 'Uptime', value: '99.99%', trend: 'up' },
              { label: 'SSL Score', value: 'A+', trend: 'stable' }
            ].map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">{metric.label}</span>
                  <span className="text-sm font-medium">{metric.value}</span>
                </div>
                <div className="h-2 bg-foreground/[0.06] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '85%' }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="h-full bg-foreground/20 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'security',
    title: 'Security Monitoring',
    description: 'SSL certificates and security checks',
    icon: Shield,
    screen: (
      <div className="relative bg-gradient-to-b from-card to-card/80 rounded-xl overflow-hidden border border-foreground/[0.06]">
        <div className="h-10 bg-foreground/[0.02] border-b border-foreground/[0.06] flex items-center gap-2 px-4">
          <Shield className="h-4 w-4 text-foreground/70" />
          <span className="text-sm">Security</span>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              { check: 'SSL Certificate', status: 'Valid', expiry: '11 months' },
              { check: 'HTTPS Redirect', status: 'Enabled', expiry: null },
              { check: 'Security Headers', status: 'Configured', expiry: null }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="p-4 rounded-lg border border-foreground/[0.06] bg-gradient-to-r from-foreground/[0.02] to-transparent"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium mb-1">{item.check}</div>
                    {item.expiry && (
                      <div className="text-xs text-muted-foreground">Expires in {item.expiry}</div>
                    )}
                  </div>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-500/10 text-green-500">
                    {item.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    )
  }
];

const HeroSection = () => {
  const [activeFeature, setActiveFeature] = useState(features[0].id);

  return (
    <section className="relative min-h-screen flex items-center py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 background-grid opacity-[0.02]" />
      
      {/* Subtle gradient overlays */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background to-transparent opacity-50" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background to-transparent opacity-50" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block"
            >
              <SpotlightEffect className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/[0.03] border border-foreground/10">
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-foreground/[0.05]">
                  <Clock className="h-3.5 w-3.5 text-foreground/70" />
                  <span className="text-xs font-medium">24/7</span>
                </div>
                <span className="text-sm font-medium text-foreground/70">
                  Monitoring from 180+ locations
                </span>
              </SpotlightEffect>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-5xl lg:text-7xl font-bold mb-6 tracking-tight"
            >
              Know First, 
              <div className="relative mt-2 inline-flex flex-col">
                <span className="text-foreground/90">Act Fast</span>
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-[2px] bg-foreground/20"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-[2px] bg-foreground"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 0.6 }}
                  transition={{ delay: 1, duration: 0.6 }}
                />
              </div>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg text-muted-foreground mb-8 max-w-xl"
            >
              Get instant alerts before your users experience issues. Monitor uptime, performance, and security from multiple locations worldwide.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="group relative overflow-hidden">
                <span className="relative z-10">Start Monitoring Free</span>
                <motion.div
                  className="absolute inset-0 bg-foreground/5"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="group">
                Schedule Demo
                <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-all" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-12"
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {features.map((feature, index) => (
                  <motion.button
                    key={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    onClick={() => setActiveFeature(feature.id)}
                    className={`p-4 rounded-lg border transition-all duration-300 ${
                      activeFeature === feature.id
                        ? 'border-foreground/20 bg-foreground/[0.03]'
                        : 'border-transparent hover:border-foreground/10'
                    }`}
                  >
                    <feature.icon className={`h-5 w-5 mb-2 ${
                      activeFeature === feature.id
                        ? 'text-foreground'
                        : 'text-foreground/70'
                    }`} />
                    <div className="text-sm font-medium">{feature.title}</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <GlowingEffect className="rounded-xl overflow-hidden">
              {features.map((feature) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, scale: 0.95, x: 20 }}
                  animate={{
                    opacity: activeFeature === feature.id ? 1 : 0,
                    scale: activeFeature === feature.id ? 1 : 0.95,
                    x: activeFeature === feature.id ? 0 : 20
                  }}
                  transition={{ duration: 0.3 }}
                  className={`absolute inset-0 ${activeFeature === feature.id ? 'pointer-events-auto' : 'pointer-events-none'}`}
                >
                  {feature.screen}
                </motion.div>
              ))}
            </GlowingEffect>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;