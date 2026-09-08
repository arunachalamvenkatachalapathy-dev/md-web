import React, { useState, useMemo } from 'react';

// Verified Channel Social Platforms including user's official Tamil & English channels
const SOCIAL_LINKS = [
  {
    id: 'yt-tamil',
    name: 'YouTube (Tamil)',
    handle: '@MarketDebunkTamil',
    tag: 'Official Tamil Analysis',
    url: 'https://www.youtube.com/@MarketDebunkTamil',
    color: '#DC2626',
    bg: 'rgba(220, 38, 38, 0.08)',
    border: 'rgba(220, 38, 38, 0.25)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor"></polygon>
      </svg>
    )
  },
  {
    id: 'yt-english',
    name: 'YouTube (English)',
    handle: '@MarketDebunk',
    tag: 'Global Market Analysis',
    url: 'https://www.youtube.com/@MarketDebunk',
    color: '#DC2626',
    bg: 'rgba(220, 38, 38, 0.08)',
    border: 'rgba(220, 38, 38, 0.25)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor"></polygon>
      </svg>
    )
  },
  {
    id: 'tg-tamil',
    name: 'Telegram (Tamil)',
    handle: '@marketdebunk_tamil',
    tag: 'Emergency Market Drops',
    url: 'https://t.me/marketdebunk_tamil',
    color: '#0284C7',
    bg: 'rgba(2, 132, 199, 0.08)',
    border: 'rgba(2, 132, 199, 0.25)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
      </svg>
    )
  },
  {
    id: 'tg-main',
    name: 'Telegram (Global)',
    handle: '@MarketDebunk',
    tag: 'Forensic Intelligence',
    url: 'https://t.me/MarketDebunk',
    color: '#0284C7',
    bg: 'rgba(2, 132, 199, 0.08)',
    border: 'rgba(2, 132, 199, 0.25)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    )
  },
  {
    id: 'ig-tamil',
    name: 'Instagram (Tamil)',
    handle: '@marketdebunk_tamil',
    tag: 'Tamil Reels & Breakdown',
    url: 'https://www.instagram.com/marketdebunk_tamil',
    color: '#E1306C',
    bg: 'rgba(225, 48, 108, 0.08)',
    border: 'rgba(225, 48, 108, 0.25)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    )
  },
  {
    id: 'ig-main',
    name: 'Instagram (Global)',
    handle: '@marketdebunk',
    tag: 'Carousels & Shorts',
    url: 'https://www.instagram.com/marketdebunk',
    color: '#E1306C',
    bg: 'rgba(225, 48, 108, 0.08)',
    border: 'rgba(225, 48, 108, 0.25)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    )
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: 'Market Debunk',
    tag: 'Official Company Page',
    url: 'https://www.linkedin.com/company/143659978/',
    color: '#0A66C2',
    bg: 'rgba(10, 102, 194, 0.08)',
    border: 'rgba(10, 102, 194, 0.25)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    )
  },
  {
    id: 'facebook',
    name: 'Facebook',
    handle: 'Market Debunk',
    tag: 'Community Hub',
    url: 'https://facebook.com/marketdebunk',
    color: '#1877F2',
    bg: 'rgba(24, 119, 242, 0.08)',
    border: 'rgba(24, 119, 242, 0.25)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
      </svg>
    )
  }
];

// Market Debunk Official Video Investigations — 100% Branded (Zero third-party stranger photos)
const CHANNEL_VIDEOS = [
  {
    id: 'md-tatamotors',
    title: "Tata Motors & EV Transition: Real Debt vs Market Hype",
    category: 'audits',
    categoryLabel: 'FORENSIC AUDIT',
    duration: '0:58',
    date: 'Uploaded Recently',
    views: 'Market Debunk Tamil',
    summary: 'Detailed deconstruction of consolidated Jaguar Land Rover debt vs domestic commercial vehicle cashflow. Auditing promoter guidance against quarterly statutory disclosures.',
    citation: 'Consolidated Cash Flow Statement vs Net Automotive Debt',
    gradient: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #064E3B 100%)',
    metrics: { promised: "Free Cash Boom", actual: "Capex Dilution", risk: "MEDIUM RISK (52%)" }
  },
  {
    id: 'md-buydip',
    title: "Why 'Buy The Dip' Destroys Retail Portfolios on Legacy Stocks",
    category: 'debunk',
    categoryLabel: 'MYTH DEBUNK',
    duration: '0:54',
    date: 'Uploaded Recently',
    views: 'Market Debunk Tamil',
    summary: 'Averaging down on zombie companies whose operating cashflow turned negative turns a temporary drawdown into permanent balance sheet ruin.',
    citation: 'Historical 10-K Cash Flow Drawdown Analysis',
    gradient: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #064E3B 100%)',
    metrics: { promised: "Guaranteed Recovery", actual: "-41% Avg 2-Yr Return", risk: "CRITICAL RISK (86%)" }
  },
  {
    id: 'md-algobots',
    title: "90% Win-Rate Algo Trading Bots: The SEBI Reality Check",
    category: 'scams',
    categoryLabel: 'SCAM EXPOSURE',
    duration: '1:00',
    date: 'Uploaded Recently',
    views: 'Market Debunk Tamil',
    summary: 'Collecting tiny pennies while bearing unbounded left-tail gap risk. SEBI study reveals 93% of retail derivative traders lose their entire capital.',
    citation: 'SEBI Official Retail Derivatives Study Report',
    gradient: 'linear-gradient(135deg, #0F172A 0%, #31101E 50%, #064E3B 100%)',
    metrics: { promised: "1.5% Daily Win", actual: "93% Loss Rate", risk: "FATAL PROBABILITY (97%)" }
  },
  {
    id: 'md-reits',
    title: "The '12% Safe Dividend' Trap: Return of Capital Exposed",
    category: 'audits',
    categoryLabel: 'FORENSIC AUDIT',
    duration: '0:52',
    date: 'Uploaded Recently',
    views: 'Market Debunk Tamil',
    summary: 'Over 65% of headline payout is structured as Return of Capital (ROC). Your own principal is paid back to you while your asset value degrades.',
    citation: 'Quarterly Distribution Statement, Section 4.2',
    gradient: 'linear-gradient(135deg, #0F172A 0%, #064E3B 60%, #022C22 100%)',
    metrics: { promised: "12% Safe Income", actual: "2.4% Net Return", risk: "HIGH TRAP (78%)" }
  },
  {
    id: 'md-preipo',
    title: "Pre-IPO 100x Growth Stories: Promoters Dumping via OFS",
    category: 'audits',
    categoryLabel: 'BALANCE SHEET AUDIT',
    duration: '0:59',
    date: 'Uploaded Recently',
    views: 'Market Debunk Tamil',
    summary: 'When promoters exit >80% through Offer For Sale (OFS), retail buyers become exit liquidity at peak unlisted valuations before disclosure.',
    citation: 'DRHP Red Herring Prospectus: OFS Component',
    gradient: 'linear-gradient(135deg, #0F172A 0%, #1E293B 60%, #064E3B 100%)',
    metrics: { promised: "100x Growth", actual: "-58% Post-Listing", risk: "SEVERE LOCKUP (91%)" }
  },
  {
    id: 'md-brokerage',
    title: "0% Brokerage Illusion: Payment for Order Flow & Slippage",
    category: 'debunk',
    categoryLabel: 'DISCLOSURE AUDIT',
    duration: '0:48',
    date: 'Uploaded Recently',
    views: 'Market Debunk Tamil',
    summary: 'Free trading is paid for by wider spread slippage and high-frequency internalizer flow rebates that cost 10x more than standard brokerage.',
    citation: 'Exchange Order Routing & Execution Disclosures',
    gradient: 'linear-gradient(135deg, #022C22 0%, #0F172A 60%, #1E293B 100%)',
    metrics: { promised: "Free Trades", actual: "Hidden Slippage", risk: "DECEPTIVE (82%)" }
  }
];

export default function ChannelVideoHub() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);

  const filteredVideos = useMemo(() => {
    return CHANNEL_VIDEOS.filter((v) => {
      const matchesCategory = activeCategory === 'all' || v.category === activeCategory;
      const matchesSearch = searchQuery.trim() === '' || 
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        v.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="react-channel-hub-container">
      
      {/* =========================================================================
          1. NARROW TOP SOCIAL LINK BAR (TAMIL & OFFICIAL CHANNELS)
          ========================================================================= */}
      <div className="narrow-social-strip">
        <div className="narrow-social-header">
          <span className="narrow-social-title">
            <span className="atlas-pulse-dot"></span>
            <span>OFFICIAL BROADCAST & COMMUNITY CHANNELS</span>
          </span>
          <span className="narrow-social-sub">Daily market mythbusting & empirical dispatches</span>
        </div>

        <div className="narrow-social-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))' }}>
          {SOCIAL_LINKS.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="narrow-social-card"
              style={{ '--accent-color': item.color, '--accent-bg': item.bg, '--accent-border': item.border }}
            >
              <div className="narrow-social-icon-box">
                {item.icon}
              </div>
              <div className="narrow-social-meta">
                <div className="narrow-social-name-row">
                  <span className="narrow-social-name">{item.name}</span>
                  <span className="narrow-social-arrow">↗</span>
                </div>
                <span className="narrow-social-tag">{item.tag}</span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* =========================================================================
          2. MAIN ROUNDED SEGMENT: MARKET DEBUNK OFFICIAL VIDEO ARCHIVE
          ========================================================================= */}
      <div className="channel-video-hub-box">
        
        {/* Hub Header & Direct Channel CTA */}
        <div className="video-hub-top-bar">
          <div>
            <div className="atlas-badge-pill">
              <span className="sparkle">✦</span>
              <span>OFFICIAL FORENSIC ARCHIVE // MARKET DEBUNK TAMIL</span>
            </div>
            <h2 className="atlas-h2" style={{ marginBottom: '8px' }}>
              Live Channel Video Archive
            </h2>
            <p className="atlas-lead" style={{ maxWidth: '640px', fontSize: '0.96rem' }}>
              Every viral stock tip, predatory financial product, and influencer claim deconstructed in under 60 seconds using audited balance sheets, cashflow statements, and statutory filings.
            </p>
          </div>

          <div className="video-sync-controls">
            <a
              href="https://www.youtube.com/@MarketDebunkTamil"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill btn-pill-black"
              style={{ padding: '10px 20px', fontSize: '0.82rem' }}
            >
              <span>Watch on @MarketDebunkTamil</span>
              <span>↗</span>
            </a>
          </div>
        </div>

        {/* Category Filters & Real-time Search Filter */}
        <div className="video-filter-bar">
          <div className="video-category-pills">
            <button
              type="button"
              className={`video-filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All Investigations ({CHANNEL_VIDEOS.length})
            </button>
            <button
              type="button"
              className={`video-filter-btn ${activeCategory === 'audits' ? 'active' : ''}`}
              onClick={() => setActiveCategory('audits')}
            >
              Balance Sheet Audits
            </button>
            <button
              type="button"
              className={`video-filter-btn ${activeCategory === 'debunk' ? 'active' : ''}`}
              onClick={() => setActiveCategory('debunk')}
            >
              Myth Debunks
            </button>
            <button
              type="button"
              className={`video-filter-btn ${activeCategory === 'scams' ? 'active' : ''}`}
              onClick={() => setActiveCategory('scams')}
            >
              Scam Exposures
            </button>
          </div>

          <div className="video-search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="video-search-input"
              placeholder="Search by topic (e.g. Tata Motors, Dividend, SEBI, REITs)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                type="button" 
                className="search-clear-btn" 
                onClick={() => setSearchQuery('')}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Authentic Market Debunk Branded Video Cards */}
        <div className="video-cards-grid">
          {filteredVideos.map((video) => (
            <div key={video.id} className="channel-video-card">
              
              {/* Branded Forensic Thumbnail */}
              <div 
                className="video-thumb-container"
                style={{ background: video.gradient }}
                onClick={() => setSelectedVideo(video)}
              >
                {/* Visual Telemetry Grid Background */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  opacity: 0.15,
                  backgroundImage: 'radial-gradient(circle at 1px 1px, #00E599 1px, transparent 0)',
                  backgroundSize: '16px 16px'
                }}></div>

                {/* Branded Official Logo & Channel Badge */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '14px',
                  padding: '20px'
                }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: '#000000',
                    border: '1px solid rgba(0, 229, 153, 0.4)',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
                    flexShrink: 0
                  }}>
                    <img src="assets/img/channel_logo.png" alt="Market Debunk Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--green)', fontWeight: 800, letterSpacing: '0.08em', display: 'block' }}>
                      MARKET DEBUNK // FORENSICS
                    </span>
                    <span style={{ fontSize: '0.95rem', color: '#FFFFFF', fontWeight: 800, letterSpacing: '-0.02em', display: 'block', lineHeight: 1.25 }}>
                      {video.title.slice(0, 42)}...
                    </span>
                  </div>
                </div>
                
                {/* Floating Badges */}
                <div className="video-thumb-badges">
                  <span className="video-category-tag">{video.categoryLabel}</span>
                  <span className="video-duration-pill">{video.duration}</span>
                </div>

                {/* Center Play Button Overlay */}
                <div className="video-play-overlay">
                  <div className="video-play-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="6 4 20 12 6 20 6 4"></polygon>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Video Content & Metadata */}
              <div className="video-card-body">
                <div className="video-card-meta">
                  <span style={{ color: 'var(--green-dark)', fontWeight: 700 }}>● @MarketDebunkTamil</span>
                  <span>•</span>
                  <span>{video.date}</span>
                </div>

                <h3 className="video-card-title">
                  {video.title}
                </h3>

                <p className="video-card-summary">
                  {video.summary}
                </p>

                <div className="video-card-citation">
                  <span className="citation-label">AUDIT:</span>
                  <span className="citation-text">{video.citation}</span>
                </div>

                {/* Card Actions */}
                <div className="video-card-actions">
                  <button
                    type="button"
                    onClick={() => setSelectedVideo(video)}
                    className="btn-pill btn-pill-ghost"
                    style={{ flex: 1, padding: '9px 14px', fontSize: '0.78rem' }}
                  >
                    <span>Audit Breakdown</span>
                    <span>→</span>
                  </button>

                  <a
                    href="https://www.youtube.com/@MarketDebunkTamil"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-pill btn-pill-black"
                    style={{ padding: '9px 16px', fontSize: '0.78rem' }}
                    title="Watch on official Market Debunk Tamil channel"
                  >
                    <span>Watch</span>
                    <span>↗</span>
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

        {filteredVideos.length === 0 && (
          <div className="video-empty-state">
            <p>No investigations matched "{searchQuery}".</p>
            <button 
              type="button" 
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }} 
              className="btn-pill btn-pill-ghost"
              style={{ marginTop: '12px' }}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Footer Subtext Bar */}
        <div className="video-hub-footer">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="atlas-pulse-dot"></span>
            <span style={{ fontWeight: 700, color: 'var(--ink-primary)' }}>
              100% Sponsor-Free Empirical Forensics:
            </span>
            <span>No guru courses, no paid promotions, zero brokerage kickbacks.</span>
          </div>
          <a 
            href="https://www.youtube.com/@MarketDebunkTamil?sub_confirmation=1" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-pill btn-pill-green"
            style={{ fontSize: '0.78rem', padding: '8px 18px' }}
          >
            <span>Subscribe on @MarketDebunkTamil</span>
            <span>↗</span>
          </a>
        </div>

      </div>

      {/* =========================================================================
          3. INTERACTIVE FORENSIC AUDIT MODAL
          ========================================================================= */}
      {selectedVideo && (
        <div className="video-modal-backdrop" onClick={() => setSelectedVideo(null)}>
          <div className="video-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="video-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="atlas-pulse-dot"></span>
                <span className="video-modal-tag">{selectedVideo.categoryLabel}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--ink-muted)' }}>
                  MARKET DEBUNK TAMIL AUDIT DESK
                </span>
              </div>
              <button 
                type="button" 
                className="video-modal-close" 
                onClick={() => setSelectedVideo(null)}
                title="Close Breakdown"
              >
                ✕
              </button>
            </div>

            <div className="video-modal-body">
              <h3 className="video-modal-title">{selectedVideo.title}</h3>
              
              {/* Metric Breakdown Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', margin: '20px 0' }}>
                <div style={{ background: 'var(--green-light)', border: '1px solid rgba(0,229,153,0.3)', borderRadius: '14px', padding: '14px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--green-dark)', fontWeight: 700 }}>VIRAL PITCH / PROMISE</span>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--green-dark)', marginTop: '4px' }}>
                    {selectedVideo.metrics.promised}
                  </div>
                </div>

                <div style={{ background: '#FEF2F2', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '14px', padding: '14px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#DC2626', fontWeight: 700 }}>AUDITED REALITY</span>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#DC2626', marginTop: '4px' }}>
                    {selectedVideo.metrics.actual}
                  </div>
                </div>

                <div style={{ background: '#F8FAFC', border: '1px solid var(--border-light)', borderRadius: '14px', padding: '14px' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--ink-muted)', fontWeight: 700 }}>RISK CLASSIFICATION</span>
                  <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--ink-primary)', marginTop: '4px' }}>
                    {selectedVideo.metrics.risk}
                  </div>
                </div>
              </div>

              <p className="video-modal-desc">{selectedVideo.summary}</p>
              
              <div className="video-modal-meta-row">
                <div className="video-modal-citation">
                  <strong>STATUTORY FILING CITATION:</strong> {selectedVideo.citation}
                </div>
                <a
                  href="https://www.youtube.com/@MarketDebunkTamil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill btn-pill-black"
                  style={{ padding: '10px 22px', fontSize: '0.82rem', flexShrink: 0 }}
                >
                  <span>Watch on YouTube @MarketDebunkTamil</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
