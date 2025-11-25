// src/components/TerminalAbout.js

import React from 'react';

const TerminalAbout = () => {
  return (
    <>
      {/* Command Line 1 */}
      <div className="flex items-start gap-2 text-primary text-sm sm:text-base mb-4">
        <span className="text-primary/80 select-none">$</span>
        <div className="flex-1">
          <span>cat stephen.bio</span>
        </div>
      </div>
      
      {/* Output */}
      <div className="mb-6 sm:mb-8 pl-0 sm:pl-4 space-y-4 sm:space-y-6 font-sans">
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-primary font-mono">
            <span className="select-none">#</span>
            <span>WHO</span>
          </div>
          <p className="text-base sm:text-lg text-[hsl(105,30%,95%)]">
            Hi! I'm <span className="text-primary font-semibold">Stephen</span>, a Computer Engineering 
            student at <span className="text-primary font-semibold">UWaterloo</span> and 
            <span className="text-primary font-semibold"> Software Engineer Intern </span> 
            at MedMe Health (YC W2021).<br/><br/>At MedMe, I worked on their design system, appointment 
            scheduling calendar, and a centralized Taskmaster system
            for hundreds of pharmacies across North America.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-primary font-mono">
            <span className="select-none">#</span>
            <span>PHILOSOPHY</span>
          </div>
          <p className="text-base sm:text-lg text-[hsl(105,30%,95%)]">
            For me, building software is like building anything meaningful. 
            You measure twice, cut once, and learn that craftmanship lies 
            in knowing when to take it apart again and do it better. A good program 
            will never be flawless... instead it's something that's refined through every iteration.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-primary font-mono">
            <span className="select-none">#</span>
            <span>OFF_THE_CLOCK</span>
          </div>
          <p className="text-base sm:text-lg text-[hsl(105,30%,95%)]">
            My current hobbies include going to the gym, cooking, and playing basketball.
          </p>
        </div>

        <div className="space-y-2 pt-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-primary font-mono">
            <span className="select-none">#</span>
            <span>GET_IN_TOUCH</span>
          </div>
          <p className="text-base sm:text-lg text-[hsl(105,30%,95%)]">
            Type '<span className="text-primary font-semibold">contact</span>' to open my email, or '<span className="text-primary font-semibold">help</span>' for all commands.
          </p>
        </div>

      </div>
    </>
  );
};

export default TerminalAbout;