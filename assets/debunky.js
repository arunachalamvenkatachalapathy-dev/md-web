/**
 * Debunky — AI Financial Forensics & Statutory Audit Engine
 * Powered by Gemma 4-26B IT with Live Google Search Grounding
 * Market Debunk (NELANDAR Inc.®)
 */

const GEMMA_CONFIG = {
  apiKey: (typeof localStorage !== 'undefined' && localStorage.getItem('gemma_api_key')) || atob("QVEuQWI4Uk42S3p4bU41cGdxNGRVMVB6c0VURlByQk5hUFI2UTJScDNITmp4b3RWVWtaaUE="),
  model: "gemma-4-26b-a4b-it",
  endpoint: "https://generativelanguage.googleapis.com/v1beta/models/gemma-4-26b-a4b-it:generateContent"
};

let isWebSearchActive = true;
let isVoiceRecording = false;
let speechRecognitionInstance = null;

// Static Forensic Knowledge Base (Instant offline fallback)
const DEBUNKY_KB = [
  {
    keywords: ['dividend', 'reit', 'invit', 'safe yield', 'high yield', 'yield'],
    title: "12% Safe Dividend Yield on Public REITs / InvITs",
    verdictLabel: "PHANTOM YIELD // CAPITAL EROSION",
    verdictType: "hazard",
    answer: "The headline 10–12% payout is an accounting illusion. In public REITs and InvITs, over 65% of the gross payout is structured under 'Return of Capital' (ROC). The trust returns your own invested principal back to you while your Net Asset Value (NAV) degrades over time. Uninformed investors pay income taxes on what is essentially their own capital.",
    citation: "Quarterly Distribution Statement, Section 4.2: 'Return of Capital vs Dividend Distribution'",
    rule: "Always subtract Return of Capital (ROC) from gross distribution before calculating authentic yield."
  },
  {
    keywords: ['algo', 'bot', 'telegram', 'win rate', 'tips', 'f&o', 'options', 'intraday'],
    title: "90% Win-Rate Algo Trading Bots & Telegram Tip Channels",
    verdictLabel: "LEFT-TAIL RISK // 93% SEBI LOSS RATE",
    verdictType: "hazard",
    answer: "High-win-rate strategies collect small pennies while carrying unbounded overnight gap-down risk. A single black-swan gap-down wipes out 6 months of daily scalp profits. SEBI's official study confirmed that 93% of active retail derivative traders lose money, suffering average losses exceeding ₹1.25 Lakhs each plus high exchange turnover costs.",
    citation: "SEBI Official Study: Retail Participation in Equity Cash & Derivatives (F&O)",
    rule: "If an algorithm truly held an institutional 90% edge, the author would trade proprietary capital, not sell a ₹999 Telegram subscription."
  },
  {
    keywords: ['buy the dip', 'dip', 'average down', 'averaging', 'falling stock'],
    title: "Why 'Buy The Dip' Destroys Portfolios on Legacy Debt-Laden Stocks",
    verdictLabel: "ZOMBIE VALUATION TRAP",
    verdictType: "hazard",
    answer: "Stocks rarely plunge 30–50% without structural deterioration in underlying business operations. Retail traders average down on 'cheap' historical P/E multiples of zombie companies whose Operating Cash Flow (CFO) has turned negative. Averaging down on declining cash flows transforms a temporary correction into permanent capital destruction.",
    citation: "Audited Free Cash Flow Statement vs Debt Maturities & Working Capital Run Rate",
    rule: "Never average down unless Free Cash Flow yield is expanding, not deteriorating."
  },
  {
    keywords: ['pre-ipo', 'pre ipo', 'unlisted', 'ofs', 'ipo', 'promoter dump'],
    title: "Pre-IPO 100x Growth Stories & Offer For Sale (OFS) Traps",
    verdictLabel: "EXIT LIQUIDITY // OFS DUMP",
    verdictType: "dilution",
    answer: "Unlisted shares are frequently peddled by early VCs and promoters offloading private equity stakes before public exchange disclosure scrutiny. In many recent retail IPOs, over 80% of the total issue size was Offer For Sale (OFS)—meaning ₹0 fresh capital enters corporate expansion and 100% goes into the pockets of exiting insiders.",
    citation: "SEBI DRHP Red Herring Prospectus: 'Capital Structure & Offer For Sale Breakup'",
    rule: "If the OFS exceeds 70% of the total issue size, public buyers are strictly serving as exit liquidity."
  },
  {
    keywords: ['tata motors', 'tata', 'ev', 'jlr', 'automotive'],
    title: "Tata Motors: Consolidated Debt vs EV Transition Capex",
    verdictLabel: "CAPEX CYCLE MONITORING",
    verdictType: "dilution",
    answer: "When analyzing Tata Motors, never rely solely on standalone domestic passenger vehicle sales. The consolidated balance sheet has historically carried Jaguar Land Rover (JLR) debt and substantial EV platform capex commitments. While commercial vehicles provide steady cash flow in upcycles, automotive capex cycles require constant free cash flow monitoring against global luxury demand.",
    citation: "Consolidated Annual Free Cash Flow & Automotive Net Debt Statements",
    rule: "Track consolidated Free Cash Flow (FCF) rather than standalone domestic EBITDA margins."
  },
  {
    keywords: ['pledge', 'promoter pledge', 'promoter holding', 'margin call'],
    title: "Promoter Share Pledging: The Hidden Liquidation Trigger",
    verdictLabel: "MARGIN CALL HAZARD",
    verdictType: "hazard",
    answer: "When company founders pledge their shareholding as collateral for corporate debt, any market drop can breach maintenance margin thresholds. Lenders then invoke the pledge and dump shares directly on the open market, triggering lower circuits where retail investors cannot exit.",
    citation: "BSE/NSE Shareholding Pattern Disclosures: 'Pledged Shares by Promoters'",
    rule: "Avoid companies where promoter share pledging exceeds 15% of their total equity stake."
  },
  {
    keywords: ['p/e', 'pe ratio', 'free cash flow', 'profit', 'accounting', 'ebitda'],
    title: "Accounting Net Profit vs Free Cash Flow (FCF)",
    verdictLabel: "ACCOUNTING DIVERGENCE",
    verdictType: "dilution",
    answer: "P/E ratios rely on reported 'Net Profit', which can be artificially inflated by capitalizing ongoing operational expenses, lengthening depreciation schedules, or booking uncollected revenues under Trade Receivables. Free Cash Flow (Operating Cash Flow minus Capex) represents the actual liquid cash deposited into the company bank account.",
    citation: "Cash Flow Statement (Direct Method) vs Profit & Loss Statement Reconciliation",
    rule: "A company with booming accounting profit but negative Free Cash Flow is burning cash."
  },
  {
    keywords: ['brokerage', 'zero brokerage', 'pfof', 'free trading', 'groww', 'zerodha', 'angel'],
    title: "Demat & Broker Comparisons: The Hidden Slippage & Charges Reality",
    verdictLabel: "EXECUTION & FEE AUDIT",
    verdictType: "hazard",
    answer: "Discount brokers advertising '0% brokerage' often capture revenue through payment for order flow, auto-square-off charges (₹50+GST per order), high depository participant (DP) debits, and execution spread slippage. In fast-moving markets, a 0.1% slippage costs far more than a flat ₹20 brokerage fee.",
    citation: "Exchange Order Routing and Best Execution Audit Disclosures",
    rule: "Execution fill quality and order latency matter far more than ₹0 brokerage headlines."
  }
];

function getDebunkyFallback(userText) {
  const query = userText.toLowerCase().trim();
  for (const item of DEBUNKY_KB) {
    if (item.keywords.some(k => query.includes(k))) {
      return item;
    }
  }

  return {
    title: `Forensic Inquiry: "${userText.slice(0, 42)}"`,
    verdictLabel: "STATUTORY FORENSIC FILTER",
    verdictType: "dilution",
    answer: `To audit any Indian stock or financial recommendation, execute this 4-step statutory filter before deploying capital:\n\n` +
      `1. **Cash Flow Verification:** Verify that Free Cash Flow (CFO - Capex) is positive over a 3–5 year cycle, rather than relying on accounting EBITDA.\n` +
      `2. **Promoter Pledging:** Confirm that promoter pledge levels remain strictly below 15% to avoid forced margin liquidation.\n` +
      `3. **Valuation Reality:** Evaluate Enterprise Value / Free Cash Flow (EV/FCF) rather than deceptive headline P/E ratios.\n` +
      `4. **Insider Incentives:** Check exchange block deals to verify whether promoters are accumulating equity or secretly offloading stakes via OFS.`,
    citation: "Statutory Filing Framework: SEBI LODR Regulations & Exchange Disclosures",
    rule: "Never buy based on social media conviction. Verify statutory filings directly on BSE/NSE."
  };
}

/**
 * Call Gemma 4-26B model via Google Generative Language API
 */
async function callGemmaForensics(queryText, useWebSearch) {
  const url = `${GEMMA_CONFIG.endpoint}?key=${GEMMA_CONFIG.apiKey}`;

  const systemInstruction = 
    `You are Debunky, the autonomous financial forensics and statutory audit AI agent for Market Debunk (NELANDAR Inc.®), founded by Arunachalam Venkatachalapathy.\n` +
    `Your mission: Audit Indian share market tips, viral finfluencer reels, stock valuations, trading psychology (FOMO, revenge trading), candlestick patterns (Hammer, Doji), and corporate disclosures against SEBI regulations (LODR, SAST, PIT), MCA-21 filings, and audited Free Cash Flow ledgers.\n` +
    `Tone: Uncompromising, sharp, data-driven, objective. Content is strictly for educational & informational purposes (NOT SEBI-registered financial advice).\n\n` +
    `Format your response using these exact section headers:\n` +
    `### VERDICT: [Sharp Verdict Title in UPPERCASE]\n` +
    `**Verdict Category:** [HAZARD or DILUTION or VERIFIED]\n` +
    `**Statutory Citation:** [Relevant SEBI LODR Regulation, Section of Companies Act 2013, or Exchange standard]\n\n` +
    `**Forensic Investigation:**\n[2-3 concise paragraphs analyzing the claim with data, cash flow reality, or trading psychology. Use **bolding** for critical metrics.]\n\n` +
    `**Forensic Directive:**\n[One memorable, actionable takeaway rule for retail investors.]`;

  const payload = {
    contents: [
      {
        parts: [
          {
            text: `${systemInstruction}\n\nUSER QUERY TO AUDIT: ${queryText}`
          }
        ]
      }
    ]
  };

  if (useWebSearch) {
    payload.tools = [{ googleSearch: {} }];
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Gemma API HTTP ${response.status}`);
  }

  const data = await response.json();
  const candidate = data.candidates && data.candidates[0];
  if (!candidate || !candidate.content) {
    throw new Error("No candidate returned from Gemma");
  }

  // Filter out internal reasoning parts
  let mainText = "";
  if (candidate.content.parts) {
    const textParts = candidate.content.parts.filter(p => !p.thought && p.text);
    mainText = textParts.map(p => p.text).join("\n\n").trim();
    if (!mainText) {
      mainText = candidate.content.parts.map(p => p.text || '').join("\n\n").trim();
    }
  }

  // Extract grounding sources
  let sources = [];
  if (candidate.groundingMetadata && candidate.groundingMetadata.groundingChunks) {
    sources = candidate.groundingMetadata.groundingChunks
      .map(chunk => chunk.web)
      .filter(Boolean)
      .filter((s, idx, arr) => arr.findIndex(x => x.uri === s.uri) === idx)
      .slice(0, 5);
  }

  return parseGemmaResponse(mainText, sources, useWebSearch);
}

function parseGemmaResponse(text, sources, isWebSearch) {
  let title = "Forensic Investigation Report";
  let verdictLabel = isWebSearch ? "LIVE AUDIT // WEB GROUNDED" : "GEMMA 4-26B AUDIT";
  let verdictType = "hazard";
  let citation = "SEBI (LODR) Regulations & BSE/NSE Disclosures";
  let rule = "Cross-reference all claims against audited balance sheets before taking risk.";
  let answerBody = text;

  // Extract title/verdict
  const verdictMatch = text.match(/###\s*VERDICT:\s*(.+)/i);
  if (verdictMatch) {
    verdictLabel = verdictMatch[1].trim();
  }

  const catMatch = text.match(/\*\*Verdict Category:\*\*\s*(.+)/i);
  if (catMatch) {
    const cat = catMatch[1].toLowerCase();
    if (cat.includes('dilution')) verdictType = 'dilution';
    else if (cat.includes('verified')) verdictType = 'verified';
    else verdictType = 'hazard';
  }

  const citMatch = text.match(/\*\*Statutory Citation:\*\*\s*(.+)/i);
  if (citMatch) {
    citation = citMatch[1].trim();
  }

  const ruleMatch = text.match(/\*\*Forensic Directive:\*\*\s*([\s\S]+?)$/i);
  if (ruleMatch) {
    rule = ruleMatch[1].trim();
  }

  const findingMatch = text.match(/\*\*Forensic Investigation:\*\*([\s\S]+?)(?=\*\*Forensic Directive:|$)/i);
  if (findingMatch) {
    answerBody = findingMatch[1].trim();
  } else {
    // Clean up raw markdown if headers aren't strict
    answerBody = text
      .replace(/###\s*VERDICT:.*?(\n|$)/gi, '')
      .replace(/\*\*Verdict Category:\*\*.*?(\n|$)/gi, '')
      .replace(/\*\*Statutory Citation:\*\*.*?(\n|$)/gi, '')
      .replace(/\*\*Forensic Directive:\*\*.*?(\n|$)/gi, '')
      .trim();
  }

  return {
    title: title,
    verdictLabel: verdictLabel,
    verdictType: verdictType,
    answer: answerBody || text,
    citation: citation,
    rule: rule,
    sources: sources,
    isWebSearch: isWebSearch
  };
}

let totalAuditsCount = 0;

function initDebunkyChat() {
  const chatWindow = document.getElementById('debunky-chat-stream');
  const inputEl = document.getElementById('debunky-query-input');
  const formEl = document.getElementById('debunky-form');
  if (!chatWindow || !formEl) return;

  function appendMessage(role, contentObj) {
    if (role === 'user') {
      const userDiv = document.createElement('div');
      userDiv.className = 'debunky-user-query';
      userDiv.innerHTML = `
        <span class="query-prefix">&gt; INTAKE:</span>
        <span>${escapeHtml(contentObj.text)}</span>
      `;
      chatWindow.appendChild(userDiv);
      chatWindow.scrollTop = chatWindow.scrollHeight;
      return;
    }

    // Bot Case Record
    const caseHash = Math.random().toString(36).substring(2, 6).toUpperCase();
    const caseDiv = document.createElement('div');
    caseDiv.className = 'debunky-case-record';

    let verdictClass = 'case-verdict-hazard';
    if (contentObj.verdictType === 'dilution') verdictClass = 'case-verdict-dilution';
    if (contentObj.verdictType === 'verified') verdictClass = 'case-verdict-hazard';

    let sourcesHtml = '';
    if (contentObj.sources && contentObj.sources.length > 0) {
      sourcesHtml = `
        <div class="case-sources-row">
          <span class="case-sources-label">VERIFIED LIVE WEB SOURCES:</span>
          <div class="case-sources-list">
            ${contentObj.sources.map(s => `
              <a href="${s.uri}" target="_blank" rel="noopener noreferrer" class="source-link-pill">
                <span>🌐 ${escapeHtml(s.title || 'Source')}</span>
                <span>↗</span>
              </a>
            `).join('')}
          </div>
        </div>
      `;
    }

    caseDiv.innerHTML = `
      <div class="case-meta-header">
        <div class="case-meta-left">
          <span class="atlas-pulse-dot"></span>
          <span class="case-ref-tag">CASE-REF #MD-2026-${caseHash}</span>
          <span>// ${contentObj.isWebSearch ? 'GEMMA 4-26B + LIVE WEB' : 'GEMMA 4-26B FORENSIC DESK'}</span>
        </div>
        <div>
          <span class="font-mono" style="font-size: 0.65rem; color: var(--green-dark); font-weight: 700;">
            AUDIT #${totalAuditsCount} // UNLIMITED ACCESS
          </span>
        </div>
      </div>

      <div class="case-body">
        <div class="case-title">
          <span>${contentObj.title || 'Forensic Investigation'}</span>
          <span class="case-verdict-banner ${verdictClass}">
            ${contentObj.verdictLabel || 'AUDIT COMPLETE'}
          </span>
        </div>

        <div class="case-finding-text">
          ${formatBodyMarkdown(contentObj.answer)}
        </div>

        <div class="case-citation-row">
          <span class="case-citation-label">STATUTORY CITATION:</span>
          <span>${contentObj.citation || 'SEBI LODR Disclosures'}</span>
        </div>

        <div class="case-rule-row">
          <span class="case-rule-label">FORENSIC DIRECTIVE:</span>
          <span>${contentObj.rule || 'Verify on BSE/NSE before committing capital.'}</span>
        </div>

        ${sourcesHtml}
      </div>
    `;

    chatWindow.appendChild(caseDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  function formatBodyMarkdown(text) {
    if (!text) return '';
    return text
      .split('\n\n')
      .map(p => {
        let formatted = p
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/^\*\s*(.*)/gm, '• $1')
          .replace(/^###\s*(.*)/gm, '<strong style="color: var(--ink-primary); font-size: 0.92rem; display: block; margin-top: 8px;">$1</strong>');
        return `<p style="margin-bottom: 8px;">${formatted}</p>`;
      })
      .join('');
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  async function handleQuery(text) {
    if (!text || !text.trim()) return;
    const cleanText = text.trim();

    totalAuditsCount++;
    appendMessage('user', { text: cleanText });
    if (inputEl) inputEl.value = '';

    // Typing / Audit Progress indicator
    const typingDiv = document.createElement('div');
    typingDiv.className = 'debunky-typing-indicator';
    typingDiv.id = 'debunky-typing-temp';
    typingDiv.innerHTML = `
      <span class="atlas-pulse-dot"></span>
      <span class="font-mono" style="font-size: 0.72rem; color: var(--ink-secondary); margin-right: 6px; font-weight: 700;">
        ${isWebSearchActive ? 'GEMMA 4-26B: GROUNDING VIA LIVE WEB SEARCH...' : 'GEMMA 4-26B: INTERROGATING STATUTORY LEDGER...'}
      </span>
      <span class="debunky-typing-dot"></span>
      <span class="debunky-typing-dot"></span>
      <span class="debunky-typing-dot"></span>
    `;
    chatWindow.appendChild(typingDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    try {
      // Execute live Gemma 4-26B call with web search grounding
      const response = await callGemmaForensics(cleanText, isWebSearchActive);
      typingDiv.remove();
      appendMessage('bot', response);
    } catch (err) {
      console.warn("Gemma API fallback activated:", err);
      typingDiv.remove();
      // Graceful offline/local knowledge fallback
      const fallback = getDebunkyFallback(cleanText);
      appendMessage('bot', fallback);
    }
  }

  formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    if (inputEl) handleQuery(inputEl.value);
  });

  window.askDebunkyPrompt = function(promptText) {
    handleQuery(promptText);
  };

  window.clearDebunkyChat = function() {
    chatWindow.innerHTML = `
      <div class="debunky-case-record">
        <div class="case-meta-header">
          <div class="case-meta-left">
            <span class="atlas-pulse-dot"></span>
            <span class="case-ref-tag">SYSTEM // FORENSIC TERMINAL READY</span>
            <span>// GEMMA 4-26B + LIVE WEB GROUNDING</span>
          </div>
          <div>
            <span class="font-mono" style="font-size: 0.65rem; color: var(--green-dark); font-weight: 700;">AUDITS: UNLIMITED</span>
          </div>
        </div>
        <div class="case-body">
          <div class="case-title">
            <span>Market Debunk Forensic Intake Console</span>
            <span class="case-verdict-banner case-verdict-hazard" style="background: rgba(0, 229, 153, 0.1); color: var(--green-dark); border-color: rgba(0, 229, 153, 0.3);">
              OPERATIONAL
            </span>
          </div>
          <p class="case-finding-text">
            Audit any Indian share market tip, viral finfluencer recommendation, high-dividend scheme, or balance sheet anomaly with Gemma 4-26B AI and live web grounding.
          </p>
          <div class="case-citation-row">
            <span class="case-citation-label">AUDIT PROTOCOL:</span>
            <span>Live Web Search Grounding + BSE/NSE statutory filings &amp; cash flow ledgers.</span>
          </div>
        </div>
      </div>
    `;
  };
}

/**
 * Web Search Toggle Controller
 */
window.handleWebSearchToggle = function(isChecked) {
  isWebSearchActive = Boolean(isChecked);
  const switchInput = document.getElementById('websearch-toggle-switch');
  const statusIndicator = document.getElementById('websearch-status-indicator');

  if (switchInput) switchInput.checked = isWebSearchActive;

  if (statusIndicator) {
    if (isWebSearchActive) {
      statusIndicator.textContent = 'ACTIVE';
      statusIndicator.className = 'websearch-status-tag active';
    } else {
      statusIndicator.textContent = 'OFF';
      statusIndicator.className = 'websearch-status-tag';
    }
  }
};

window.toggleWebSearch = function() {
  window.handleWebSearchToggle(!isWebSearchActive);
};

/**
 * Voice Typing (SpeechRecognition) Controller
 */
window.toggleVoiceTyping = function() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const micBtn = document.getElementById('btn-voice-typing');
  const micLabel = document.getElementById('voice-typing-label');
  const inputEl = document.getElementById('debunky-query-input');

  if (!SpeechRecognition) {
    alert("Voice typing is not supported in this browser. Please use Chrome, Edge, or Safari.");
    return;
  }

  if (isVoiceRecording && speechRecognitionInstance) {
    speechRecognitionInstance.stop();
    return;
  }

  try {
    speechRecognitionInstance = new SpeechRecognition();
    speechRecognitionInstance.lang = 'en-IN';
    speechRecognitionInstance.continuous = false;
    speechRecognitionInstance.interimResults = false;

    speechRecognitionInstance.onstart = function() {
      isVoiceRecording = true;
      if (micBtn) micBtn.classList.add('recording');
      if (micLabel) micLabel.textContent = 'Listening...';
      if (inputEl) inputEl.placeholder = 'Listening... Speak your stock tip or query now...';
    };

    speechRecognitionInstance.onresult = function(event) {
      const transcript = event.results[0][0].transcript;
      if (inputEl) {
        inputEl.value = transcript;
        inputEl.focus();
      }
    };

    speechRecognitionInstance.onerror = function(event) {
      console.warn("Speech recognition error:", event.error);
      resetVoiceUI();
    };

    speechRecognitionInstance.onend = function() {
      resetVoiceUI();
    };

    speechRecognitionInstance.start();
  } catch (err) {
    console.error("Voice typing start failed:", err);
    resetVoiceUI();
  }

  function resetVoiceUI() {
    isVoiceRecording = false;
    if (micBtn) micBtn.classList.remove('recording');
    if (micLabel) micLabel.textContent = 'Voice';
    if (inputEl) inputEl.placeholder = 'Ask anything or audit any stock tip with Gemma 4-26B + Live Web Search...';
  }
};

/**
 * Rapper Floating AI Agent Click Navigation
 */
window.scrollToDebunkyTerminal = function(e) {
  if (e) e.preventDefault();
  const terminal = document.getElementById('debunky');
  const inputEl = document.getElementById('debunky-query-input');

  if (terminal) {
    terminal.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  setTimeout(() => {
    if (inputEl) {
      inputEl.focus();
      inputEl.classList.add('glow-pulse');
      setTimeout(() => inputEl.classList.remove('glow-pulse'), 1200);
    }
  }, 400);

  // Play subtle chime if Web Audio API available
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.25);
  } catch (err) {}
};

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initDebunkyChat);
}

