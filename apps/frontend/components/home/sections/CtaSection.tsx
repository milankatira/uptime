import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const CtaSection = () => {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="bg-muted/50 absolute inset-0 -z-10" />
      <div className="bg-primary/20 absolute top-0 right-0 -z-10 h-[300px] w-[300px] rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 -z-10 h-[300px] w-[300px] rounded-full bg-blue-500/20 blur-[100px]" />

      <div className="container mx-auto px-4">
        <div className="bg-card border-border mx-auto max-w-4xl overflow-hidden rounded-2xl border shadow-lg">
          <div className="p-8 md:p-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Start Monitoring Your Website Today
              </h2>
              <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg">
                Join thousands of businesses that rely on Uptime.com for
                comprehensive website monitoring and performance tracking.
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button size="lg" className="px-8">
                  Start Free Trial
                </Button>
                <Button size="lg" variant="outline" className="px-8">
                  Schedule Demo
                </Button>
              </div>

              <p className="text-muted-foreground mt-6 text-sm">
                No credit card required. 14-day free trial.
              </p>
            </motion.div>
          </div>

          <div className="bg-muted/50 border-border flex flex-col items-center justify-between gap-4 border-t p-6 md:flex-row">
            <div className="flex items-center gap-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="bg-primary/20 border-background h-8 w-8 rounded-full border-2"
                    style={{
                      backgroundImage: `url(https://images.pexels.com/photos/22896${i}/pexels-photo-22896${i}.jpeg?auto=compress&cs=tinysrgb&w=120)`,
                      backgroundSize: "cover",
                    }}
                  />
                ))}
              </div>
              <div className="text-sm">
                <span className="text-primary font-semibold">5,000+</span>{" "}
                customers trust us
              </div>
            </div>

            <div className="flex gap-4">
              {["Trustpilot", "G2", "Capterra"].map((platform, idx) => (
                <div key={idx} className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="h-4 w-4 fill-amber-400"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                  <span className="text-muted-foreground ml-1 text-xs">
                    {platform}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
