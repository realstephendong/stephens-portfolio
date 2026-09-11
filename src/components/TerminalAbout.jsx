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
      <div className="mb-6 sm:mb-8 pl-0 sm:pl-4 space-y-5 sm:space-y-7">
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs text-primary/80">
            <span className="select-none">#</span>
            <span>who</span>
          </div>
          <p className="font-mono text-sm sm:text-[0.9375rem] leading-relaxed text-foreground/85">
            computer engineering at waterloo, most recently a software engineering
            intern at <span className="text-primary">shopify</span> on the collections engine.
            before that: pharmacy scheduling at medme health, speech-to-text for
            social robots at the waterloo robotics lab.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs text-primary/80">
            <span className="select-none">#</span>
            <span>philosophy</span>
          </div>
          <p className="font-mono text-sm sm:text-[0.9375rem] leading-relaxed text-foreground/85">
            measure twice, cut once, then learn that the craft is knowing when to
            take it apart and do it better. no program is ever finished, only
            refined.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-xs text-primary/80">
            <span className="select-none">#</span>
            <span>off_the_clock</span>
          </div>
          <p className="font-mono text-sm sm:text-[0.9375rem] leading-relaxed text-foreground/85">
            gym, cooking, basketball.
          </p>
        </div>

        <div className="space-y-2 pt-4">
          <div className="flex items-center gap-2 font-mono text-xs text-primary/80">
            <span className="select-none">#</span>
            <span>get_in_touch</span>
          </div>
          <p className="font-mono text-sm sm:text-[0.9375rem] leading-relaxed text-foreground/85">
            type '<span className="text-primary">contact</span>' to open my email, or '<span className="text-primary">help</span>' for all commands.
          </p>
        </div>

      </div>
    </>
  );
};

export default TerminalAbout;