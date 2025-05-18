import { MagicCard } from "@/components/magicui/magic-card";
import { TracingBeam } from "@/components/ui/TracingBeam";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useAxiosInstance } from "@/lib/axiosInstance";

const FeaturesSection = () => {
  const [features, setFeatures] = useState<
    {
      icon: string; // icon name or url, depending on your API
      title: string;
      description: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const instance = useAxiosInstance();

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await instance.get("/api/v1/features");
        setFeatures(response.data.features || []);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setFeatures([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatures();
  }, [instance]);

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
            Our comprehensive monitoring platform provides all the tools you
            need to ensure your website is performing optimally.
          </motion.p>
        </div>

        <TracingBeam className="w-full">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <div className="col-span-full text-center text-lg text-gray-400">
                Loading features...
              </div>
            ) : features.length === 0 ? (
              <div className="col-span-full text-center text-lg text-gray-400">
                No features available.
              </div>
            ) : (
              features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <MagicCard
                    className="group hover:border-primary/20 border-border flex h-full flex-col items-center overflow-hidden rounded-xl border p-6 text-center transition-colors duration-300"
                    gradientOpacity={0.8}
                    gradientFrom="#6EE7B7"
                    gradientTo="#059669"
                  >
                    <div className="flex h-full flex-col p-6">
                      {/* Render icon if your API provides an icon name or url */}
                      <div className="bg-primary/10 mb-4 w-fit rounded-full p-3">
                        {/* You may need to map icon string to a component */}
                        {/* Example: <IconComponent name={feature.icon} /> */}
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
              ))
            )}
          </div>
        </TracingBeam>
      </div>
    </section>
  );
};

export default FeaturesSection;
