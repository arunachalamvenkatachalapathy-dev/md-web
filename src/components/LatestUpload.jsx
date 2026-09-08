import React from 'react';
import { useDriveUpload } from '../hooks/useDriveUpload';
import { Play, ArrowUpRight, RefreshCw, AlertCircle, CheckCircle2, Clock } from 'lucide-react';

export default function LatestUpload() {
  const { upload, lastSynced, status, statusMessage, isStale, refresh } = useDriveUpload();

  const formattedDate = upload?.createdTime 
    ? new Date(upload.createdTime).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    : 'Recent';

  const formattedTime = lastSynced
    ? lastSynced.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    : '--:--';

  return (
    <section id="latest" className="py-20 md:py-24 px-6 border-b border-hairline bg-panel/30">
      <div className="max-w-ledger mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-amber rounded-full animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-amber">
                AUTOMATED DRIVE FEED
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-paper">
              Latest Upload
            </h2>
          </div>

          {/* Sync status badge & refresh */}
          <div className="flex items-center gap-3 text-xs font-mono text-paper-dim">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-panel border border-hairline">
              {status === 'live' && <CheckCircle2 size={13} className="text-emerald-400" />}
              {status === 'reconnecting' && <Clock size={13} className="text-amber" />}
              {status === 'standby' && <AlertCircle size={13} className="text-amber" />}
              <span className="capitalize">{statusMessage}</span>
              {isStale && <span className="text-brick font-bold ml-1">(Stale)</span>}
            </div>

            <button
              onClick={refresh}
              title="Poll Drive folder now"
              className="p-1.5 bg-panel hover:bg-panel-secondary text-paper-dim hover:text-paper border border-hairline transition-colors"
            >
              <RefreshCw size={13} />
            </button>
          </div>
        </div>

        {/* Ledger Row: Highlighted Latest Upload */}
        {upload ? (
          <div className="border border-hairline bg-panel hover:border-amber/40 transition-colors p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              
              {/* Media Thumbnail or Indicator */}
              <div className="relative w-full md:w-56 h-36 bg-ink flex items-center justify-center border border-hairline overflow-hidden shrink-0 group">
                {upload.thumbnailLink ? (
                  <img 
                    src={upload.thumbnailLink} 
                    alt={upload.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="text-center p-4">
                    <img 
                      src="/logo.png" 
                      alt="Market Debunk logo" 
                      className="w-12 h-12 object-contain mx-auto mb-2 opacity-80" 
                    />
                    <span className="text-[11px] font-mono text-paper-dim uppercase">
                      Vertical Short
                    </span>
                  </div>
                )}
                
                {/* Play badge overlay */}
                <div className="absolute inset-0 bg-ink/40 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 rounded-full bg-amber text-ink flex items-center justify-center">
                    <Play size={18} className="fill-ink ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Upload Details */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-2.5">
                  <span className="text-xs font-mono px-2 py-0.5 bg-panel-secondary text-amber border border-amber/30 uppercase font-semibold">
                    {upload.formatTag}
                  </span>
                  <span className="text-xs font-mono text-paper-dim">
                    Uploaded {formattedDate}
                  </span>
                  {upload.isMock && (
                    <span className="text-[11px] font-mono text-brick/90 bg-brick/10 px-1.5 py-0.5 border border-brick/30">
                      PREVIEW SAMPLE
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-paper mb-2 truncate md:whitespace-normal">
                  {upload.name}
                </h3>
                
                <p className="text-sm text-paper-dim line-clamp-2 max-w-2xl font-sans">
                  The latest short-form correction produced and synced from the production drive folder.
                </p>

                <div className="mt-4 text-xs font-mono text-paper-muted">
                  Last synced: {formattedTime} {isStale ? "· (Cached >1h)" : ""}
                </div>
              </div>

              {/* Action Link */}
              <div className="shrink-0 w-full md:w-auto pt-2 md:pt-0">
                <a
                  href={upload.webViewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-mono uppercase bg-amber text-ink font-semibold hover:bg-amber-hover transition-colors text-center"
                >
                  <span>Open Video</span>
                  <ArrowUpRight size={16} />
                </a>
              </div>

            </div>
          </div>
        ) : (
          <div className="border border-hairline bg-panel p-10 text-center text-paper-dim font-mono text-sm">
            {statusMessage || "Latest upload unavailable right now."}
          </div>
        )}

      </div>
    </section>
  );
}
