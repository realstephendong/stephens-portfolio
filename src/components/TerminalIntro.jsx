// src/components/TerminalIntro.js

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button'; // Make sure this path is correct
import { ChevronRight } from 'lucide-react'; // Make sure this path is correct

const TerminalIntro = ({ currentPage }) => {
  return (
    <>
      {/* Command Line 1 */}
      <div className="flex items-start gap-2 text-primary text-sm sm:text-base mb-4">
        <span className="text-primary/80 select-none">$</span>
        <div className="flex-1">
          <span>cat welcome.txt</span>
        </div>
      </div>
      
      {/* Output */}
      <div className="mb-6 sm:mb-8 pl-0 sm:pl-4 space-y-4 sm:space-y-6">
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-primary/60">
            <span className="select-none">#</span>
            <span>WELCOME_MESSAGE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-sans">
            Hi, I am <span className="text-primary">Stephen.</span>
          </h1>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-primary/60">
            <span className="select-none">#</span>
            <span>DESCRIPTION</span>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-foreground/80 font-sans">
            Beep boop. Let's build cool stuff together.
          </p>
        </div>
      </div>
      
      {/* Command Line 2 */}
      <div className="flex items-start gap-2 text-primary text-sm sm:text-base mb-3">
        <span className="text-primary/80 select-none">$</span>
        <div className="flex-1">
          <span>./navigate.sh --options</span>
        </div>
      </div>
      
      {/* Navigation Buttons as Terminal Output */}
      <div className="pl-0 sm:pl-4 mb-6">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          
          {/* Projects Button */}
          {currentPage === 'projects' ? (
            <Button 
              size="lg"
              disabled
              className="group text-sm sm:text-base bg-primary text-primary-foreground font-mono opacity-60 cursor-not-allowed"
            >
              [1] Projects (Current)
            </Button>
          ) : (
            <Link to="/projects" className="inline-block">
              <Button 
                size="lg"
                className="group text-sm sm:text-base bg-primary hover:bg-primary/90 text-primary-foreground font-mono shadow-lg shadow-primary/20"
              >
                [1] Projects
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          )}
          
          {/* About Me Button */}
          {currentPage === 'about' ? (
            <Button 
              variant="outline"
              size="lg"
              disabled
              className="group text-sm sm:text-base border-2 border-primary/40 text-foreground font-mono opacity-60 cursor-not-allowed"
            >
              [2] About Me (Current)
            </Button>
          ) : (
            <Link to="/about" className="inline-block">
              <Button 
                variant="outline"
                size="lg"
                className="group text-sm sm:text-base border-2 border-primary/40 hover:border-primary/60 hover:bg-primary/15 text-foreground font-mono"
              >
                [2] About Me
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          )}
          
          {/* LinkedIn Button */}
          <a 
            href="https://www.linkedin.com/in/stephen-dong/" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Button 
              variant="outline"
              size="lg"
              className="group text-sm sm:text-base border-2 border-primary/40 hover:border-primary/60 hover:bg-primary/15 text-foreground font-mono"
            >
              [3] LinkedIn
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </a>
        </div>
      </div>
    </>
  );
};

export default TerminalIntro;