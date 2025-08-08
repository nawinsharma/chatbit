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
                    className="text-xs sm:text-sm px-3 sm:px-4 py-2"
                  >
                    Dashboard
                  </NavbarButton>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                      <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                        <AvatarFallback className="bg-blue-600 dark:bg-blue-500 text-white text-xs sm:text-sm font-semibold">
                          {user.name ? user.name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden sm:block text-sm font-medium text-foreground">
                        {user.name || user.email}
                      </span>
                      <ChevronDownIcon className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
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
                          className="flex items-center gap-2 w-full text-left text-white hover:text-gray-300 hover:bg-muted/50"
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
                  className="text-xs sm:text-sm px-3 sm:px-4 py-2"
                >
                  Login
                </NavbarButton>
                <NavbarButton 
                  href="/sign-up" 
                  variant="primary"
                  as={Link}
                  className="text-xs sm:text-sm px-3 sm:px-4 py-2"
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
            {/* User Section */}
            <div className="border-t border-border/50 mt-4 pt-4 flex flex-col items-center justify-center">
              {user ? (
                <>
                  {/* User Profile Card */}
                  <div className="px-4 py-4 mb-4">
                    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl border border-blue-200/50 dark:border-blue-800/50">
                      <Avatar className="h-12 w-12 ring-2 ring-blue-200 dark:ring-blue-800">
                        <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-lg font-semibold">
                          {user.name ? user.name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-foreground truncate">
                          {user.name || 'User'}
                        </h4>
                        <p className="text-xs text-muted-foreground truncate">
                          {user.email}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                            Online
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* User Actions */}
                  <div className="space-y-1">
                    <SignOutForm>
                      <Button
                        className="flex items-center gap-3 px-4 py-3 text-sm sm:text-base text-white hover:text-gray-200 bg-red-600 hover:bg-red-700 transition-colors rounded-lg w-full justify-start"
                      >
                          <LogOutIcon className="h-4 w-4 text-white" />
                        <span className="group-hover:translate-x-1 transition-transform duration-200 font-semibold">
                          Sign Out
                        </span>
                      </Button>
                    </SignOutForm>
                  </div>
                </>
              ) : (
                <>
                  {/* Guest Actions */}
                  <div className="space-y-3 px-4">
                    <Link
                      href="/sign-in"
                      className="flex items-center justify-center w-full px-4 py-3 text-sm sm:text-base font-medium text-foreground bg-muted/50 hover:bg-muted rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/sign-up"
                      className="flex items-center justify-center w-full px-4 py-3 text-sm sm:text-base font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-colors shadow-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
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
