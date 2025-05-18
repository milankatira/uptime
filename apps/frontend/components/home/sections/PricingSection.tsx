import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import React from "react";

const tiers = [
  {
    name: "Basic",
    price: 29,
    description: "Essential monitoring for small websites and businesses.",
    features: [
      "5 Monitors",
      "60-second check frequency",
      "Email notifications",
      "1 team member",
      "7-day data retention",
      "Basic reporting",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Professional",
    price: 79,
    description: "Advanced monitoring for growing businesses and websites.",
    features: [
      "20 Monitors",
      "30-second check frequency",
      "SMS + Email notifications",
      "5 team members",
      "30-day data retention",
      "Advanced reporting",
      "API access",
      "Custom status pages",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise",
    price: 199,
    description:
      "Comprehensive solution for large organizations with complex needs.",
    features: [
      "Unlimited Monitors",
      "15-second check frequency",
      "SMS + Email + Webhook notifications",
      "Unlimited team members",
      "90-day data retention",
      "Custom reporting",
      "Priority support",
      "SLA guarantees",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="bg-muted/30 py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.span
            className="text-primary bg-primary/10 mb-3 inline-block rounded-full px-3 py-1 text-sm font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Pricing
          </motion.span>
          <motion.h2
            className="mb-4 text-3xl font-bold md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Plans for Every Monitoring Need
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Choose the perfect plan for your business. All plans include a
            14-day free trial.
          </motion.p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-10">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div
                className={cn(
                  "bg-background flex h-full flex-col rounded-xl border p-6",
                  tier.popular && "ring-primary shadow-lg ring-2",
                )}
              >
                {tier.popular && (
                  <div className="bg-primary text-primary-foreground absolute -top-4 right-0 left-0 mx-auto w-fit rounded-full px-3 py-1 text-xs font-semibold">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="mb-2 text-xl font-semibold">{tier.name}</h3>
                  <p className="text-muted-foreground text-sm">
                    {tier.description}
                  </p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">${tier.price}</span>
                    <span className="text-muted-foreground ml-2">/month</span>
                  </div>
                </div>

                <ul className="mb-8 flex-grow space-y-3">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="text-primary mt-0.5 h-5 w-5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className="w-full"
                  variant={tier.popular ? "default" : "outline"}
                >
                  {tier.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            {` Need a custom plan? We've got you covered.`}
          </p>
          <Button variant="outline">Contact Sales</Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
