// components/Navbar.tsx
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { cn } from '@/lib/utils'

// Clerk imports
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
} from '@clerk/nextjs'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-4 md:px-8",
        scrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-full">
            <div className="w-4 h-4 bg-primary-foreground rounded-full animate-pulse" />
          </div>
          <span className="text-xl font-bold">uptime.com</span>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</a>
          <a href="#demo" className="text-sm font-medium hover:text-primary transition-colors">How It Works</a>
          <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">Pricing</a>
          <a href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">Testimonials</a>
        </nav>

        {/* Desktop Auth / Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <ModeToggle />

          {/* When signed in, show avatar dropdown; otherwise show Sign In */}
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

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <ModeToggle />
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border p-4 shadow-lg">
          <nav className="flex flex-col gap-4">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="#demo" className="text-sm font-medium hover:text-primary transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
            <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
            <a href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>Testimonials</a>
          </nav>

          <div className="flex flex-col gap-2 pt-4 border-t border-border">
            {/* Auth buttons in mobile menu */}
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <Button variant="outline" className="w-full">Sign In</Button>
              </SignInButton>
              <Button className="w-full">Start Free Trial</Button>
            </SignedOut>

          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
