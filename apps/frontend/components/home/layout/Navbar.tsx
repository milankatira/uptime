// components/Navbar.tsx
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

// Clerk imports
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 px-4 py-4 transition-all duration-300 md:px-8",
        scrolled
          ? "bg-background/80 shadow-sm backdrop-blur-md"
          : "bg-transparent",
      )}
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
          <a
            href="#pricing"
            className="hover:text-primary text-sm font-medium transition-colors"
          >
            Pricing
          </a>
          <a
            href="#testimonials"
            className="hover:text-primary text-sm font-medium transition-colors"
          >
            Testimonials
          </a>
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <ModeToggle />

          <SignedIn>
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
    </header>
  );
};

export default Navbar;
