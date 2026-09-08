import React from 'react';
import { siteConfig } from '../config/siteConfig';

export default function Ticker() {
  const items = siteConfig.tickerEntries;

  return (
    <section 
      aria-label="Debunk ticker marquee"
      className="relative overflow-hidden bg-panel border-b border-hairline py-3.5 select-none"
    >
      <div className="flex animate-marquee whitespace-nowrap" aria-hidden="true">
        {/* Render twice for seamless continuous infinite loop */}
        {[...items, ...items].map((entry, idx) => (
          <div 
            key={idx} 
            className="flex items-center text-xs sm:text-sm font-mono tracking-widest text-paper-dim px-6"
          >
            <span>{entry}</span>
            <span className="ml-6 text-hairline-accent">/</span>
          </div>
        ))}
      </div>
    </section>
  );
}
