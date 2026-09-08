import React, { useState, useEffect } from 'react';
import { siteConfig } from '../config/siteConfig';
import { ArrowUpRight, ChevronRight } from 'lucide-react';

export default function Hero() {
  const myths = siteConfig.heroMyths;
  const [currentMythIndex, setCurrentMythIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentMythIndex((prev) => (prev + 1) % myths.length);
        setFade(true);
      }, 350);
    }, 4500);

    return () => clearInterval(timer);
  }, [myths.length]);

  return (
    <section className="relative pt-20 pb-24 md:pt-28 md:pb-32 px-6 border-b border-hairline">
      <div className="max-w-ledger mx-auto">
        
        {/* Rotating Struck-Through Myth Opener */}
        <div className="mb-6 min-h-[44px] flex items-center">
          <div className="inline-flex items-center gap-3">
            <span className="text-xs font-mono font-medium tracking-widest text-brick uppercase px-2 py-0.5 bg-brick/10 border border-brick/30">
              VIRAL MYTH
            </span>
            <span
              className={`myth-strike text-lg md:text-2xl font-serif italic text-paper-dim transition-opacity duration-300 ${
                fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
              }`}
            >
              "{myths[currentMythIndex]}"
            </span>
          </div>
        </div>

        {/* Primary Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.08] text-paper max-w-4xl mb-8">
          Finance, explained <br className="hidden sm:inline" />
          without the fog.
        </h1>

        {/* Subhead */}
        <p className="text-lg sm:text-xl text-paper-dim max-w-2xl font-normal leading-relaxed mb-10">
          We dismantle viral money myths, promotional corporate spin, and misleading market headlines with raw filings, historical data, and zero noise.
        </p>

        {/* Dual CTAs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
          {/* Primary CTA */}
          <a
            href={siteConfig.links.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-mono font-medium tracking-wide uppercase bg-amber text-ink hover:bg-amber-hover transition-colors shadow-subtle text-center"
          >
            <span>Watch the latest</span>
            <ArrowUpRight size={18} />
          </a>

          {/* AI Assistant CTA */}
          <a
            href="#debunky"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-mono font-medium tracking-wide uppercase text-paper bg-transparent border border-green/40 hover:border-green hover:bg-green/10 transition-colors text-center"
          >
            <span>Use AI Assistant</span>
            <span className="text-green">✦</span>
          </a>
        </div>

        {/* Micro Credibility Bar */}
        <div className="mt-14 pt-8 border-t border-hairline/50 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs font-mono text-paper-dim">
          <div>
            <span className="block text-paper text-sm font-semibold mb-1">ZERO HYPE</span>
            <span>No paid sponsorships, no trading signals</span>
          </div>
          <div>
            <span className="block text-paper text-sm font-semibold mb-1">PRIMARY SOURCES</span>
            <span>Audited annual filings & exchange disclosures</span>
          </div>
          <div>
            <span className="block text-paper text-sm font-semibold mb-1">3-SECOND RULE</span>
            <span>Myth deconstructed before you swipe</span>
          </div>
          <div>
            <span className="block text-paper text-sm font-semibold mb-1">SCHEDULED</span>
            <span>Fresh corrections dropped weekly</span>
          </div>
        </div>

      </div>
    </section>
  );
}
