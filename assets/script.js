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
  EMAIL: 'contact@marketdebunk.com',
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
  let clickX = e ? e.clientX : null;
  let clickY = e ? e.clientY : null;

  if (!clickX || !clickY) {
    const stage = document.querySelector('.isometric-stage');
    if (stage) {
      const rect = stage.getBoundingClientRect();
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

  // 1. Expanding Ripple
  const ripple = document.createElement('div');
  ripple.className = 'rupee-ripple';
  ripple.style.left = clickX + 'px';
  ripple.style.top = clickY + 'px';
  container.appendChild(ripple);
  setTimeout(() => ripple.remove(), 900);

  // 2. Floating +₹500 Protected Badge
  const badge = document.createElement('div');
  badge.className = 'rupee-badge-particle';
  badge.style.left = clickX + 'px';
  badge.style.top = clickY + 'px';
  badge.innerHTML = `<span>🛡️</span> <span class="amount">+₹500</span> <span>CAPITAL PROTECTED</span>`;
  container.appendChild(badge);
  setTimeout(() => badge.remove(), 1950);

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

function playCashChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(880, now);
    osc1.frequency.exponentialRampToValueAtTime(1320, now + 0.08);
    gain1.gain.setValueAtTime(0.15, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.3);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(1760, now + 0.06);
    gain2.gain.setValueAtTime(0.1, now + 0.06);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.06);
    osc2.stop(now + 0.35);
  } catch (err) {}
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
// INIT ON LOAD
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initHeroMythRotator();
  initIsometricTilt();
  fetchLatestDriveUpload();

  setInterval(() => {
    if (!document.hidden) fetchLatestDriveUpload();
  }, CONFIG.POLL_INTERVAL_MS);
});
