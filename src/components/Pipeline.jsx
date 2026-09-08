import React from 'react';
import { siteConfig } from '../config/siteConfig';

export default function Pipeline() {
  return (
    <section id="pipeline" className="py-20 md:py-28 px-6 border-b border-hairline">
      <div className="max-w-ledger mx-auto">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-paper-dim block mb-2">
            RIGOROUS PRODUCTION
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-paper">
            Pipeline
          </h2>
        </div>

        {/* 4-Column Hairline Pipe Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-hairline bg-panel">
          {siteConfig.pipelineStages.map((stage) => (
            <div 
              key={stage.step}
              className="border-r border-b border-hairline p-7 sm:p-8 hover:bg-panel-secondary transition-colors"
            >
              <div className="font-mono text-xs text-amber mb-4">
                STAGE {stage.step}
              </div>
              <h3 className="font-serif text-2xl font-semibold text-paper mb-3">
                {stage.name}
              </h3>
              <p className="text-sm text-paper-dim font-sans leading-relaxed">
                {stage.caption}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
