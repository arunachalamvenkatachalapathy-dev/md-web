import React, { useState } from 'react';
import { siteConfig } from '../config/siteConfig';
import { Send, Check, Copy, MessageSquare, ExternalLink, HelpCircle } from 'lucide-react';

export default function MessageCreator() {
  const [category, setCategory] = useState('Stocks & IPOs');
  const [claim, setClaim] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    'Stocks & IPOs',
    'Gold & Metals',
    'Real Estate & REITs',
    'Dividends & Passive Income',
    'Crypto & FX',
    'Finfluencer Scams'
  ];

  const formattedMessage = `[MARKET DEBUNK CLAIM PITCH]\nCategory: ${category}\nClaim: ${claim}\nSource Link: ${sourceUrl || 'N/A'}\nUser Contact: ${userEmail || 'N/A'}\nContext: ${notes || 'None'}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!claim) return;

    // Open mailto link with prefilled subject and body
    const subject = encodeURIComponent(`[Debunk Request] ${category}: ${claim.slice(0, 40)}...`);
    const body = encodeURIComponent(formattedMessage);
    window.open(`mailto:${siteConfig.links.email}?subject=${subject}&body=${body}`, '_blank');
    
    setSubmitted(true);
  };

  return (
    <section id="creator" className="py-20 md:py-28 px-6 border-b border-hairline">
      <div className="max-w-ledger mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare size={16} className="text-amber" />
              <span className="text-xs font-mono uppercase tracking-widest text-amber">
                COMMUNITY PITCH DESK
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-paper">
              Ask Creator / Pitch a Myth
            </h2>
          </div>
          <p className="text-sm text-paper-dim max-w-md font-sans">
            Spotted a suspicious financial reel, an outrageous stock recommendation, or have a doubt you want torn apart with audited filings? Send it directly to the research desk.
          </p>
        </div>

        {/* Two-Column Form & Quick Dispatch Ledger */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border border-hairline bg-panel">
          
          {/* Left Column: Input Form (7 cols) */}
          <div className="lg:col-span-7 p-7 sm:p-10 border-b lg:border-b-0 lg:border-r border-hairline">
            
            {submitted ? (
              <div className="py-12 text-center">
                <div className="w-14 h-14 bg-amber/20 border border-amber rounded-full flex items-center justify-center mx-auto mb-4 text-amber">
                  <Check size={28} />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-paper mb-2">
                  Pitch Prepared & Dispatched
                </h3>
                <p className="text-sm text-paper-dim max-w-md mx-auto mb-6">
                  Your myth breakdown request has been formatted. If your mail client didn't open automatically, you can copy the message and drop it into Telegram or Email below.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono uppercase bg-panel-secondary hover:bg-panel border border-hairline text-paper"
                  >
                    {copied ? <Check size={14} className="text-amber" /> : <Copy size={14} />}
                    <span>{copied ? "Copied to clipboard" : "Copy Formatted Pitch"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setClaim('');
                      setSourceUrl('');
                      setNotes('');
                    }}
                    className="px-5 py-2.5 text-xs font-mono uppercase text-amber hover:underline"
                  >
                    Submit Another Claim
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Category Selector */}
                <div>
                  <label className="block text-xs font-mono uppercase text-paper-dim mb-2">
                    1. Select Topic Category
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategory(cat)}
                        className={`text-xs font-mono px-3 py-1.5 border transition-colors ${
                          category === cat
                            ? 'bg-amber text-ink border-amber font-semibold'
                            : 'bg-ink text-paper-dim border-hairline hover:border-paper-dim/40'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Claim / Question Field */}
                <div>
                  <label className="block text-xs font-mono uppercase text-paper-dim mb-2">
                    2. The Myth / Claim to Debunk *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={claim}
                    onChange={(e) => setClaim(e.target.value)}
                    placeholder="e.g. 'Influencer claims buying dividend stocks on ex-date guarantees 10% risk-free return every month without capital loss...'"
                    className="w-full px-4 py-3 bg-ink border border-hairline text-paper placeholder:text-paper-muted text-sm font-sans focus:border-amber focus:outline-none"
                  />
                </div>

                {/* Source Link & User Contact Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-paper-dim mb-2">
                      3. Source Link (Optional)
                    </label>
                    <input
                      type="url"
                      value={sourceUrl}
                      onChange={(e) => setSourceUrl(e.target.value)}
                      placeholder="https://instagram.com/reel/..."
                      className="w-full px-4 py-2.5 bg-ink border border-hairline text-paper placeholder:text-paper-muted text-sm font-sans focus:border-amber focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-paper-dim mb-2">
                      4. Your Email or Handle
                    </label>
                    <input
                      type="text"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="@handle or email"
                      className="w-full px-4 py-2.5 bg-ink border border-hairline text-paper placeholder:text-paper-muted text-sm font-sans focus:border-amber focus:outline-none"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-amber hover:bg-amber-hover text-ink font-mono text-sm uppercase font-semibold transition-colors"
                  >
                    <span>Submit Debunk Request</span>
                    <Send size={15} />
                  </button>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3.5 bg-ink hover:bg-panel-secondary border border-hairline text-paper-dim hover:text-paper font-mono text-xs uppercase transition-colors"
                  >
                    {copied ? <Check size={14} className="text-amber" /> : <Copy size={14} />}
                    <span>{copied ? "Copied" : "Copy to Clipboard"}</span>
                  </button>
                </div>

              </form>
            )}

          </div>

          {/* Right Column: Direct Channels & Dispatch Guide (5 cols) */}
          <div className="lg:col-span-5 p-7 sm:p-10 bg-panel-secondary/40 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-paper-dim block mb-3">
                DIRECT INTAKE CHANNELS
              </span>
              <h3 className="font-serif text-xl font-semibold text-paper mb-4">
                How Claims Are Picked
              </h3>

              <div className="space-y-4 text-xs font-mono text-paper-dim mb-8">
                <div className="p-3 bg-ink/70 border border-hairline">
                  <div className="text-paper font-semibold mb-1">1. FACT-CHECK PRIORITY</div>
                  <span>Claims with widespread retail damage or >100k views get examined first.</span>
                </div>
                <div className="p-3 bg-ink/70 border border-hairline">
                  <div className="text-paper font-semibold mb-1">2. MATHEMATICAL AUDIT</div>
                  <span>We pull quarterly reports, prospectus filings, and historical backtests.</span>
                </div>
                <div className="p-3 bg-ink/70 border border-hairline">
                  <div className="text-paper font-semibold mb-1">3. VERTICAL DROP</div>
                  <span>Deconstructed into a 60-second vertical short within 48-72 hours.</span>
                </div>
              </div>
            </div>

            {/* Direct Connect Options */}
            <div className="border-t border-hairline pt-6 space-y-2.5">
              <a
                href={siteConfig.links.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-panel border border-hairline hover:border-amber/40 transition-colors text-xs font-mono text-paper"
              >
                <span>Direct Telegram Drop</span>
                <ExternalLink size={14} className="text-amber" />
              </a>

              <a
                href={`mailto:${siteConfig.links.email}`}
                className="flex items-center justify-between p-3 bg-panel border border-hairline hover:border-amber/40 transition-colors text-xs font-mono text-paper"
              >
                <span>Email Research Desk</span>
                <span className="text-paper-muted text-[11px]">{siteConfig.links.email}</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
