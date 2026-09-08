import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { ArrowUpRight, Play, Eye, X } from 'lucide-react';

export default function ChannelsLedger() {
  const [activePreview, setActivePreview] = useState(null);

  return (
    <section id="channels" className="py-20 md:py-28 px-6 border-b border-hairline">
      <div className="max-w-ledger mx-auto">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-paper-dim block mb-2">
            DISTRIBUTION NETWORK
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-paper">
            Channels
          </h2>
        </div>

        {/* Channels Ledger Rows */}
        <div className="border-t border-hairline divide-y divide-hairline">
          {siteConfig.channels.map((channel) => {
            const channelUrl = siteConfig.links[channel.urlKey];
            const isExpanded = activePreview === channel.id;

            return (
              <div key={channel.id} className="group transition-colors">
                
                {/* Main Ledger Row */}
                <div className="py-6 sm:py-7 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-panel/40 px-2 sm:px-4 -mx-2 sm:-mx-4 transition-colors">
                  
                  {/* Left: Index & Platform Info */}
                  <div className="flex items-start md:items-center gap-5 sm:gap-8 flex-1">
                    <span className="font-mono text-xs sm:text-sm text-paper-muted shrink-0 pt-1 md:pt-0">
                      {channel.index}
                    </span>
                    
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-1">
                        <h3 className="font-serif text-xl sm:text-2xl font-semibold text-paper group-hover:text-amber transition-colors">
                          {channel.name}
                        </h3>
                        <span className="text-[11px] font-mono px-2 py-0.5 uppercase bg-panel-secondary text-paper-dim border border-hairline font-medium">
                          {channel.formatTag}
                        </span>
                      </div>
                      <p className="text-sm text-paper-dim font-sans leading-relaxed">
                        {channel.description}
                      </p>
                    </div>
                  </div>

                  {/* Right Actions: Embedded Preview + Direct "Go" Link */}
                  <div className="flex items-center gap-3 self-end md:self-auto shrink-0 pt-2 md:pt-0">
                    <button
                      type="button"
                      onClick={() => setActivePreview(isExpanded ? null : channel.id)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono uppercase text-paper-dim hover:text-paper bg-panel border border-hairline hover:border-paper-dim/40 transition-colors"
                    >
                      {isExpanded ? <X size={13} /> : <Eye size={13} />}
                      <span>{isExpanded ? "Close" : "Preview"}</span>
                    </button>

                    <a
                      href={channelUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono uppercase font-semibold text-ink bg-amber hover:bg-amber-hover transition-colors"
                    >
                      <span>Go</span>
                      <ArrowUpRight size={14} />
                    </a>
                  </div>

                </div>

                {/* Embedded Preview Drawer */}
                {isExpanded && (
                  <div className="p-6 my-4 bg-panel border border-hairline">
                    <div className="flex justify-between items-center mb-4 pb-3 border-b border-hairline">
                      <div className="text-xs font-mono uppercase text-amber">
                        {channel.name} Preview
                      </div>
                      <button
                        onClick={() => setActivePreview(null)}
                        className="text-paper-dim hover:text-paper"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    {/* YouTube Shorts Embed */}
                    {channel.id === 'yt' && (
                      <div className="flex flex-col md:flex-row gap-6 items-center">
                        <div className="w-full max-w-[280px] aspect-[9/16] bg-ink border border-hairline overflow-hidden relative">
                          <iframe
                            src={`https://www.youtube-nocookie.com/embed/${channel.embedVideoId}?rel=0&modestbranding=1`}
                            title="YouTube Shorts Preview"
                            className="w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                        <div className="flex-1 text-sm text-paper-dim space-y-3">
                          <p className="font-serif text-lg text-paper font-medium">
                            Live Vertical Format — Cold facts in 60 seconds
                          </p>
                          <p>
                            Every episode begins with the exact words of an unexamined money myth, cuts directly into audited corporate disclosures or long-term index charts, and concludes with an actionable rule.
                          </p>
                          <div className="pt-2">
                            <a
                              href={channelUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-xs font-mono text-amber hover:underline uppercase"
                            >
                              <span>Open YouTube Channel</span>
                              <ArrowUpRight size={14} />
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Instagram Preview */}
                    {channel.id === 'ig' && (
                      <div className="flex flex-col md:flex-row gap-6 items-center">
                        <div className="w-full max-w-[280px] aspect-[9/16] bg-ink border border-hairline overflow-hidden relative flex items-center justify-center p-4 text-center">
                          <iframe
                            src={`https://www.youtube-nocookie.com/embed/${channel.embedVideoId}?rel=0&modestbranding=1`}
                            title="Instagram Reel Video Mirror"
                            className="w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                        <div className="flex-1 text-sm text-paper-dim space-y-3">
                          <p className="font-serif text-lg text-paper font-medium">
                            Reels & Editorial Carousels
                          </p>
                          <p>
                            High-density 10-slide carousels detailing IPO balance sheets, corporate accounting sleights of hand, and mathematical realities behind viral trends.
                          </p>
                          <div className="pt-2">
                            <a
                              href={channelUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-xs font-mono text-amber hover:underline uppercase"
                            >
                              <span>Follow on Instagram</span>
                              <ArrowUpRight size={14} />
                            </a>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Telegram Text Drop Preview */}
                    {channel.id === 'tg' && (
                      <div className="max-w-2xl bg-ink p-5 border border-hairline">
                        <div className="text-xs font-mono text-paper-muted mb-2">TELEGRAM DISPATCH SAMPLE</div>
                        <pre className="font-mono text-xs sm:text-sm text-paper whitespace-pre-wrap leading-relaxed">
                          {channel.sampleText}
                        </pre>
                        <div className="mt-4 pt-3 border-t border-hairline/60 flex justify-between items-center">
                          <span className="text-[11px] font-mono text-paper-dim">Instant text drops · No algorithms</span>
                          <a
                            href={channelUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-mono text-amber hover:underline uppercase"
                          >
                            <span>Join Telegram Channel</span>
                            <ArrowUpRight size={13} />
                          </a>
                        </div>
                      </div>
                    )}

                    {/* LinkedIn Preview */}
                    {channel.id === 'li' && (
                      <div className="max-w-2xl bg-ink p-5 border border-hairline">
                        <div className="text-xs font-mono text-paper-muted mb-2">LINKEDIN ESSAY SAMPLE</div>
                        <p className="font-serif text-base text-paper mb-2">
                          {channel.samplePost}
                        </p>
                        <p className="text-sm text-paper-dim leading-relaxed">
                          Comprehensive essays written for serious market participants, founders, and engineers seeking deeper empirical frameworks.
                        </p>
                        <div className="mt-4 pt-3 border-t border-hairline/60">
                          <a
                            href={channelUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-mono text-amber hover:underline uppercase"
                          >
                            <span>Connect on LinkedIn</span>
                            <ArrowUpRight size={13} />
                          </a>
                        </div>
                      </div>
                    )}

                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
