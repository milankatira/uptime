import { InfiniteMovingCards } from "@/components/ui/InfiniteMovingCards";
import { motion } from "framer-motion";

const testimonials = [
    {
        quote: "Uptime.com has been a game-changer for our business. We're able to catch and fix issues before our customers even notice them.",
        name: "Alex Thompson",
        title: "CTO, TechStacks Inc.",
        image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        quote: "The alerting system is incredibly reliable. We've reduced our downtime by 85% since implementing Uptime.com.",
        name: "Sarah Johnson",
        title: "IT Director, E-commerce Plus",
        image: "https://images.pexels.com/photos/3754208/pexels-photo-3754208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        quote: "The global monitoring capabilities give us confidence that our international customers have a consistent experience.",
        name: "Michael Chen",
        title: "VP of Engineering, GlobalTech",
        image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        quote: "Setting up monitors was incredibly easy, and the dashboard gives our team exactly what they need at a glance.",
        name: "Jessica Williams",
        title: "DevOps Lead, SaaS Solutions",
        image: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        quote: "The ROI on Uptime.com was immediate. We avoided a major outage on our biggest sales day of the year.",
        name: "David Rodriguez",
        title: "E-commerce Manager, RetailGiant",
        image: "https://images.pexels.com/photos/3785096/pexels-photo-3785096.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        quote: "Customer support is exceptional. They helped us configure advanced monitoring for our complex infrastructure.",
        name: "Priya Patel",
        title: "System Administrator, FinTech Solutions",
        image: "https://images.pexels.com/photos/1757281/pexels-photo-1757281.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
];

const TestimonialsSection = () => {
    return (
        <section id="testimonials" className="relative py-24">
            <div className="absolute top-1/4 left-0 -z-10 h-[300px] w-[300px] rounded-full bg-blue-500/5 blur-[100px]" />
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
                        Testimonials
                    </motion.span>
                    <motion.h2
                        className="mb-4 text-3xl font-bold md:text-4xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Trusted by thousands of websites worldwide
                    </motion.h2>
                    <motion.p
                        className="text-muted-foreground text-lg"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        See what our customers have to say about their
                        experience with Uptime.com
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    <InfiniteMovingCards
                        items={testimonials}
                        direction="left"
                        speed="fast"
                        pauseOnHover={true}
                        className="py-4"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="mt-6"
                >
                    <InfiniteMovingCards
                        items={[...testimonials].reverse()}
                        direction="right"
                        speed="fast"
                        pauseOnHover={true}
                        className="py-4"
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
