// src/components/Terminal.js

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Minus, Maximize2 } from 'lucide-react'; // Assuming you use lucide-react

// 1. Accept 'maxTerminalHeight' prop with a default value
const Terminal = ({ 
  children, 
  currentPage, 
  isClosed, 
  onSetIsClosed, 
  maxTerminalHeight = '500px' 
}) => {
  // State
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [terminalInput, setTerminalInput] = useState('');
  const [isTerminalMinimized, setIsTerminalMinimized] = useState(false);
  const [isTerminalFullscreen, setIsTerminalFullscreen] = useState(false);

  // Refs
  const terminalContentRef = useRef(null);
  const inputRef = useRef(null);

  // Hooks
  const navigate = useNavigate();

  // Auto-scroll to bottom when terminal history changes
  useEffect(() => {
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight;
    }
  }, [terminalHistory]);

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

  const handleFullscreen = () => {
    setIsTerminalFullscreen(!isTerminalFullscreen);
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
        text: 'Available commands: help, clear, projects, about, linkedin, contact, hello'
      }]);
    } else if (command === 'clear') {
      setTerminalHistory([]);
    } else if (command === 'projects') {
      if (currentPage === 'projects') {
        setTerminalHistory(prev => [...prev, { type: 'output', text: 'You are already on the projects page.' }]);
      } else {
        navigate('/projects');
      }
    } else if (command === 'about') {
      if (currentPage === 'about') {
        setTerminalHistory(prev => [...prev, { type: 'output', text: "You are already on the 'about' page." }]);
      } else {
        navigate('/about');
      }
    } else if (command === 'linkedin') {
      window.open('https://www.linkedin.com/in/stephen-dong/', '_blank');
      setTerminalHistory(prev => [...prev, { type: 'output', text: 'Opening LinkedIn...' }]);
    } else if (command === 'contact' || command === 'email') {
      window.location.href = 'mailto:realstephendong@gmail.com';
      setTerminalHistory(prev => [...prev, { type: 'output', text: 'Opening email client...' }]);
    } else if (command === 'hello' || command === 'hi') {
      setTerminalHistory(prev => [...prev, { type: 'output', text: 'Hello! Welcome to my portfolio 👋' }]);
    } else if (command !== '') {
      setTerminalHistory(prev => [...prev, { 
        type: 'output', 
        text: `Command not found: ${terminalInput}. Type 'help' for available commands.`
      }]);
    }
    
    setTerminalInput('');
  };

  if (isClosed) {
    return null; // Don't render anything if closed
  }

  return (
    <div className={`relative bg-black/80 border-2 border-primary/40 rounded-lg overflow-hidden shadow-2xl shadow-primary/20 transition-all duration-300 ${
      isTerminalMinimized ? 'h-12' : ''
    } ${
      isTerminalFullscreen ? 'max-w-3xl mx-auto' : ''
    }`}>
      {/* Terminal Title Bar */}
      <div className="bg-black/50 border-b-2 border-primary/30 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <button 
              onClick={handleClose}
              className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer relative group flex items-center justify-center"
              title="Close terminal"
            >
              <X className="w-2 h-2 text-red-900 opacity-0 group-hover:opacity-100 transition-opacity absolute" strokeWidth={3} />
            </button>
            <button 
              onClick={handleMinimize}
              className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer relative group flex items-center justify-center"
              title="Minimize terminal"
            >
              <Minus className="w-2 h-2 text-yellow-900 opacity-0 group-hover:opacity-100 transition-opacity absolute" strokeWidth={3} />
            </button>
            <button 
              onClick={handleFullscreen}
              className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors cursor-pointer relative group flex items-center justify-center"
              title="Toggle size"
            >
              <Maximize2 className="w-2 h-2 text-green-900 opacity-0 group-hover:opacity-100 transition-opacity absolute" strokeWidth={3} />
            </button>
          </div>
          <span className="text-xs text-foreground/60 font-mono">
            {`stephen@portfolio:~/${currentPage}`}
          </span>
        </div>
        <div className="text-xs text-foreground/40 font-mono hidden sm:block">bash</div>
      </div>
      
      {/* Terminal Content */}
      {!isTerminalMinimized && (
        <div 
          ref={terminalContentRef}
          // 2. Remove 'h-[500px]' and add the style attribute
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
                    <div className="text-foreground/70 pl-4">{entry.text}</div>
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
              className="flex-1 bg-transparent border-none outline-none text-foreground font-mono caret-primary"
              placeholder="Type 'help' for commands..."
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