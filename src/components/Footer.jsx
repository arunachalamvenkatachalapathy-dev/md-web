import React from 'react';
import { siteConfig } from '../config/siteConfig';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="about" className="bg-ink pt-20 pb-12 px-6">
      <div className="max-w-ledger mx-auto">
        
        {/* Channel Manifesto Section */}
        <div className="mb-16 pb-16 border-b border-hairline">
          <div className="max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-widest text-paper-dim block mb-4">
              CHANNEL EDITORIAL MANIFESTO
            </span>
            <p className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-paper font-normal leading-snug mb-8">
              "{siteConfig.bio}"
            </p>
            
            {/* Byline with verified official channel links */}
            <div className="flex flex-wrap items-center gap-6 text-sm font-mono text-paper-dim">
              <span>Market Debunk Forensic Media</span>
              
              <a 
                href={siteConfig.links.youtube} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-paper hover:text-green transition-colors border-b border-hairline hover:border-green pb-0.5"
              >
                <span>YouTube</span>
                <ArrowUpRight size={14} />
              </a>

              <a 
                href={siteConfig.links.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-paper hover:text-green transition-colors border-b border-hairline hover:border-green pb-0.5"
              >
                <span>Instagram</span>
                <ArrowUpRight size={14} />
              </a>

              <a 
                href={siteConfig.links.telegram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-paper hover:text-green transition-colors border-b border-hairline hover:border-green pb-0.5"
              >
                <span>Telegram</span>
                <ArrowUpRight size={14} />
              </a>

              <a 
                href={siteConfig.links.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-paper hover:text-green transition-colors border-b border-hairline hover:border-green pb-0.5"
              >
                <span>LinkedIn</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Navigation & Links */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-12 border-b border-hairline/60">
          <div className="flex items-center gap-3">
            <img 
              src="/channel_logo.png" 
              alt="Market Debunk logo" 
              className="w-7 h-7 object-contain opacity-90 rounded-full border border-green"
            />
            <span className="font-serif text-lg font-semibold text-paper">
              Market <span className="text-green">Debunk</span>
            </span>
          </div>

          <nav className="flex flex-wrap gap-6 sm:gap-8 text-xs font-mono uppercase tracking-wider text-paper-dim">
            <a href="#channels" className="hover:text-paper transition-colors">Channels</a>
            <a href="#latest" className="hover:text-paper transition-colors">Latest Upload</a>
            <a href="#products" className="hover:text-paper transition-colors">Store</a>
            <a href="#creator" className="hover:text-paper transition-colors">Ask Creator</a>
            <a href="#pipeline" className="hover:text-paper transition-colors">Pipeline</a>
            <a href="#about" className="hover:text-paper transition-colors">About</a>
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-paper-muted">
          <div>
            &copy; {new Date().getFullYear()} Market Debunk. All rights reserved.
          </div>
          <div>
            {siteConfig.footerNotice}
          </div>
        </div>

      </div>
    </footer>
  );
}
