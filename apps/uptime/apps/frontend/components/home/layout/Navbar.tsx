import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import React, { useEffect, useState } from "react";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Link from "next/link";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Determine background color based on theme
  const isDark = theme === "dark" || resolvedTheme === "dark";
  const navBg = scrolled
    ? isDark
      ? "rgba(16,16,20,0.85)"
      : "rgba(255,255,255,0.85)"
    : "rgba(0,0,0,0)";

  return (
    <motion.header
      initial={{ y: -24, opacity: 0, maxWidth: 1280 }}
      animate={{
        y: scrolled ? 8 : 0,
        opacity: 1,
        maxWidth: scrolled ? 720 : 1280,
        boxShadow: scrolled
          ? "0 8px 32px 0 rgba(0,0,0,0.10), 0 1.5px 0 0 rgba(0,0,0,0.08)"
          : "none",
        backgroundColor: navBg,
        backdropFilter: scrolled ? "blur(16px)" : "none",
        border: scrolled
          ? isDark
            ? "1.5px solid rgba(255,255,255,0.08)"
            : "1.5px solid rgba(0,0,0,0.08)"
          : "1.5px solid transparent",
      }}
      transition={{
        type: "spring",
        stiffness: 600,
        damping: 200,
        maxWidth: { stiffness: 600, damping: 200 },
      }}
      className={cn(
        "fixed top-4 left-1/2 z-50 -translate-x-1/2 rounded-full transition-all",
        scrolled ? "px-4 py-2 md:px-8" : "px-4 py-4 md:px-8",
      )}
      style={{
        maxWidth: scrolled ? 720 : 1280,
        width: "100%",
        borderRadius: "9999px",
        border: scrolled
          ? isDark
            ? "1.5px solid rgba(255,255,255,0.08)"
            : "1.5px solid rgba(0,0,0,0.08)"
          : "1.5px solid transparent",
        background: scrolled
          ? isDark
            ? "linear-gradient(90deg,rgba(24,24,28,0.85) 0%,rgba(32,32,36,0.85) 100%)"
            : "linear-gradient(90deg,rgba(255,255,255,0.85) 0%,rgba(245,245,245,0.85) 100%)"
          : "transparent",
        boxShadow: scrolled
          ? "0 8px 32px 0 rgba(0,0,0,0.10), 0 1.5px 0 0 rgba(0,0,0,0.08)"
          : "none",
        backdropFilter: scrolled ? "blur(16px)" : "none",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-full">
            <div className="bg-primary-foreground h-4 w-4 animate-pulse rounded-full" />
          </div>
          <span className="text-xl font-bold">uptime.com</span>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="hover:text-primary text-sm font-medium transition-colors"
          >
            Features
          </a>
          <a
            href="#demo"
            className="hover:text-primary text-sm font-medium transition-colors"
          >
            How It Works
          </a>
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <ModeToggle />

          <SignedIn>
            <Button variant="ghost" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button variant="outline">Sign In</Button>
            </SignInButton>
            <Button>Start Free Trial</Button>
          </SignedOut>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="bg-background border-border absolute top-full right-0 left-0 border-b p-4 shadow-lg md:hidden">
          <nav className="flex flex-col gap-4">
            <a
              href="#features"
              className="hover:text-primary py-2 text-sm font-medium transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#demo"
              className="hover:text-primary py-2 text-sm font-medium transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="hover:text-primary py-2 text-sm font-medium transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              className="hover:text-primary py-2 text-sm font-medium transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </a>
          </nav>

          <div className="border-border flex flex-col gap-2 border-t pt-4">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
              </SignInButton>
              <Button className="w-full">Start Free Trial</Button>
            </SignedOut>
          </div>
        </div>
      )}
    </motion.header>
  );
};

export default Navbar;
