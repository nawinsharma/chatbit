"use client";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { authClient } from '@/lib/auth-client';
import { ThemeToggle } from './theme-toggle';
import SignOutForm from './sign-out-form';
import Link from 'next/link';
import Logo from './logo';
import { usePathname } from 'next/navigation';
import { LogOutIcon } from "lucide-react";

export function Nav() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const pathname = usePathname();
  
  // Determine if we're on dashboard pages
  const isDashboard = pathname.startsWith('/dashboard');
  
  // Different nav items for dashboard vs landing page
  const navItems: Array<{ name: string; link: string }> = isDashboard ? (
    pathname.startsWith('/dashboard') ? [
      // Dashboard nav items can be added here later
    ] : []
  ) : [
    {
      name: "Features",
      link: "#features",
    },
    {
      name: "Pricing",
      link: "#pricing",
    },
    {
      name: "Testimonials",
      link: "#testimonials",
    }
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <div className="flex items-center">
            <Logo />
          </div>
          <NavItems items={navItems} />
          <div className="relative z-[70] flex items-center gap-2">
            <ThemeToggle />
            {user ? (
              <>
                {!isDashboard && (
                  <NavbarButton 
                    href="/dashboard" 
                    variant="secondary"
                    as={Link}
                  >
                    Dashboard
                  </NavbarButton>
                )}
                <SignOutForm>
                  <NavbarButton 
                    className="bg-red-500 text-white hover:bg-red-600"
                    as="button"
                  >
                    <LogOutIcon className="h-3 w-3" />
                  </NavbarButton>
                </SignOutForm>
              </>
            ) : (
              <>
                <NavbarButton 
                  href="/sign-in" 
                  variant="secondary"
                  as={Link}
                >
                  Login
                </NavbarButton>
                <NavbarButton 
                  href="/sign-up" 
                  variant="primary"
                  as={Link}
                >
                  Sign Up
                </NavbarButton>
              </>
            )}
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <Logo />
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </MobileNavHeader>
          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="block px-4 py-2 text-foreground hover:bg-muted rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="border-t border-border mt-4 pt-4 px-4 space-y-2">
              {user ? (
                <>
                  {!isDashboard && (
                    <Link
                      href="/dashboard"
                      className="block py-2 text-foreground hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  )}
                  <SignOutForm>
                    <button
                      className="block w-full text-left py-2 bg-red-500 text-white hover:bg-red-600 transition-colors"
                    >
                      Sign Out
                    </button>
                  </SignOutForm>
                </>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    className="block py-2 text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/sign-up"
                    className="block py-2 text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}

// Export as default for compatibility
export default Nav;
