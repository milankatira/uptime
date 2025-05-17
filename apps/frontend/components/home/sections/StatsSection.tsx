import { MagicCard } from "@/components/magicui/magic-card";
import { AnimatedNumbers } from "@/components/ui/AnimatedNumbers";
import { motion } from "framer-motion";
import { BellRing, CheckCircle, Clock, Globe } from "lucide-react";
import React from "react";

const StatsSection = () => {
  return (
    <section className="relative overflow-hidden py-16">
      <div className="from-background via-background/50 to-background absolute inset-0 -z-10 bg-gradient-to-b opacity-50" />
      <div className="bg-primary/5 absolute top-1/2 left-1/4 -z-10 h-[300px] w-[300px] rounded-full blur-[100px]" />
      <div className="bg-primary/5 absolute top-1/2 right-1/4 -z-10 h-[300px] w-[300px] rounded-full blur-[100px]" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: <Globe className="text-primary h-10 w-10" />,
              value: 99.99,
              label: "Uptime Guarantee",
              suffix: "%",
              description: "Our platform maintains exceptional reliability",
            },
            {
              icon: <Clock className="text-primary h-10 w-10" />,
              value: 3000,
              label: "Checks per Month",
              suffix: "+",
              description: "Comprehensive monitoring for your websites",
            },
            {
              icon: <BellRing className="text-primary h-10 w-10" />,
              value: 45,
              label: "Second Response",
              suffix: "s",
              description: "Lightning-fast alert notifications",
            },
            {
              icon: <CheckCircle className="text-primary h-10 w-10" />,
              value: 5000,
              label: "Happy Customers",
              suffix: "+",
              description: "Trusted by businesses worldwide",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <MagicCard
                className="group hover:border-primary/20 border-border flex h-full flex-col items-center overflow-hidden rounded-xl border p-6 text-center transition-colors duration-300"
                gradientOpacity={0.8}
                gradientFrom="#6EE7B7"
                gradientTo="#059669"
              >
                <div className="mx-auto mb-4 flex w-full justify-center rounded-full p-3">
                  {stat.icon}
                </div>
                <div className="relative mb-2 flex items-center justify-center text-4xl font-bold">
                  <AnimatedNumbers
                    value={stat.value}
                    duration={1.5}
                    formatValue={(value) =>
                      value.toFixed(stat.suffix === "%" ? 2 : 0)
                    }
                  />
                  <span>{stat.suffix}</span>
                </div>
                <div className="relative mb-2 text-lg font-medium">
                  {stat.label}
                </div>
                <p className="text-muted-foreground relative text-sm">
                  {stat.description}
                </p>
              </MagicCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
