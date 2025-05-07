import { motion } from 'framer-motion';
import { AnimatedNumbers } from '@/components/ui/AnimatedNumbers';
import { CheckCircle, Globe, Clock, BellRing } from 'lucide-react';

const StatsSection = () => {
  return (
    <section className="py-16 bg-muted/50 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/50 to-background opacity-50" />
      <div className="absolute top-1/2 left-1/4 -z-10 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute top-1/2 right-1/4 -z-10 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { 
              icon: <Globe className="h-10 w-10 text-primary" />,
              value: 99.99,
              label: "Uptime Guarantee",
              suffix: "%",
              description: "Our platform maintains exceptional reliability"
            },
            { 
              icon: <Clock className="h-10 w-10 text-primary" />,
              value: 3000,
              label: "Checks per Month",
              suffix: "+",
              description: "Comprehensive monitoring for your websites"
            },
            { 
              icon: <BellRing className="h-10 w-10 text-primary" />,
              value: 45,
              label: "Second Response",
              suffix: "s",
              description: "Lightning-fast alert notifications"
            },
            { 
              icon: <CheckCircle className="h-10 w-10 text-primary" />,
              value: 5000,
              label: "Happy Customers",
              suffix: "+",
              description: "Trusted by businesses worldwide"
            }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-background rounded-xl border border-border p-6 flex flex-col items-center text-center relative overflow-hidden group hover:border-foreground/20 transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
              <div className="mb-4 p-3 bg-primary/10 rounded-full relative">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold flex items-center justify-center mb-2 relative">
                <AnimatedNumbers
                  value={stat.value}
                  duration={1.5}
                  formatValue={(value) => value.toFixed(stat.suffix === "%" ? 2 : 0)}
                />
                <span>{stat.suffix}</span>
              </div>
              <div className="text-lg font-medium mb-2 relative">{stat.label}</div>
              <p className="text-sm text-muted-foreground relative">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;