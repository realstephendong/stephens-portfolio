import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Minus, Maximize2 } from 'lucide-react'; // Assuming you use lucide-react

// 1. Accepts 'shrinkSizeClass' prop with a default value
const Terminal = ({ 
  children, 
  currentPage, 
  isClosed, 
  onSetIsClosed, 
  maxTerminalHeight = '500px',
  shrinkSizeClass = 'max-w-3xl mx-auto' 
}) => {
  // State
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [terminalInput, setTerminalInput] = useState('');
  const [isTerminalMinimized, setIsTerminalMinimized] = useState(false);
  
  // 2. State is renamed to 'isShrunk'
  const [isShrunk, setIsShrunk] = useState(false);

  // Refs
  const terminalContentRef = useRef(null);
  const inputRef = useRef(null);

  // Hooks
  const navigate = useNavigate();

  // auto-scroll to bottom when terminal history changes
  useEffect(() => {
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  // auto-scroll to top when page changes
  useEffect(() => {
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop = 0;
    }
  }, [currentPage]);

  // Focus input when clicking anywhere on the terminal
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  // Handle window controls
  const handleClose = () => {
    onSetIsClosed(true); 
  };

  const handleMinimize = () => {
    setIsTerminalMinimized(!isTerminalMinimized);
  };

  // 3. Handler is renamed and updates 'isShrunk' state
  const handleToggleSize = () => {
    setIsShrunk(!isShrunk);
  };

  // Helper function for scrolling to sections
  const scrollToSection = (sectionId) => {
    const navbar = document.querySelector('header');
    const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 80;

    const element = document.getElementById(sectionId);
    if (element) {
      const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
      const scrollToPosition = elementTop - navbarHeight - 20;

      window.scrollTo({
        top: scrollToPosition,
        behavior: 'smooth'
      });
    }
  };

  // Handle terminal commands
  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const command = terminalInput.trim().toLowerCase();

    // Add command to history
    setTerminalHistory(prev => [...prev, { type: 'command', text: terminalInput }]);

    // Process commands
    if (command === 'help') {
      setTerminalHistory(prev => [...prev, {
        type: 'output',
        text: 'available commands: help, clear, projects, experience, about, linkedin, github, contact, hello'
      }]);
    } else if (command === 'clear') {
      setTerminalHistory([]);
    } else if (command === 'projects' || command === 'experience') {
      const sectionId = command === 'projects' ? 'projects' : 'experience';
      const message = `navigating to ${command}...`;

      if (currentPage === 'home') {
        scrollToSection(sectionId);
        setTerminalHistory(prev => [...prev, { type: 'output', text: message }]);
      } else {
        navigate('/');
        setTerminalHistory(prev => [...prev, { type: 'output', text: 'navigating to home...' }]);
        setTimeout(() => scrollToSection(sectionId), 100);
      }
    } else if (command === 'about') {
      if (currentPage === 'about') {
        setTerminalHistory(prev => [...prev, { type: 'output', text: "you are already on the 'about' page." }]);
      } else {
        navigate('/about');
      }
    } else if (command === 'linkedin') {
      window.open('https://www.linkedin.com/in/stephen-dong/', '_blank');
      setTerminalHistory(prev => [...prev, { type: 'output', text: 'opening linkedin...' }]);
    } else if (command === 'github') {
      window.open('https://github.com/realstephendong', '_blank');
      setTerminalHistory(prev => [...prev, { type: 'output', text: 'opening github...' }]);
    } else if (command === 'contact' || command === 'email') {
      window.location.href = 'mailto:realstephendong@gmail.com';
      setTerminalHistory(prev => [...prev, { type: 'output', text: 'opening email client...' }]);
    } else if (command === 'hello' || command === 'hi') {
      setTerminalHistory(prev => [...prev, { type: 'output', text: 'hello! welcome to my portfolio 👋' }]);
    } else if (command !== '') {
      setTerminalHistory(prev => [...prev, { 
        type: 'output', 
        text: `command not found: ${terminalInput}. type 'help' for available commands.`
      }]);  
    }
    setTerminalInput('');
  };

  if (isClosed) {
    return null; // Don't render anything if closed
  }

  return (
    <div className={`relative overflow-hidden rounded-md border border-foreground/12 bg-foreground/[0.02] transition-all duration-300 ${
      isTerminalMinimized ? 'h-12' : ''
    } ${
      isShrunk ? shrinkSizeClass : ''
    }`}>
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-foreground/10 px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <button 
              onClick={handleClose}
              className="group relative flex h-2.5 w-2.5 cursor-pointer items-center justify-center rounded-full bg-foreground/25 transition-colors hover:bg-red-500"
              title="close terminal"
            >
              <X className="absolute h-1.5 w-1.5 text-background opacity-0 transition-opacity group-hover:opacity-100" strokeWidth={4} />
            </button>
            <button 
              onClick={handleMinimize}
              className="group relative flex h-2.5 w-2.5 cursor-pointer items-center justify-center rounded-full bg-foreground/25 transition-colors hover:bg-yellow-500"
              title="minimize terminal"
            >
              <Minus className="absolute h-1.5 w-1.5 text-background opacity-0 transition-opacity group-hover:opacity-100" strokeWidth={4} />
            </button>
            {/* 5. Button's onClick is updated to 'handleToggleSize' */}
            <button 
              onClick={handleToggleSize}
              className="group relative flex h-2.5 w-2.5 cursor-pointer items-center justify-center rounded-full bg-foreground/25 transition-colors hover:bg-primary"
              title="toggle size"
            >
              <Maximize2 className="absolute h-1.5 w-1.5 text-background opacity-0 transition-opacity group-hover:opacity-100" strokeWidth={4} />
            </button>
          </div>
          <span className="font-mono text-xs text-muted-foreground">
            {`stephen@portfolio:~/${currentPage}`}
          </span>
        </div>
        <div className="hidden font-mono text-xs text-muted-foreground/60 sm:block">bash</div>
      </div>
      
      {/* Terminal Content */}
      {!isTerminalMinimized && (
        <div 
          ref={terminalContentRef}
          className="overflow-y-auto p-6 sm:p-10 font-mono scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent" 
          style={{ maxHeight: maxTerminalHeight }}
          onClick={handleTerminalClick}
        >
          {/* Static content passed from parent */}
          {children}

          {/* Command History */}
          {terminalHistory.length > 0 && (
            <div className="mb-4 space-y-2">
              {terminalHistory.map((entry, index) => (
                <div key={index} className="text-sm sm:text-base">
                  {entry.type === 'command' ? (
                    <div className="flex items-start gap-2 text-primary">
                      <span className="text-primary/80 select-none">$</span>
                      <span>{entry.text}</span>
                    </div>
                  ) : (
                    <div className="pl-4 text-foreground/80">{entry.text}</div>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {/* Interactive Input Line */}
          <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 text-primary text-sm sm:text-base mt-4">
            <span className="text-primary/80 select-none">$</span>
            <input
              ref={inputRef}
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              className="flex-1 border-none bg-transparent font-mono text-foreground caret-primary outline-none placeholder:text-muted-foreground/60"
              placeholder="type 'help' for commands..."
              autoComplete="off"
              spellCheck="false"
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default Terminal;