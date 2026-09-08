import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { Menu, X, ExternalLink, ArrowUpRight } from 'lucide-react';

export default function Nav({ activeTab, setActiveTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Channels", href: "#channels", id: "channels" },
    { label: "Latest", href: "#latest", id: "latest" },
    { label: "Store", href: "#products", id: "products" },
    { label: "Ask Creator", href: "#creator", id: "creator" },
    { label: "Pipeline", href: "#pipeline", id: "pipeline" },
    { label: "About", href: "#about", id: "about" },
  ];

  const handleNavClick = (id) => {
    if (setActiveTab) setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-ink/95 backdrop-blur-md border-b border-hairline">
      <div className="max-w-ledger mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Left: Wordmark */}
        <a href="#" className="flex items-center gap-3 group focus:outline-none">
          <img 
            src="/channel_logo.png" 
            alt="Market Debunk emblem" 
            className="w-9 h-9 object-contain rounded-full border border-green group-hover:shadow-[0_0_12px_rgba(0,229,153,0.4)] transition-all"
          />
          <span className="font-serif text-2xl font-semibold tracking-tight text-paper">
            Market <span className="text-green">Debunk</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => handleNavClick(link.id)}
              className="text-paper-dim hover:text-paper transition-colors py-1 relative focus:text-paper"
            >
              {link.label}
              {activeTab === link.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber" />
              )}
            </a>
          ))}
          
          <a
            href={siteConfig.links.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-medium tracking-wider uppercase text-ink bg-amber hover:bg-amber-hover transition-colors rounded-none"
          >
            <span>Watch Main</span>
            <ArrowUpRight size={14} />
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-paper-dim hover:text-paper focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-panel border-b border-hairline px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-3 text-base">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => handleNavClick(link.id)}
                className="text-paper-dim hover:text-paper py-1 border-b border-hairline/40 flex justify-between items-center"
              >
                <span>{link.label}</span>
                <span className="text-xs font-mono text-paper-muted">0{navLinks.indexOf(link) + 1}</span>
              </a>
            ))}
          </div>
          <div className="pt-2">
            <a
              href={siteConfig.links.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3 text-sm font-mono uppercase bg-amber text-ink font-semibold"
            >
              <span>Watch on YouTube Shorts</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
