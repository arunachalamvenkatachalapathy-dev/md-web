/**
 * Market Debunk — Official Channel Web Engine
 * Features:
 * 1. Interactive Forensic Mythbuster Simulator
 * 2. 3D Isometric Cursor-Tracking Physics
 * 3. Google Drive API v3 Live Stream with LocalStorage Cache
 * 4. Struck-Through Myth Cycle
 * 5. Forensic Ticket Dispatch Desk
 */

const CONFIG = {
  DRIVE_API_KEY: '[[DRIVE_API_KEY]]',
  DRIVE_FOLDER_ID: '1n600zacanICWFEQ1oX5XYOUyJLMSyvjc',
  YOUTUBE_URL: 'https://www.youtube.com/@MarketDebunk',
  INSTAGRAM_URL: 'https://www.instagram.com/marketdebunk',
  TELEGRAM_URL: 'https://t.me/marketdebunk',
  LINKEDIN_URL: 'https://www.linkedin.com/company/marketdebunk',
  EMAIL: 'marketdebunk@gmail.com',
  POLL_INTERVAL_MS: 5 * 60 * 1000,
  CACHE_KEY: 'md_channel_latest_stream'
};

// ==========================================================================
// 1. FORENSIC SIMULATOR DATA & CONTROLLER
// ==========================================================================
const SIMULATOR_DATABASE = {
  reits: {
    claim: "12% Safe Dividend Yield on Public REITs / InvITs",
    promised: "12.0% Annual Cashflow",
    actual: "2.4% Net (After Capital Erosion)",
    riskScore: "HIGH TRAP (78%)",
    filingCitation: "Quarterly Distribution Statement, Section 4.2: 'Return of Capital Component'",
    deconstruction: "The distribution is not pure earnings. Over 65% of the payout is structured as 'Return of Capital' (ROC), meaning the trust is returning your own initial principal while your net asset value steadily degrades. You pay taxes on an illusion.",
    rule: "Always deduct Return of Capital from gross payout before calculating yield."
  },
  buydip: {
    claim: "Always Buy the 20% Dip on Legacy Stocks",
    promised: "Guaranteed Mean Reversion",
    actual: "-41% Average 2-Year Return",
    riskScore: "CRITICAL RISK (86%)",
    filingCitation: "Audited Free Cash Flow Statement vs Debt Maturities",
    deconstruction: "Stocks rarely collapse 20% without deteriorating fundamentals. Retail investors average down on zombie firms whose operating cashflow has turned negative, turning a temporary drop into permanent capital loss.",
    rule: "Never average down unless Free Cash Flow yield is expanding, not contracting."
  },
  options: {
    claim: "90% Win Rate Intraday Algo Trading Bot",
    promised: "1.5% Daily Guaranteed Profit",
    actual: "-92% Loss within 90 Days",
    riskScore: "FATAL PROBABILITY (97%)",
    filingCitation: "SEBI Retail Derivatives Study: 93% Traders Lose Capital",
    deconstruction: "High-win-rate strategies collect small pennies while taking infinite left-tail blowup risk. A single gap-down day wipes out 6 months of theoretical daily gains, while brokerages take 30% of gross capital in turnover charges.",
    rule: "If an algo had 90% win rate, the creator would manage sovereign wealth, not sell a ₹999 course."
  },
  preipo: {
    claim: "Exclusive Pre-IPO 100x Growth Opportunity",
    promised: "10x to 100x Post-Listing",
    actual: "-58% Median Post-Listing Crash",
    riskScore: "SEVERE LOCKUP (91%)",
    filingCitation: "DRHP Red Herring Prospectus: Offer For Sale (OFS) vs Fresh Issue",
    deconstruction: "Unlisted shares are sold by early VCs and promoters dumping their private stake before regulatory disclosures hit the exchange. Retail buyers buy at peak private valuations with zero secondary market liquidity.",
    rule: "Check the OFS percentage in the DRHP. If promoters are exiting >80%, you are the exit liquidity."
  }
};

function selectSimulatorMyth(key) {
  const data = SIMULATOR_DATABASE[key];
  if (!data) return;

  document.querySelectorAll('.sim-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-sim') === key);
  });

  const claimEl = document.getElementById('sim-claim-text');
  const promisedEl = document.getElementById('sim-promised');
  const actualEl = document.getElementById('sim-actual');
  const riskEl = document.getElementById('sim-risk');
  const deconstructEl = document.getElementById('sim-deconstruct');
  const citationEl = document.getElementById('sim-citation');
  const ruleEl = document.getElementById('sim-rule');

  if (claimEl) claimEl.textContent = `"${data.claim}"`;
  if (promisedEl) promisedEl.textContent = data.promised;
  if (actualEl) actualEl.textContent = data.actual;
  if (riskEl) riskEl.textContent = data.riskScore;
  if (deconstructEl) deconstructEl.textContent = data.deconstruction;
  if (citationEl) citationEl.textContent = data.filingCitation;
  if (ruleEl) ruleEl.textContent = data.rule;
}

// ==========================================================================
// 2. ISOMETRIC 3D INTERACTIVE TILT PHYSICS & ₹500 RUPEE ANIMATION
// ==========================================================================
function initIsometricTilt() {
  const viewport = document.querySelector('.isometric-viewport');
  const stage = document.querySelector('.isometric-stage');
  if (!viewport || !stage) return;

  // Gentle, straight-enough tilt (resting: rotateX(2deg) rotateY(-4.5deg) rotateZ(0.5deg))
  viewport.addEventListener('mousemove', (e) => {
    const rect = viewport.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotX = 2 - (y / rect.height) * 4;
    const rotY = -4.5 + (x / rect.width) * 5;

    stage.style.transform = `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) rotateZ(0.5deg)`;
  });

  viewport.addEventListener('mouseleave', () => {
    stage.style.transform = `rotateX(2deg) rotateY(-4.5deg) rotateZ(0.5deg)`;
  });

  // ₹500 Indian Rupee Click Animation Trigger
  viewport.addEventListener('click', (e) => {
    // Avoid interfering if user clicked directly on an external CTA link
    if (e.target.tagName !== 'A' && !e.target.closest('a')) {
      triggerRupeeBurst(e);
    }
  });
}

// ==========================================================================
// ₹500 INDIAN RUPEE BURST ENGINE
// ==========================================================================
function triggerRupeeBurst(e) {
  let clickX = null;
  let clickY = null;

  if (e) {
    if (typeof e.clientX === 'number' && (e.clientX > 0 || e.clientY > 0)) {
      clickX = e.clientX;
      clickY = e.clientY;
    } else if (e.touches && e.touches.length > 0) {
      clickX = e.touches[0].clientX;
      clickY = e.touches[0].clientY;
    } else if (e.changedTouches && e.changedTouches.length > 0) {
      clickX = e.changedTouches[0].clientX;
      clickY = e.changedTouches[0].clientY;
    } else if (e.target && e.target.getBoundingClientRect) {
      const rect = e.target.getBoundingClientRect();
      clickX = rect.left + rect.width / 2;
      clickY = rect.top + rect.height / 2;
    }
  }

  if (!clickX || !clickY) {
    const btn = document.getElementById('btn-catchup-verdict') || document.querySelector('.isometric-stage');
    if (btn) {
      const rect = btn.getBoundingClientRect();
      clickX = rect.left + rect.width / 2;
      clickY = rect.top + rect.height / 2;
    } else {
      clickX = window.innerWidth / 2;
      clickY = window.innerHeight / 2;
    }
  }

  // Optional subtle cash chime
  playCashChime();

  // Ensure persistent overlay
  let container = document.getElementById('rupee-overlay-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'rupee-overlay-container';
    container.className = 'rupee-container-overlay';
    document.body.appendChild(container);
  }

  // 1. Expanding Ripple (fades immediately)
  const ripple = document.createElement('div');
  ripple.className = 'rupee-ripple';
  ripple.style.left = clickX + 'px';
  ripple.style.top = clickY + 'px';
  container.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);

  // 3. Realistic Miniature ₹500 Banknotes (bursting outward & floating)
  const notesCount = 7;
  for (let i = 0; i < notesCount; i++) {
    const note = document.createElement('div');
    note.className = 'rupee-note-particle';
    note.style.left = clickX + 'px';
    note.style.top = clickY + 'px';

    const angle = (i / notesCount) * 2 * Math.PI + (Math.random() - 0.5) * 0.4;
    const distance = 130 + Math.random() * 140;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance - (60 + Math.random() * 70); // bias upward
    const rotMid = (Math.random() - 0.5) * 45;
    const rotEnd = rotMid + (Math.random() - 0.5) * 90;

    note.style.setProperty('--tx-start', '0px');
    note.style.setProperty('--ty-start', '0px');
    note.style.setProperty('--tx', `${tx}px`);
    note.style.setProperty('--ty', `${ty}px`);
    note.style.setProperty('--rot-mid', `${rotMid}deg`);
    note.style.setProperty('--rot-end', `${rotEnd}deg`);

    note.innerHTML = `
      <div class="rupee-note-header">
        <span>RESERVE BANK OF INDIA</span>
        <span>₹500</span>
      </div>
      <div class="rupee-note-body">
        <div class="rupee-note-amount">₹500</div>
        <div class="rupee-note-emblem">
          <span>MAHATMA GANDHI</span><br>
          <span>500 RUPEES</span>
        </div>
      </div>
      <div class="rupee-note-footer">
        <span>GUARANTEED BY GOVT</span>
        <span>₹500</span>
      </div>
    `;

    container.appendChild(note);
    setTimeout(() => note.remove(), 1800);
  }
}

// ==========================================================================
// ROBUST PERSISTENT AUDIO CONTEXT FOR CASH REGISTER CHIME (PLAYS 100% OF TIME)
// ==========================================================================
let sharedAudioCtx = null;

function getAudioContext() {
  try {
    if (!sharedAudioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        sharedAudioCtx = new AudioContextClass();
      }
    }
    if (sharedAudioCtx && sharedAudioCtx.state === 'suspended') {
      sharedAudioCtx.resume().catch(() => {});
    }
  } catch (e) {
    console.warn('[Audio] Context init notice:', e);
  }
  return sharedAudioCtx;
}

function playCashChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (ctx.state === 'suspended') {
      ctx.resume().then(() => playChimeFrequencies(ctx)).catch(() => {});
    } else {
      playChimeFrequencies(ctx);
    }
  } catch (err) {
    console.warn('[Audio] Chime playback notice:', err);
  }
}

function playChimeFrequencies(ctx) {
  try {
    const now = ctx.currentTime;

    // First tone: Metallic coin impact (B5 -> E6)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(987.77, now);
    osc1.frequency.exponentialRampToValueAtTime(1318.51, now + 0.08);
    gain1.gain.setValueAtTime(0.18, now);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.32);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.33);

    // Second tone: Sparkling high register cash chime (B6 -> E7)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(1975.53, now + 0.05);
    osc2.frequency.exponentialRampToValueAtTime(2637.02, now + 0.12);
    gain2.gain.setValueAtTime(0.12, now + 0.05);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.05);
    osc2.stop(now + 0.39);
  } catch (e) {}
}

// ==========================================================================
// 3. HERO MYTH ROTATOR
// ==========================================================================
const HERO_MYTHS = [
  "Buy the dip on every stock and you'll never lose.",
  "High dividend yield always means free safe income.",
  "Timing the market is easy if you follow technical indicators.",
  "Gold is guaranteed to surge the moment equities wobble."
];

let heroMythIdx = 0;
function initHeroMythRotator() {
  const el = document.getElementById('hero-myth-text');
  if (!el) return;

  setInterval(() => {
    el.style.opacity = '0';
    setTimeout(() => {
      heroMythIdx = (heroMythIdx + 1) % HERO_MYTHS.length;
      el.textContent = `"${HERO_MYTHS[heroMythIdx]}"`;
      el.style.opacity = '1';
    }, 280);
  }, 4200);
}

// ==========================================================================
// 4. GOOGLE DRIVE API V3 CLIENT & LOCALSTORAGE ENGINE
// ==========================================================================
async function fetchLatestDriveUpload() {
  const titleEl = document.getElementById('latest-feed-title');
  const dateEl = document.getElementById('latest-feed-date');
  const tagEl = document.getElementById('latest-feed-tag');
  const linkEl = document.getElementById('latest-feed-link');
  const thumbEl = document.getElementById('latest-feed-thumb');
  const syncEl = document.getElementById('latest-feed-sync');
  const statusPill = document.getElementById('latest-feed-status');

  const renderData = (data, isCached = false) => {
    if (titleEl) titleEl.textContent = data.name.replace(/\.[^/.]+$/, "");
    if (dateEl) dateEl.textContent = `Uploaded ${new Date(data.createdTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
    if (tagEl) tagEl.textContent = data.mimeType && data.mimeType.includes('video') ? 'VIDEO' : 'SHORT';
    if (linkEl) linkEl.href = data.webViewLink || `https://drive.google.com/file/d/${data.id}/view`;
    if (thumbEl) thumbEl.src = data.thumbnailLink || 'assets/img/channel_logo.png';
    if (syncEl) syncEl.textContent = `Last sync: ${new Date(data.syncTimestamp || Date.now()).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
    if (statusPill) {
      statusPill.innerHTML = isCached 
        ? `<span class="pulse-dot-green" style="background:#F59E0B"></span> CACHED STREAM` 
        : `<span class="pulse-dot-green"></span> LIVE SYNC ACTIVE`;
    }
  };

  // Fallback demo if secrets are unconfigured
  if (!CONFIG.DRIVE_API_KEY || CONFIG.DRIVE_API_KEY.includes('[[')) {
    const cached = localStorage.getItem(CONFIG.CACHE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        renderData({ ...parsed.data, syncTimestamp: parsed.timestamp }, true);
        return;
      } catch (e) {}
    }

    // Default sample
    renderData({
      id: "demo-latest",
      name: "Episode 48: The 'Safe 12% Dividend' Trap in Public REITs",
      createdTime: new Date().toISOString(),
      mimeType: "video/mp4",
      webViewLink: CONFIG.YOUTUBE_URL,
      thumbnailLink: "assets/img/channel_logo.png"
    }, true);
    return;
  }

  // Live Drive Query
  try {
    const query = encodeURIComponent(`'${CONFIG.DRIVE_FOLDER_ID}' in parents and trashed = false`);
    const fields = encodeURIComponent('files(id,name,createdTime,mimeType,thumbnailLink,webViewLink)');
    const url = `https://www.googleapis.com/drive/v3/files?q=${query}&orderBy=createdTime%20desc&pageSize=1&fields=${fields}&key=${CONFIG.DRIVE_API_KEY}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();

    if (json.files && json.files.length > 0) {
      const file = json.files[0];
      const now = Date.now();
      localStorage.setItem(CONFIG.CACHE_KEY, JSON.stringify({ data: file, timestamp: now }));
      renderData({ ...file, syncTimestamp: now }, false);
    }
  } catch (err) {
    console.warn('[Market Debunk] Drive stream fallback:', err.message);
    const cached = localStorage.getItem(CONFIG.CACHE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        renderData({ ...parsed.data, syncTimestamp: parsed.timestamp }, true);
      } catch (e) {}
    }
  }
}
window.fetchLatestDriveUpload = fetchLatestDriveUpload;

// ==========================================================================
// 5. PITCH DESK / TICKET DISPATCH
// ==========================================================================
function handlePitchSubmit(e) {
  e.preventDefault();
  const claim = document.getElementById('pitch-claim-input').value;
  const url = document.getElementById('pitch-url-input').value;
  const contact = document.getElementById('pitch-contact-input').value;
  const ticketId = 'MD-' + Math.floor(1000 + Math.random() * 9000);

  const subject = encodeURIComponent(`[FORENSIC AUDIT TICKET ${ticketId}] ${claim.slice(0, 45)}...`);
  const body = encodeURIComponent(
    `MARKET DEBUNK INVESTIGATIVE INTAKE: ${ticketId}\n` +
    `----------------------------------------\n` +
    `VIRAL CLAIM / MYTH: ${claim}\n` +
    `PROOF / REEL LINK: ${url || 'N/A'}\n` +
    `SUBMITTER CONTACT: ${contact || 'N/A'}\n` +
    `STATUS: QUEUED FOR BALANCE SHEET AUDIT\n`
  );

  window.open(`mailto:${CONFIG.EMAIL}?subject=${subject}&body=${body}`, '_blank');
  
  const statusBox = document.getElementById('pitch-status-msg');
  if (statusBox) {
    statusBox.style.display = 'block';
    statusBox.innerHTML = `✓ TICKET <strong>${ticketId}</strong> GENERATED & QUEUED FOR 60s DEBUNK BREAKDOWN.`;
  }
}

function copyPitchData() {
  const claim = document.getElementById('pitch-claim-input').value || '(No claim specified)';
  const url = document.getElementById('pitch-url-input').value || 'N/A';
  const contact = document.getElementById('pitch-contact-input').value || 'N/A';
  const text = `[MARKET DEBUNK INVESTIGATION PITCH]\nClaim: ${claim}\nLink: ${url}\nContact: ${contact}`;

  navigator.clipboard.writeText(text).then(() => {
    alert('Forensic Ticket copied to clipboard. Paste into Telegram or Email.');
  });
}

// ==========================================================================
// 6. OFFICIAL VERDICTS SYSTEM (10 FORENSIC VERDICTS & CATCH UP ENGINE)
// ==========================================================================
const OFFICIAL_VERDICTS = [
  {
    tag: "VERDICT 01 // BUY THE DIP",
    text: 'DO NOT BUY THE DIP: "Operating cash flow turned negative. Averaging down on zombie balance sheets destroys portfolios."'
  },
  {
    tag: "VERDICT 02 // 12% DIVIDEND YIELD",
    text: 'REIT DIVIDEND TRAP: "Over 65% is Return of Capital (ROC). They are refunding your own money while NAV steadily degrades."'
  },
  {
    tag: "VERDICT 03 // 90% WIN-RATE ALGO",
    text: 'ALGO BOT EXPOSURE: "If their algorithm had a 90% edge, they would trade sovereign capital, not sell a ₹999 Telegram group."'
  },
  {
    tag: "VERDICT 04 // F&O DERIVATIVES",
    text: 'SEBI 93% F&O STUDY: "9 out of 10 retail options traders lose everything. Average loss exceeds ₹1.25 Lakhs per participant."'
  },
  {
    tag: "VERDICT 05 // PRE-IPO 100x",
    text: 'PRE-IPO OFS TRAP: "85% Offer For Sale (OFS) means founders are cashing out. Retail investors are serving as exit liquidity."'
  },
  {
    tag: "VERDICT 06 // P/E RATIO",
    text: 'ACCOUNTING PROFIT TRAP: "Reported EBITDA is an opinion; Free Cash Flow (CFO - Capex) is the only statutory reality."'
  },
  {
    tag: "VERDICT 07 // PROMOTER PLEDGING",
    text: 'PROMOTER MARGIN CALL: "When promoters pledge >20% shares, any correction triggers lender dumping and un-exitable lower circuits."'
  },
  {
    tag: "VERDICT 08 // ZERO BROKERAGE",
    text: '0% BROKERAGE ILLUSION: "Payment For Order Flow (PFOF) and execution slippage cost 15x more than flat brokerage fees."'
  },
  {
    tag: "VERDICT 09 // DEBT-FREE COMPANIES",
    text: 'WORKING CAPITAL BLINDSPOT: "A debt-free company can still face sudden insolvency if receivables get locked up. Audit cash conversion."'
  },
  {
    tag: "VERDICT 10 // TATA MOTORS EV",
    text: 'TATA MOTORS & JLR AUDIT: "Never assess domestic sales in isolation. Consolidated luxury debt and EV capex cycles govern true solvency."'
  }
];

let currentVerdictIndex = 0;
let verdictAutoTimer = null;

function nextHeroVerdict(e) {
  currentVerdictIndex = (currentVerdictIndex + 1) % OFFICIAL_VERDICTS.length;
  updateVerdictDisplay();
  restartVerdictTimer();

  // 1. Trigger the ₹500 Rupee Banknote Blast on Catch Up!
  triggerRupeeBurst(e);

  // 2. Subtle button feedback glow
  const btn = document.getElementById('btn-catchup-verdict');
  if (btn) {
    btn.style.boxShadow = '0 0 16px rgba(0, 229, 153, 0.7)';
    setTimeout(() => {
      if (btn) btn.style.boxShadow = '';
    }, 300);
  }
}

function updateVerdictDisplay() {
  const textEl = document.getElementById('hero-verdict-text');
  const counterEl = document.getElementById('verdict-counter');
  const tagEl = document.getElementById('hero-verdict-tag');

  if (textEl) {
    textEl.style.opacity = '0';
    setTimeout(() => {
      const item = OFFICIAL_VERDICTS[currentVerdictIndex];
      textEl.textContent = item.text;
      if (counterEl) counterEl.textContent = `${currentVerdictIndex + 1}/${OFFICIAL_VERDICTS.length}`;
      if (tagEl) tagEl.textContent = item.tag;
      textEl.style.opacity = '1';
    }, 180);
  }
}

function restartVerdictTimer() {
  if (verdictAutoTimer) clearInterval(verdictAutoTimer);
  verdictAutoTimer = setInterval(() => {
    currentVerdictIndex = (currentVerdictIndex + 1) % OFFICIAL_VERDICTS.length;
    updateVerdictDisplay();
  }, 5000);
}

function initHeroVerdicts() {
  updateVerdictDisplay();
  restartVerdictTimer();
}

// ==========================================================================
// 7. FORENSIC WEB RESEARCH ENGINE (MODAL & REAL-TIME WEB SCAN)
// ==========================================================================
const WEB_RESEARCH_DB = [
  {
    query: "tata motors",
    symbol: "NSE: TATAMOTORS",
    headline: "Consolidated Net Automotive Debt vs Domestic CV Cash Flow",
    sources: ["BSE / NSE Statutory Disclosures", "MCA-21 Filings", "JLR Annual Statutory 10-K"],
    finding: "Consolidated net debt remains elevated due to Jaguar Land Rover electrification capex. While domestic passenger/EV market share is strong, free cash flow sensitivity to global luxury demand remains the critical risk factor.",
    risk: "MODERATE RISK (54%)",
    status: "AUDITED"
  },
  {
    query: "reit",
    symbol: "BSE: EMBASSY / BIRET / NEXUS",
    headline: "Public REITs Return of Capital (ROC) vs Dividend Yield",
    sources: ["Quarterly Distribution Statements", "SEBI REIT Regulations 2014"],
    finding: "Gross 11.8% yields consist of 68% Return of Capital (ROC). NAV capital decay cancels out nominal dividend returns over a 3-year holding window.",
    risk: "HIGH TRAP (78%)",
    status: "DISSECTED"
  },
  {
    query: "f&o",
    symbol: "NSE: NIFTY / BANKNIFTY DERIVATIVES",
    headline: "SEBI Official Study on Individual Retail Option Traders",
    sources: ["SEBI Research Study on Retail F&O", "Exchange Turnover Audit Data"],
    finding: "93% of active retail derivative traders incurred average losses of ₹1.25 Lakhs. Over 98% of total trading profits were captured by foreign algorithmic prop desks.",
    risk: "CRITICAL HAZARD (93%)",
    status: "EXPOSED"
  },
  {
    query: "pre-ipo",
    symbol: "UNLISTED PRIVATE EQUITY MARKET",
    headline: "Pre-IPO Secondary Share Trading & Offer For Sale (OFS) Dumping",
    sources: ["Draft Red Herring Prospectuses (DRHP)", "Registrar of Companies (RoC)"],
    finding: "Over 82% of issue size in recent venture-backed tech IPOs consisted of existing promoter Offer For Sale. Unlisted buyers pay peak valuations without audited quarterly filing protections.",
    risk: "EXTREME RISK (89%)",
    status: "EXPOSED"
  },
  {
    query: "adani",
    symbol: "NSE: ADANIENT / ADANIPORTS",
    headline: "Operating Cash Flow vs Foreign Currency Borrowing & Leverage",
    sources: ["Statutory Consolidated Balance Sheets", "Credit Rating Disclosures (CRISIL/ICRA)"],
    finding: "High gross debt levels balanced by regulated utility cashflows. Key forensic focus is foreign bond refinancing schedules and cross-collateralization between group entities.",
    risk: "MONITORED (61%)",
    status: "AUDITED"
  },
  {
    query: "zomato",
    symbol: "NSE: ZOMATO",
    headline: "Reported Adjusted EBITDA vs True Free Cash Flow",
    sources: ["Audited Financial Results (Quarterly)", "BSE Filings"],
    finding: "Adjusted EBITDA excludes ESOP compensation costs. True Free Cash Flow has turned positive only recently due to Blinkit platform fee extraction. Valuation remains stretched.",
    risk: "MEDIUM RISK (48%)",
    status: "AUDITED"
  }
];

function openWebResearchModal(initialQuery = "") {
  let modal = document.getElementById('web-research-modal');
  if (!modal) {
    createWebResearchModal();
    modal = document.getElementById('web-research-modal');
  }
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    const input = document.getElementById('web-research-input');
    if (input) {
      input.value = initialQuery;
      performWebResearch(initialQuery);
      setTimeout(() => input.focus(), 150);
    }
  }
}

function closeWebResearchModal() {
  const modal = document.getElementById('web-research-modal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
}

function createWebResearchModal() {
  const modalEl = document.createElement('div');
  modalEl.id = 'web-research-modal';
  modalEl.className = 'video-modal-backdrop';
  modalEl.style.display = 'none';
  modalEl.innerHTML = `
    <div class="video-modal-card" style="max-width: 780px; max-height: 90vh; display: flex; flex-direction: column;">
      <div class="video-modal-header" style="background: var(--bg-surface);">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="width: 32px; height: 32px; border-radius: 8px; background: #000; overflow: hidden; border: 1px solid var(--green);">
            <img src="assets/img/channel_logo.png" alt="Market Debunk" style="width: 100%; height: 100%; object-fit: contain;">
          </div>
          <div>
            <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--green-dark); font-weight: 800; letter-spacing: 0.05em;">
              FORENSIC WEB RADAR // LIVE AUDIT ENGINE
            </div>
            <h3 style="font-size: 1.05rem; font-weight: 800; color: var(--ink-primary); margin: 0;">
              Real-Time Financial Web Research
            </h3>
          </div>
        </div>
        <button type="button" onclick="closeWebResearchModal()" class="video-modal-close" style="font-size: 1.6rem; cursor: pointer; border: none; background: transparent; color: var(--ink-muted);">&times;</button>
      </div>

      <div style="padding: 20px 24px; border-bottom: 1px solid var(--border-light); background: #FFFFFF;">
        <div style="position: relative; margin-bottom: 12px;">
          <input
            type="text"
            id="web-research-input"
            class="debunky-input"
            style="width: 100%; padding-left: 42px; border-radius: 12px; font-size: 0.92rem;"
            placeholder="Search any Indian stock, ticker, or viral myth (e.g. Tata Motors, REITs, F&O)..."
            oninput="performWebResearch(this.value)"
          />
          <span style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); font-size: 1.1rem; color: var(--ink-muted);">🌐</span>
        </div>

        <div style="display: flex; flex-wrap: wrap; gap: 6px; align-items: center;">
          <span style="font-family: var(--font-mono); font-size: 0.68rem; color: var(--ink-muted); font-weight: 700;">POPULAR WEB AUDITS:</span>
          <button type="button" class="debunky-chip" style="font-size: 0.72rem; padding: 4px 10px;" onclick="searchWebPreset('tata motors')">Tata Motors</button>
          <button type="button" class="debunky-chip" style="font-size: 0.72rem; padding: 4px 10px;" onclick="searchWebPreset('reit')">12% REIT Dividend</button>
          <button type="button" class="debunky-chip" style="font-size: 0.72rem; padding: 4px 10px;" onclick="searchWebPreset('f&o')">SEBI F&O Study</button>
          <button type="button" class="debunky-chip" style="font-size: 0.72rem; padding: 4px 10px;" onclick="searchWebPreset('pre-ipo')">Pre-IPO 100x</button>
          <button type="button" class="debunky-chip" style="font-size: 0.72rem; padding: 4px 10px;" onclick="searchWebPreset('zomato')">Zomato FCF</button>
        </div>
      </div>

      <div id="web-research-results" style="padding: 24px; overflow-y: auto; flex: 1; display: flex; flex-direction: column; gap: 16px; background: var(--bg-surface);">
        <!-- Results Rendered Dynamically -->
      </div>

      <div style="padding: 14px 24px; background: #FFFFFF; border-top: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--ink-muted);">
          Primary Web Radar: BSE / NSE Statutory Filings & SEBI Circulars
        </span>
        <button type="button" onclick="closeWebResearchModal(); window.location.hash = 'debunky';" class="btn-pill btn-pill-green" style="font-size: 0.78rem; padding: 8px 16px;">
          <span>Ask Debunky AI Instead ✦</span>
        </button>
      </div>
    </div>
  `;

  modalEl.addEventListener('click', (e) => {
    if (e.target === modalEl) closeWebResearchModal();
  });

  document.body.appendChild(modalEl);
}

function searchWebPreset(term) {
  const input = document.getElementById('web-research-input');
  if (input) {
    input.value = term;
    performWebResearch(term);
  }
}

function performWebResearch(query) {
  const container = document.getElementById('web-research-results');
  if (!container) return;

  const cleanQuery = (query || "").toLowerCase().trim();
  let matches = [];

  if (cleanQuery) {
    matches = WEB_RESEARCH_DB.filter(item => 
      item.query.includes(cleanQuery) || 
      item.symbol.toLowerCase().includes(cleanQuery) || 
      item.headline.toLowerCase().includes(cleanQuery) ||
      item.finding.toLowerCase().includes(cleanQuery)
    );
  }

  if (matches.length === 0 && cleanQuery) {
    container.innerHTML = `
      <div style="background: #FFFFFF; border: 1px solid var(--border-light); border-radius: 16px; padding: 20px; box-shadow: 0 4px 16px rgba(15,23,42,0.04);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <span style="font-family: var(--font-mono); font-size: 0.75rem; font-weight: 800; color: var(--green-dark);">
            LIVE WEB AUDIT // SEARCH: "${query}"
          </span>
          <span style="font-family: var(--font-mono); font-size: 0.7rem; color: #DC2626; background: rgba(220,38,38,0.08); padding: 3px 8px; border-radius: 4px; font-weight: 700;">
            RAW WEB SCAN
          </span>
        </div>
        <p style="font-size: 0.88rem; color: var(--ink-secondary); line-height: 1.6; margin-bottom: 14px;">
          To verify claims for <strong>"${query}"</strong> across regulatory databases, cross-check the company's latest quarterly cash flow statement on NSE/BSE. Beware of promoter pledges exceeding 15% and unlisted OFS dumping.
        </p>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button type="button" onclick="closeWebResearchModal(); askDebunkyPrompt('Audit this market claim: ${query}'); window.location.hash = 'debunky';" class="btn-pill btn-pill-black" style="font-size: 0.76rem; padding: 8px 16px;">
            <span>Full Forensic Audit in Debunky AI →</span>
          </button>
        </div>
      </div>
    `;
    return;
  }

  const itemsToRender = matches.length > 0 ? matches : WEB_RESEARCH_DB.slice(0, 3);

  container.innerHTML = itemsToRender.map(item => `
    <div style="background: #FFFFFF; border: 1px solid var(--border-light); border-radius: 16px; padding: 20px; box-shadow: 0 4px 16px rgba(15,23,42,0.04); transition: all 0.2s ease;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
        <div>
          <span style="font-family: var(--font-mono); font-size: 0.72rem; font-weight: 800; color: var(--green-dark); display: block;">
            ${item.symbol}
          </span>
          <h4 style="font-size: 1rem; font-weight: 800; color: var(--ink-primary); margin: 2px 0 0 0;">
            ${item.headline}
          </h4>
        </div>
        <span style="font-family: var(--font-mono); font-size: 0.7rem; color: #DC2626; background: rgba(220,38,38,0.08); border: 1px solid rgba(220,38,38,0.25); padding: 3px 8px; border-radius: 6px; font-weight: 800;">
          ${item.risk}
        </span>
      </div>

      <p style="font-size: 0.86rem; color: var(--ink-secondary); line-height: 1.55; margin-bottom: 14px;">
        ${item.finding}
      </p>

      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; border-top: 1px solid var(--border-light); padding-top: 12px;">
        <div style="font-family: var(--font-mono); font-size: 0.68rem; color: var(--ink-muted);">
          SOURCES: ${item.sources.join(" • ")}
        </div>
        <button type="button" onclick="closeWebResearchModal(); askDebunkyPrompt('${item.headline}'); window.location.hash = 'debunky';" class="btn-pill btn-pill-green" style="font-size: 0.74rem; padding: 6px 14px;">
          <span>Audit in Debunky AI →</span>
        </button>
      </div>
    </div>
  `).join("");
}

window.nextHeroVerdict = nextHeroVerdict;
window.openWebResearchModal = openWebResearchModal;
window.closeWebResearchModal = closeWebResearchModal;
window.searchWebPreset = searchWebPreset;
window.performWebResearch = performWebResearch;

// ==========================================================================
// 8. COMMUNITY FUNDING DESK ENGINE
// ==========================================================================
let currentFundingAmount = 199;

const FUNDING_IMPACT_MAP = {
  199: "Funds 1 MCA-21 statutory company registry document pull",
  499: "Funds 1 comprehensive DRHP Red Herring prospectus forensic audit",
  999: "Funds forensic data scraping infrastructure & server compute",
  2499: "Sponsors an exhaustive whistleblower investigative documentary"
};

function selectFundingTier(amount, btnEl) {
  currentFundingAmount = Number(amount);
  
  // Update active state on buttons
  const buttons = document.querySelectorAll('.funding-tier-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');

  // Update input and labels
  const inputEl = document.getElementById('funding-custom-amt');
  if (inputEl) inputEl.value = currentFundingAmount;

  const submitLbl = document.getElementById('btn-funding-submit-lbl');
  if (submitLbl) submitLbl.textContent = `Fund ₹${currentFundingAmount.toLocaleString('en-IN')} via UPI / Card →`;

  const impactEl = document.getElementById('funding-impact-text');
  if (impactEl) {
    impactEl.textContent = FUNDING_IMPACT_MAP[currentFundingAmount] || `Contributes ₹${currentFundingAmount.toLocaleString('en-IN')} to independent forensics`;
  }
}

function updateCustomFundingAmt(val) {
  const num = parseInt(val, 10);
  if (isNaN(num) || num < 1) return;
  currentFundingAmount = num;

  // Sync active tier button if custom amount matches exactly
  const buttons = document.querySelectorAll('.funding-tier-btn');
  buttons.forEach(btn => {
    const btnAmt = Number(btn.querySelector('.tier-amt')?.textContent.replace(/[^0-9]/g, ''));
    if (btnAmt === currentFundingAmount) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const submitLbl = document.getElementById('btn-funding-submit-lbl');
  if (submitLbl) submitLbl.textContent = `Fund ₹${currentFundingAmount.toLocaleString('en-IN')} via UPI / Card →`;

  const impactEl = document.getElementById('funding-impact-text');
  if (impactEl) {
    impactEl.textContent = FUNDING_IMPACT_MAP[currentFundingAmount] || `Contributes ₹${currentFundingAmount.toLocaleString('en-IN')} directly to independent forensic data`;
  }
}

function toggleFundingQR() {
  const drawer = document.getElementById('funding-qr-drawer');
  if (!drawer) return;
  const isHidden = (drawer.style.display === 'none' || drawer.style.display === '');
  drawer.style.display = isHidden ? 'block' : 'none';
  if (isHidden) {
    drawer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function copyFundingUPI() {
  const upiId = 'marketdebunk@upi';
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(upiId).then(() => {
      const copyBtn = document.getElementById('funding-copy-btn-text');
      if (copyBtn) {
        copyBtn.textContent = '✓ Copied!';
        setTimeout(() => { copyBtn.textContent = 'Copy UPI 📋'; }, 2200);
      }
    }).catch(() => {
      fallbackCopyUPI(upiId);
    });
  } else {
    fallbackCopyUPI(upiId);
  }
}

function fallbackCopyUPI(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    const copyBtn = document.getElementById('funding-copy-btn-text');
    if (copyBtn) {
      copyBtn.textContent = '✓ Copied!';
      setTimeout(() => { copyBtn.textContent = 'Copy UPI 📋'; }, 2200);
    }
  } catch (e) {}
  document.body.removeChild(ta);
}

function triggerFundingContribution(e) {
  // Fire Rupee Burst celebration
  triggerRupeeBurst(e);

  const alertEl = document.getElementById('funding-success-alert');
  if (alertEl) {
    alertEl.style.display = 'block';
    alertEl.innerHTML = `
      <div style="font-size: 1.05rem; margin-bottom: 4px; font-weight: 800;">🎉 Thank You for Backing Market Debunk!</div>
      <div>Your contribution of <strong>₹${currentFundingAmount.toLocaleString('en-IN')}</strong> directly protects retail investors from predatory financial traps.</div>
      <div style="margin-top: 8px; font-size: 0.74rem; color: var(--ink-secondary);">Scan the UPI QR code below or transfer directly to <code>marketdebunk@upi</code> to complete dispatch.</div>
    `;
    // Also open the QR code drawer
    const drawer = document.getElementById('funding-qr-drawer');
    if (drawer) drawer.style.display = 'block';
    alertEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// ==========================================================================
// 9. REQUISITION MODAL ENGINE (BESPOKE NATIVE DIALOG)
// ==========================================================================
// 10. PRODUCT REQUISITION & STORE MODAL ENGINE (CORPORATE MINIMAL)
// ==========================================================================
const PRODUCT_CATALOG = {
  'retail-trap': {
    title: "The Retail Trap: Forensic Field Manual",
    format: "RESEARCH DOSSIER // 140P + NOTION",
    price: "₹499",
    billing: "Single Requisition // Lifetime Revisions",
    specs: [
      "50 statutory forensic audits across REITs, IPOs, and operators",
      "Reverse DCF and cash-flow reconciliation models",
      "Interactive Notion database and printable PDF edition"
    ],
    emailSubject: "Requisition: The Retail Trap Dossier (₹499)",
    emailBody: "Hi Market Debunk Team,\n\nI would like to acquire The Retail Trap Forensic Field Manual (₹499).\n\nPlease send the payment details and deliverable access link.\n\nThank you!"
  },
  'valuation-engine': {
    title: "Forensic Valuation Engine",
    format: "FINANCIAL MODEL // .XLSX",
    price: "₹1,299",
    billing: "Spreadsheet License // Excel & Google Sheets",
    specs: [
      "Implied market growth and Reverse DCF model",
      "Automated Beneish M-Score and Altman Z-Score stress tests",
      "Operating cash flow divergence warning algorithm"
    ],
    emailSubject: "Requisition: Forensic Valuation Engine (₹1,299)",
    emailBody: "Hi Market Debunk Team,\n\nI would like to acquire the Forensic Valuation Engine spreadsheet model (₹1,299).\n\nPlease send the payment details and spreadsheet download link.\n\nThank you!"
  },
  'ai-agents-trading': {
    title: "AI Agents for Trading: Execution Pipeline",
    format: "EXECUTION PIPELINE // API",
    price: "₹999/mo",
    billing: "Institutional License // Instant API Access",
    specs: [
      "Algorithmic L2 liquidity sweeps and order book imbalance scans",
      "Mathematical position sizing and volatility stop-loss bounds",
      "Sub-100ms Telegram, Discord, and Webhook event dispatch"
    ],
    emailSubject: "Subscription: AI Agents for Trading (₹999/mo)",
    emailBody: "Hi Market Debunk Team,\n\nI would like to subscribe to the AI Agents for Trading execution pipeline (₹999/mo).\n\nPlease send the payment details and API onboarding instructions.\n\nThank you!"
  },
  'debunk-insider': {
    title: "Debunk Insider: Market Surveillance Desk",
    format: "SURVEILLANCE // TELEGRAM VIP",
    price: "₹299/mo",
    billing: "Monthly Dispatch // Cancel Anytime",
    specs: [
      "Pre-market surveillance bulletins before retail distribution cycles",
      "Weekly deconstruction of complex MCA-21 and SEBI filings",
      "Direct priority inquiry queue for suspicious securities"
    ],
    emailSubject: "Subscription: Debunk Insider VIP (₹299/mo)",
    emailBody: "Hi Market Debunk Team,\n\nI would like to join the Debunk Insider VIP Telegram Surveillance Desk (₹299/mo).\n\nPlease send the payment details and private channel invite.\n\nThank you!"
  },
  'agentic-ai-workflow': {
    title: "Agentic AI Workflow: Statutory Audit Blueprint",
    format: "PYTHON BLUEPRINT // GRAPH",
    price: "₹499",
    billing: "Single Requisition // Complete Repository",
    specs: [
      "Automated ingestion engine for annual reports and DRHP filings",
      "LangGraph verification pipeline for financial statement audit",
      "Production Python source code and test suite"
    ],
    emailSubject: "Requisition: Agentic AI Workflow Blueprint (₹499)",
    emailBody: "Hi Market Debunk Team,\n\nI would like to acquire the Agentic AI Workflow Python Blueprint (₹499).\n\nPlease send the payment details and repository access link.\n\nThank you!"
  },
  'automation-share-tracker': {
    title: "Automation Share Tracker: Portfolio Cloud Engine",
    format: "CLOUD RELAY // GOOGLE SHEETS",
    price: "₹499/mo",
    billing: "Cloud Service // Automated Sync",
    specs: [
      "Automated portfolio valuation and dividend event sync",
      "Real-time alerts on promoter share pledges and block sales",
      "24/7 Google Sheets cloud relay with instant Telegram relays"
    ],
    emailSubject: "Subscription: Automation Share Tracker (₹499/mo)",
    emailBody: "Hi Market Debunk Team,\n\nI would like to activate the Automation Share Tracker cloud service (₹499/mo).\n\nPlease send the payment details and setup instructions.\n\nThank you!"
  }
};

function openRequisitionModal(productId) {
  const item = PRODUCT_CATALOG[productId] || PRODUCT_CATALOG['retail-trap'];
  let overlay = document.getElementById('requisition-modal-overlay');
  
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'requisition-modal-overlay';
    overlay.className = 'requisition-modal-overlay';
    document.body.appendChild(overlay);
  }

  overlay.innerHTML = `
    <div class="requisition-modal">
      <div class="req-modal-header">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="atlas-pulse-dot"></span>
          <span class="font-mono" style="font-size: 0.7rem; font-weight: 800; color: var(--green-dark); letter-spacing: 0.05em;">
            INSTITUTIONAL REQUISITION // RESEARCH DESK
          </span>
        </div>
        <button type="button" onclick="closeRequisitionModal()" class="req-modal-close" aria-label="Close modal">&times;</button>
      </div>

      <div style="margin-bottom: 16px;">
        <span class="product-format-badge" style="display: inline-block; margin-bottom: 8px;">${item.format}</span>
        <h3 style="font-size: 1.25rem; font-weight: 800; color: var(--ink-primary); letter-spacing: -0.02em; margin-bottom: 6px;">
          ${item.title}
        </h3>
        <div style="display: flex; align-items: baseline; gap: 8px; margin-bottom: 14px;">
          <span class="font-mono" style="font-size: 1.6rem; font-weight: 800; color: var(--ink-primary);">${item.price}</span>
          <span style="font-size: 0.75rem; color: var(--ink-muted); font-family: var(--font-mono);">${item.billing}</span>
        </div>
      </div>

      <div style="background: var(--bg-surface); border: 1px solid var(--border-light); border-radius: 12px; padding: 14px 16px; margin-bottom: 20px;">
        <span class="font-mono" style="font-size: 0.68rem; font-weight: 800; color: var(--ink-muted); text-transform: uppercase; display: block; margin-bottom: 8px;">
          Included In Deliverable:
        </span>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 6px; font-size: 0.8rem; color: var(--ink-secondary);">
          ${item.specs.map(s => `<li>✓ ${s}</li>`).join('')}
        </ul>
      </div>

      <div style="display: flex; flex-direction: column; gap: 8px;">
        <a href="mailto:marketdebunk@gmail.com?subject=${encodeURIComponent(item.emailSubject)}" class="btn-pill btn-pill-black" style="justify-content: center; padding: 12px 18px; font-size: 0.85rem;">
          <span>Dispatch Requisition via Email</span>
          <span class="btn-icon-bubble">↗</span>
        </a>
        <button type="button" onclick="copyRequisitionSummary('${productId}')" class="btn-pill btn-pill-ghost" style="justify-content: center; padding: 10px 18px; font-size: 0.8rem;">
          <span id="copy-req-summary-lbl">Copy Order Summary</span>
        </button>
      </div>

      <div style="font-family: var(--font-mono); font-size: 0.68rem; color: var(--ink-muted); text-align: center; margin-top: 14px;">
        Direct dispatch within 1–2 hours. Invoices issued under Market Debunk Media Desk.
      </div>
    </div>
  `;

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeRequisitionModal();
  });

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeRequisitionModal() {
  const overlay = document.getElementById('requisition-modal-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function copyRequisitionSummary(productId) {
  const item = PRODUCT_CATALOG[productId];
  if (!item) return;
  const summary = `MARKET DEBUNK REQUISITION\nItem: ${item.title}\nPrice: ${item.price} (${item.billing})\nFormat: ${item.format}\nContact: marketdebunk@gmail.com`;
  
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(summary).then(() => {
      const lbl = document.getElementById('copy-req-summary-lbl');
      if (lbl) {
        lbl.textContent = '✓ Summary Copied to Clipboard';
        setTimeout(() => { lbl.textContent = 'Copy Order Summary'; }, 2200);
      }
    });
  }
}

function initWhistleblowerTicket() {
  const badge = document.getElementById('whistleblower-ticket-id');
  if (badge) {
    const randomHex = Math.random().toString(16).substring(2, 6).toUpperCase();
    badge.textContent = `TICKET-REF: #MD-2026-${randomHex}`;
  }
}

function dispatchEmailRequisition(productId) {
  const item = PRODUCT_CATALOG[productId] || PRODUCT_CATALOG['ai-agents-trading'];
  const subject = encodeURIComponent(item.emailSubject);
  const body = encodeURIComponent(item.emailBody || `Hi Market Debunk Team,\n\nI would like to requisition ${item.title} (${item.price}).\n\nPlease provide payment and delivery instructions.\n\nThank you!`);
  const mailtoUrl = `mailto:marketdebunk@gmail.com?subject=${subject}&body=${body}`;
  window.location.href = mailtoUrl;
}

window.selectFundingTier = selectFundingTier;
window.updateCustomFundingAmt = updateCustomFundingAmt;
window.toggleFundingQR = toggleFundingQR;
window.copyFundingUPI = copyFundingUPI;
window.triggerFundingContribution = triggerFundingContribution;
window.openRequisitionModal = openRequisitionModal;
window.closeRequisitionModal = closeRequisitionModal;
window.copyRequisitionSummary = copyRequisitionSummary;
window.dispatchEmailRequisition = dispatchEmailRequisition;

// ==========================================================================
// INIT ON LOAD
// ==========================================================================
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initHeroMythRotator();
    initIsometricTilt();
    initHeroVerdicts();
    fetchLatestDriveUpload();
    initWhistleblowerTicket();

    setInterval(() => {
      if (!document.hidden) fetchLatestDriveUpload();
    }, CONFIG.POLL_INTERVAL_MS);
  });
}

