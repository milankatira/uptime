import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    FacebookIcon,
    InstagramIcon,
    LinkedinIcon,
    TwitterIcon,
    YoutubeIcon,
} from "lucide-react";
import React from "react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="px-4 py-12">
            {/* Subtle glowing line at the top */}
            <div className="relative mx-auto mb-8 h-px w-full bg-transparent">
                <div className="absolute top-0 left-1/2 w-[224px] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/70 to-transparent blur-[2px] h-[2px]" />
            </div>
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div className="col-span-1 md:col-span-1">
                        <div className="mb-4 flex items-center gap-2">
                            <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-full">
                                <div className="bg-primary-foreground h-3 w-3 rounded-full"></div>
                            </div>
                            <span className="text-lg font-bold">
                                uptime.com
                            </span>
                        </div>
                        <p className="text-muted-foreground mb-4 text-sm">
                            The complete website and application monitoring
                            platform for businesses of all sizes.
                        </p>
                        <div className="flex gap-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="hover:text-primary"
                                aria-label="Facebook"
                            >
                                <FacebookIcon className="h-5 w-5" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="hover:text-primary"
                                aria-label="Twitter"
                            >
                                <TwitterIcon className="h-5 w-5" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="hover:text-primary"
                                aria-label="Instagram"
                            >
                                <InstagramIcon className="h-5 w-5" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="hover:text-primary"
                                aria-label="LinkedIn"
                            >
                                <LinkedinIcon className="h-5 w-5" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="hover:text-primary"
                                aria-label="YouTube"
                            >
                                <YoutubeIcon className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-4 font-semibold">Product</h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                                >
                                    Features
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                                >
                                    Pricing
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                                >
                                    API
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                                >
                                    Status Page
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                                >
                                    Integrations
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 font-semibold">Resources</h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                                >
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                                >
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                                >
                                    Guides
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                                >
                                    Support
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                                >
                                    Status
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 font-semibold">Company</h3>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="#"
                                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                                >
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                                >
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                                >
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                                >
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                                >
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div
                    className={cn(
                        "border-border mt-12 border-t pt-8",
                        "flex flex-col items-center justify-between gap-4 md:flex-row",
                    )}
                >
                    <p className="text-muted-foreground text-sm">
                        © {currentYear} Uptime.com, Inc. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <a
                            href="#"
                            className="text-muted-foreground hover:text-primary text-sm transition-colors"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="#"
                            className="text-muted-foreground hover:text-primary text-sm transition-colors"
                        >
                            Terms of Service
                        </a>
                        <a
                            href="#"
                            className="text-muted-foreground hover:text-primary text-sm transition-colors"
                        >
                            GDPR
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
