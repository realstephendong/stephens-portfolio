import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Sun, Moon, Laptop, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import websiteLogo from "../images/websitelogo.png"

const GitHubIcon = ({ className }) => (
  <svg viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" 
      fill="currentColor"/>
  </svg>
);

const LinkedInIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" 
      fill="currentColor"/>
  </svg>
);

const NavLink = ({ to, children, onClick, sectionId }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const handleClick = (e) => {
    if (sectionId && location.pathname === '/') {
      // If we're on home page and have a sectionId, scroll to section
      e.preventDefault();
      const element = document.getElementById(sectionId);
      if (element) {
        // Get navbar height to offset scroll position
        const navbar = document.querySelector('header');
        const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 80; // fallback to 80px

        // Calculate scroll position with navbar offset
        const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
        const scrollToPosition = elementTop - navbarHeight - 20; // extra 20px padding

        window.scrollTo({
          top: scrollToPosition,
          behavior: 'smooth'
        });
      }
    } else if (onClick) {
      onClick(e);
    }
  };

  if (sectionId && location.pathname === '/') {
    // Render as button for scrolling on home page
    return (
      <button
        className={`relative px-4 py-2 rounded-full transition-all duration-300 ${
          'text-foreground/70 hover:text-foreground hover:bg-white/5'
        }`}
        onClick={handleClick}
      >
        <span className="relative z-10 font-medium">{children}</span>
      </button>
    );
  }

  return (
    <Link
      to={to}
      className={`relative px-4 py-2 rounded-full transition-all duration-300 ${
        isActive
          ? 'text-primary bg-primary/10 shadow-sm shadow-primary/20'
          : 'text-foreground/70 hover:text-foreground hover:bg-white/5'
      }`}
      onClick={onClick}
    >
      <span className="relative z-10 font-medium">{children}</span>
    </Link>
  );
};

const SocialIcons = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <a 
        href="https://github.com/realstephendong" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group"
      >
        <Button 
          variant="ghost" 
          size="icon"
          className="hover:bg-white/10 rounded-full transition-all h-9 w-9"
        >
          <GitHubIcon className="h-4 w-4 transition-colors group-hover:text-primary" />
        </Button>
      </a>
      <a 
        href="https://www.linkedin.com/in/stephen-dong/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="group"
      >
        <Button 
          variant="ghost" 
          size="icon"
          className="hover:bg-white/10 rounded-full transition-all h-9 w-9"
        >
          <LinkedInIcon className="h-4 w-4 transition-colors group-hover:text-primary" />
        </Button>
      </a>
      <a 
        href="mailto:realstephendong@gmail.com"
        className="group"
      >
        <Button 
          variant="ghost" 
          size="icon"
          className="hover:bg-white/10 rounded-full transition-all h-9 w-9"
        >
          <Mail className="h-4 w-4 transition-colors group-hover:text-primary" />
        </Button>
      </a>
    </div>
  );
};

const ThemeSwitcher = () => {
  const { setTheme } = useTheme();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="hover:bg-white/10 rounded-full transition-all h-9 w-9 border border-white/10 hover:border-primary/30"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background/90 backdrop-blur-xl border-white/10">
        <DropdownMenuItem onClick={() => setTheme("light")} className="hover:bg-white/10 cursor-pointer">
          <Sun className="mr-2 h-4 w-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="hover:bg-white/10 cursor-pointer">
          <Moon className="mr-2 h-4 w-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="hover:bg-white/10 cursor-pointer">
          <Laptop className="mr-2 h-4 w-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const MobileMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden hover:bg-white/10 rounded-full h-9 w-9"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[80vw] sm:w-[350px] pt-12 bg-black/95 backdrop-blur-md border-white/10">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-center text-2xl font-bold text-primary">Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col items-start space-y-4 pt-4">
          <NavLink to="/" sectionId="top">Home</NavLink>
          <NavLink to="/" sectionId="experience">Experience</NavLink>
          <NavLink to="/" sectionId="projects">Projects</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <a
            href="https://drive.google.com/file/d/17teqSstWLJZent8auHZKrpu1Oy_7rzu7/view"
            target="_blank"
            rel="noopener noreferrer"
            className="relative px-4 py-2 rounded-full transition-all duration-300 text-foreground/70 hover:text-foreground hover:bg-white/5"
          >
            <span className="relative z-10 font-medium">Resume</span>
          </a>
          
          <div className="h-px w-full bg-white/10 my-4"></div>
          
          <div className="flex items-center justify-between w-full pt-2">
            <SocialIcons />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 flex justify-center pt-4 px-4">
      {/* Pill-style navbar with frosted glass effect */}
      <nav className="flex justify-between items-center w-full max-w-6xl
                      bg-background/40 backdrop-blur-lg border border-white/10
                      rounded-full px-4 sm:px-6 py-3 shadow-2xl shadow-foreground/10
                      hover:border-primary/20 transition-all duration-300">
        <div className="flex items-center gap-8">
          <Link 
            to="/" 
            sectionId="top"
            className="relative group flex-shrink-0"
          >
            <div className="absolute -inset-2 bg-primary/10 rounded-full opacity-0 
                          group-hover:opacity-100 transition-opacity blur-sm"></div>
            <img 
              src={websiteLogo}
              alt="Logo" 
              className="h-7 sm:h-8 relative" 
            />
          </Link>
          
          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/" sectionId="experience">Experience</NavLink>
            <NavLink to="/" sectionId="projects">Projects</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/blog">Blog</NavLink>
            <a
              href="https://drive.google.com/file/d/17teqSstWLJZent8auHZKrpu1Oy_7rzu7/view"
              target="_blank"
              rel="noopener noreferrer"
              className="relative px-4 py-2 rounded-full transition-all duration-300 text-foreground/70 hover:text-foreground hover:bg-white/5"
            >
              <span className="relative z-10 font-medium">Resume</span>
            </a>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-2">
          <SocialIcons />
          <div className="h-5 w-px bg-white/10 mx-1"></div>
          <ThemeSwitcher />
        </div>
        
        {/* Mobile Actions */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeSwitcher />
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;