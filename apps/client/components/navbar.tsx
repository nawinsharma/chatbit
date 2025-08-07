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
import { LogOutIcon, ChevronDownIcon } from "lucide-react";
import { Avatar, AvatarFallback } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from "./ui/button";

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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-blue-600 dark:bg-blue-500 text-white text-sm font-semibold">
                          {user.name ? user.name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden sm:block text-sm font-medium text-foreground">
                        {user.name || user.email}
                      </span>
                      <ChevronDownIcon className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-background border-border">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none text-foreground">{user.name || 'User'}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <SignOutForm>
                      <DropdownMenuItem asChild>
                        <button 
                          className="flex items-center gap-2 w-full text-left text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-muted/50"
                        >
                          <LogOutIcon className="h-4 w-4" />
                          Sign Out
                        </button>
                      </DropdownMenuItem>
                    </SignOutForm>
                  </DropdownMenuContent>
                </DropdownMenu>
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
                  <div className="flex items-center gap-3 px-4 py-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-blue-600 dark:bg-blue-500 text-white text-sm font-semibold">
                        {user.name ? user.name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">{user.name || 'User'}</span>
                      <span className="text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </div>
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
                    <Button
                      className="block w-full cursor-pointer text-left py-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                    >
                      Sign Out
                    </Button>
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
