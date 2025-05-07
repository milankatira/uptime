import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

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
      "Basic reporting"
    ],
    cta: "Get Started",
    popular: false
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
      "Custom status pages"
    ],
    cta: "Get Started",
    popular: true
  },
  {
    name: "Enterprise",
    price: 199,
    description: "Comprehensive solution for large organizations with complex needs.",
    features: [
      "Unlimited Monitors",
      "15-second check frequency",
      "SMS + Email + Webhook notifications",
      "Unlimited team members",
      "90-day data retention",
      "Custom reporting",
      "Priority support",
      "SLA guarantees",
      "Dedicated account manager"
    ],
    cta: "Contact Sales",
    popular: false
  }
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            className="inline-block text-sm font-medium text-primary bg-primary/10 rounded-full py-1 px-3 mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Pricing
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
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
            Choose the perfect plan for your business. All plans include a 14-day free trial.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 max-w-5xl mx-auto">
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
                  "rounded-xl border bg-background p-6 h-full flex flex-col",
                  tier.popular && "ring-2 ring-primary shadow-lg"
                )}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-0 right-0 mx-auto w-fit px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    Most Popular
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">{tier.name}</h3>
                  <p className="text-muted-foreground text-sm">{tier.description}</p>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">${tier.price}</span>
                    <span className="text-muted-foreground ml-2">/month</span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8 flex-grow">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
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
            Need a custom plan? We've got you covered.
          </p>
          <Button variant="outline">Contact Sales</Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;