/**
 * Debunky — AI Financial Forensics & Share Market Query Engine
 * Powered by Market Debunk Tamil
 */

const DEBUNKY_KB = [
  {
    keywords: ['dividend', 'reit', 'invit', 'safe yield', 'high yield', 'yield'],
    title: "12% Safe Dividend Yield on Public REITs / InvITs",
    answer: "The headline 10-12% payout is an accounting illusion. In public REITs and InvITs, over 65% of the gross payout is classified as 'Return of Capital' (ROC). The trust is returning your own capital back to you while your Net Asset Value (NAV) steadily erodes. You are being taxed on a phantom return.",
    citation: "Quarterly Distribution Statement, Section 4.2: 'Return of Capital vs Dividend Distribution'",
    rule: "Always deduct Return of Capital from the gross distribution before calculating true yield."
  },
  {
    keywords: ['algo', 'bot', 'telegram', 'win rate', 'tips', 'f&o', 'options', 'intraday'],
    title: "90% Win-Rate Algo Trading Bots & Telegram Tip Channels",
    answer: "High-win-rate strategies collect small pennies while taking unbounded left-tail gap risk. A single overnight gap-down erases 6 months of small daily profits. According to SEBI's official study, 93% of active retail derivative traders lose money, suffering average losses exceeding ₹1.25 Lakhs each plus massive turnover charges.",
    citation: "SEBI Study on Retail Participation in Derivatives: 93% Loss Rate",
    rule: "If an algorithm had a consistent 90% edge, the creator would trade proprietary capital, not sell a ₹999 Telegram subscription."
  },
  {
    keywords: ['buy the dip', 'dip', 'average down', 'averaging', 'falling stock'],
    title: "Why 'Buy The Dip' Destroys Portfolios on Legacy Stocks",
    answer: "Stocks rarely plunge 30-50% without deteriorating underlying business fundamentals. Retail traders average down on 'cheap' P/E multiples of zombie companies whose Operating Cash Flow (CFO) has turned negative. Averaging down on declining cashflows transforms a temporary correction into permanent capital destruction.",
    citation: "Historical 10-K & Annual Report Operating Cashflow vs Net Debt Maturities",
    rule: "Never average down unless Free Cash Flow yield is expanding, not deteriorating."
  },
  {
    keywords: ['pre-ipo', 'pre ipo', 'unlisted', 'ofs', 'ipo', 'promoter dump'],
    title: "Pre-IPO 100x Growth Stories & Offer For Sale (OFS) Traps",
    answer: "Unlisted shares are frequently peddled by early VCs and promoters offloading private equity stakes before public exchange disclosure scrutiny. In many recent IPOs, over 85% of the issue size was Offer For Sale (OFS)—meaning ₹0 goes into company expansion and 100% goes into the pockets of exiting insiders.",
    citation: "SEBI DRHP Red Herring Prospectus: 'Capital Structure & Offer For Sale Breakup'",
    rule: "If the OFS exceeds 70% of the total issue, retail buyers are strictly serving as exit liquidity."
  },
  {
    keywords: ['tata motors', 'tata', 'ev', 'jlr', 'automotive'],
    title: "Tata Motors: Consolidated Debt vs EV Transition Cycle",
    answer: "When analyzing Tata Motors, never look only at standalone domestic sales. The consolidated balance sheet has historically carried Jaguar Land Rover (JLR) debt and major EV capex commitments. While commercial vehicles provide steady cashflow in upcycles, automotive capex cycles require constant free cash flow monitoring against global luxury demand.",
    citation: "Consolidated Annual Free Cash Flow & Automotive Net Debt Statements",
    rule: "Track consolidated Free Cash Flow (FCF) rather than standalone EBITDA margins."
  },
  {
    keywords: ['pledge', 'promoter pledge', 'promoter holding', 'margin call'],
    title: "Promoter Share Pledging: The Hidden Liquidation Trigger",
    answer: "When company founders pledge their shareholding as collateral for debt, any market drop can breach maintenance margins. Lenders then invoke the pledge and dump shares directly on the open market, triggering lower circuits where retail investors cannot exit.",
    citation: "BSE/NSE Shareholding Pattern Disclosures: 'Pledged Shares by Promoters'",
    rule: "Avoid any company where promoter share pledging exceeds 20% of their total stake."
  },
  {
    keywords: ['p/e', 'pe ratio', 'free cash flow', 'profit', 'accounting', 'ebitda'],
    title: "Accounting Net Profit vs Free Cash Flow (FCF)",
    answer: "P/E ratio uses 'Net Profit', which can be artificially manipulated by capitalizing expenses, extending depreciation schedules, or recognizing uncollected revenues under Trade Receivables. Free Cash Flow (Operating Cash Flow minus Capex) represents the actual cash deposited into the company bank account.",
    citation: "Cash Flow Statement (Direct Method) vs Profit & Loss Statement",
    rule: "A company with booming accounting profit but negative Free Cash Flow is bleeding to death."
  },
  {
    keywords: ['brokerage', 'zero brokerage', 'pfof', 'free trading'],
    title: "0% Brokerage: How Payment For Order Flow & Slippage Works",
    answer: "When a trading platform charges zero commission, your market orders are routed to high-frequency trading (HFT) internalizers or executed at wider bid-ask spreads. The retail trader loses 10x to 20x more in adverse price execution slippage than they 'saved' in flat brokerage.",
    citation: "Exchange Order Routing and Best Execution Audit Records",
    rule: "Execution price quality and fill latency matter far more than ₹0 brokerage headlines."
  }
];

function getDebunkyResponse(userText) {
  const query = userText.toLowerCase().trim();

  // Match keyword in database
  for (const item of DEBUNKY_KB) {
    if (item.keywords.some(k => query.includes(k))) {
      return item;
    }
  }

  // Fallback intelligent forensic framework
  return {
    title: `Forensic Checklist: "${userText.slice(0, 45)}"`,
    answer: `To audit any Indian stock or financial recommendation, always run this 4-step forensic filter before deploying capital:\n\n` +
      `1. **Cash Flow Check:** Is Free Cash Flow (CFO - Capex) positive over the last 3-5 years, or is the company borrowing to survive?\n` +
      `2. **Promoter Quality:** Is promoter pledging under 15%, or are founders using their shares as loan collateral?\n` +
      `3. **Valuation Reality:** Compare Enterprise Value / Free Cash Flow (EV/FCF) rather than relying on deceptive headline P/E ratios.\n` +
      `4. **Insider Incentives:** Are insiders and private equity funds buying more shares or secretly offloading via OFS and block deals?`,
    citation: "Statutory Filing Framework: SEBI LODR Regulations & Exchange Disclosures",
    rule: "Never buy based on social media conviction. Verify every claim directly in exchange filings on BSE/NSE."
  };
}

const MAX_FREE_QUERIES = 4;

function initDebunkyChat() {
  const chatWindow = document.getElementById('debunky-chat-stream');
  const inputEl = document.getElementById('debunky-query-input');
  const formEl = document.getElementById('debunky-form');
  if (!chatWindow || !formEl) return;

  // Retrieve existing query count from sessionStorage
  let queryCount = parseInt(sessionStorage.getItem('debunky_query_count') || '0', 10);

  function checkAndApplyLockState() {
    if (queryCount >= MAX_FREE_QUERIES) {
      if (inputEl) {
        inputEl.placeholder = "⚠️ Free audit limit reached (4/4). Upgrade to AI Plan for unlimited defense.";
        inputEl.disabled = true;
        inputEl.style.opacity = "0.7";
        inputEl.style.cursor = "not-allowed";
        inputEl.style.borderColor = "#EF4444";
      }
      const submitBtn = formEl.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.className = "btn-pill btn-pill-red";
        submitBtn.style.background = "#DC2626";
        submitBtn.style.color = "#FFFFFF";
        submitBtn.style.borderColor = "#B91C1C";
        submitBtn.innerHTML = `<span>Unlock AI Plan</span> <span>✦</span>`;
        submitBtn.onclick = function(e) {
          e.preventDefault();
          window.location.hash = 'products';
          const productsSec = document.getElementById('products');
          if (productsSec) productsSec.scrollIntoView({ behavior: 'smooth' });
        };
      }
    }
  }

  function appendScareCard() {
    // Check if scare card is already appended
    if (document.getElementById('debunky-scare-alert-box')) return;

    const scareDiv = document.createElement('div');
    scareDiv.id = 'debunky-scare-alert-box';
    scareDiv.className = 'debunky-scare-card';
    scareDiv.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">
        <div class="scare-pulse-badge">
          <span class="scare-pulse-dot"></span>
          <span>⚠️ CRITICAL FORENSIC LIMIT REACHED // CAPITAL AT SEVERE RISK</span>
        </div>
        <span style="font-family: var(--font-mono); font-size: 0.72rem; font-weight: 800; color: #DC2626; background: rgba(239, 68, 68, 0.1); padding: 4px 10px; border-radius: 6px; border: 1px solid rgba(239, 68, 68, 0.25);">
          4/4 FREE AUDITS EXHAUSTED
        </span>
      </div>

      <h3 class="scare-headline">
        🛑 STOP! 93% of Retail Traders Get Wiped Out Trading Blind.
      </h3>

      <p class="scare-body">
        You have exhausted all <strong>4 complimentary forensic audits</strong>. You are now entering the live market <strong>completely unprotected</strong> against institutional order-book traps, operator pumps, and toxic balance-sheet debt.
      </p>

      <!-- Shock Stats -->
      <div class="scare-stats-grid">
        <div class="scare-stat-box">
          <span class="scare-stat-num">93%</span>
          <span class="scare-stat-lbl">SEBI Retail Loss Rate</span>
        </div>
        <div class="scare-stat-box">
          <span class="scare-stat-num">₹1.25L+</span>
          <span class="scare-stat-lbl">Avg Capital Destroyed</span>
        </div>
        <div class="scare-stat-box">
          <span class="scare-stat-num">&lt; 15 Mins</span>
          <span class="scare-stat-lbl">To Account Liquidation</span>
        </div>
      </div>

      <div class="scare-quote-box">
        <strong>"One unhedged trade on bad advice can erase 6 months of hard-earned salary in 15 minutes."</strong><br>
        Don't serve as exit liquidity for corporate insiders and manipulative cartels. Equip your Demat account with automated institutional defense.
      </div>

      <div class="scare-actions">
        <a href="#products" class="btn-pill scare-btn-primary" onclick="highlightProductCard('ai-agents-trading')">
          <span>🛡️ Activate AI Agents for Trading — ₹999/mo</span>
          <span>↗</span>
        </a>
        <a href="#products" class="btn-pill scare-btn-secondary" onclick="highlightProductCard('agentic-ai-workflow')">
          <span>⚡ Acquire Agentic AI Workflow Blueprint — ₹499</span>
          <span>↗</span>
        </a>
      </div>

      <div class="scare-footer-reassurance">
        <span>✦ Multi-agent quantitative risk bounds</span>
        <span>✦ Zero emotional bias</span>
        <span>✦ Real-time liquidity sweeps</span>
        <a href="javascript:void(0)" onclick="resetDebunkyLimit()" style="color: #991B1B; margin-left: auto; text-decoration: underline; font-size: 0.68rem;">[Reset Free Audits (Dev)]</a>
      </div>
    `;

    chatWindow.appendChild(scareDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  function appendMessage(role, contentObj, currentCount) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `debunky-message ${role}`;

    if (role === 'bot') {
      const isFinal = currentCount >= MAX_FREE_QUERIES;
      const countTag = currentCount
        ? `<span class="debunky-audit-counter-badge ${isFinal ? 'final' : ''}">AUDIT ${currentCount} OF ${MAX_FREE_QUERIES} USED ${isFinal ? '(FINAL FREE QUERY)' : ''}</span>`
        : '';

      msgDiv.innerHTML = `
        <div class="debunky-msg-avatar">
          <img src="assets/img/channel_logo.png" alt="Debunky">
        </div>
        <div class="debunky-msg-bubble">
          ${countTag}
          <strong style="color: var(--green-dark); font-size: 0.95rem; display: block; margin-bottom: 6px;">
            ${contentObj.title || 'Debunky Forensic Audit'}
          </strong>
          <p style="margin: 0; white-space: pre-line;">${contentObj.answer}</p>
          <div class="debunky-forensic-box">
            <span class="debunky-forensic-citation">CITATION: ${contentObj.citation}</span>
            <span class="debunky-forensic-rule">RULE: ${contentObj.rule}</span>
          </div>
        </div>
      `;
    } else {
      msgDiv.innerHTML = `
        <div class="debunky-msg-bubble">
          ${contentObj.text}
        </div>
      `;
    }

    chatWindow.appendChild(msgDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  function handleQuery(text) {
    if (!text || !text.trim()) return;
    const cleanText = text.trim();

    // Check if limit already reached
    if (queryCount >= MAX_FREE_QUERIES) {
      chatWindow.classList.add('debunky-shake-alert');
      setTimeout(() => chatWindow.classList.remove('debunky-shake-alert'), 400);
      appendScareCard();
      const scareEl = document.getElementById('debunky-scare-alert-box');
      if (scareEl) scareEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Increment count
    queryCount++;
    sessionStorage.setItem('debunky_query_count', queryCount);

    // Append user message
    appendMessage('user', { text: cleanText });
    if (inputEl) inputEl.value = '';

    // Show typing indicator
    const typingDiv = document.createElement('div');
    typingDiv.className = 'debunky-message bot';
    typingDiv.id = 'debunky-typing-temp';
    typingDiv.innerHTML = `
      <div class="debunky-msg-avatar">
        <img src="assets/img/channel_logo.png" alt="Debunky">
      </div>
      <div class="debunky-typing-indicator">
        <span class="debunky-typing-dot"></span>
        <span class="debunky-typing-dot"></span>
        <span class="debunky-typing-dot"></span>
      </div>
    `;
    chatWindow.appendChild(typingDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    // Simulate forensic thinking delay
    setTimeout(() => {
      typingDiv.remove();
      const response = getDebunkyResponse(cleanText);
      appendMessage('bot', response, queryCount);

      // Check if 4th query just completed
      if (queryCount >= MAX_FREE_QUERIES) {
        checkAndApplyLockState();
        setTimeout(() => {
          appendScareCard();
        }, 600);
      }
    }, 450);
  }

  formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    if (queryCount >= MAX_FREE_QUERIES) {
      window.location.hash = 'products';
      const productsSec = document.getElementById('products');
      if (productsSec) productsSec.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (inputEl) handleQuery(inputEl.value);
  });

  // Global trigger for prompt chips
  window.askDebunkyPrompt = function(promptText) {
    if (queryCount >= MAX_FREE_QUERIES) {
      handleQuery(promptText); // will trigger shake and scroll to scare card
      return;
    }
    handleQuery(promptText);
  };

  window.resetDebunkyLimit = function() {
    sessionStorage.removeItem('debunky_query_count');
    queryCount = 0;
    if (inputEl) {
      inputEl.disabled = false;
      inputEl.placeholder = "Ask Debunky any share market query or paste a viral claim...";
      inputEl.style.opacity = "1";
      inputEl.style.cursor = "text";
      inputEl.style.borderColor = "var(--border-light)";
    }
    const submitBtn = formEl.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.className = "btn-pill btn-pill-green";
      submitBtn.style.background = "";
      submitBtn.style.color = "";
      submitBtn.style.borderColor = "";
      submitBtn.innerHTML = `<span>Audit Claim</span> <span>→</span>`;
      submitBtn.onclick = null;
    }
    const scareBox = document.getElementById('debunky-scare-alert-box');
    if (scareBox) scareBox.remove();
    alert("Complimentary audits reset to 0/4. You have 4 fresh free audits.");
  };

  window.highlightProductCard = function(productId) {
    window.location.hash = 'products';
    const productsSec = document.getElementById('products');
    if (productsSec) productsSec.scrollIntoView({ behavior: 'smooth' });
  };

  window.clearDebunkyChat = function() {
    chatWindow.innerHTML = `
      <div class="debunky-message bot">
        <div class="debunky-msg-avatar">
          <img src="assets/img/channel_logo.png" alt="Debunky">
        </div>
        <div class="debunky-msg-bubble">
          <strong style="color: var(--green-dark); font-size: 0.95rem; display: block; margin-bottom: 4px;">
            வணக்கம் & Welcome to Market Debunk Tamil!
          </strong>
          <p style="margin: 0;">
            I am <strong>Debunky</strong>, your AI financial forensics assistant. Ask me about any share market query, viral stock tip, high dividend pitch, SEBI regulation, or corporate balance sheet red flag.
          </p>
        </div>
      </div>
    `;
    if (queryCount >= MAX_FREE_QUERIES) {
      appendScareCard();
    }
  };

  // Check state on load
  checkAndApplyLockState();
  if (queryCount >= MAX_FREE_QUERIES) {
    appendScareCard();
  }
}

document.addEventListener('DOMContentLoaded', initDebunkyChat);
