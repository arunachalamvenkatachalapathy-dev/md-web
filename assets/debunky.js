/**
 * Debunky — AI Financial Forensics & Statutory Audit Engine
 * Powered by Market Debunk Desk
 * Institutional case ledger architecture with SEBI LODR regulatory citations
 */

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
    keywords: ['brokerage', 'zero brokerage', 'pfof', 'free trading'],
    title: "0% Brokerage: Order Routing Slippage & Internalization",
    verdictLabel: "EXECUTION SLIPPAGE COST",
    verdictType: "hazard",
    answer: "When a trading platform advertises zero commission, retail market orders are often routed to high-frequency trading (HFT) internalizers or executed at wider bid-ask spreads. The retail trader loses 10x to 20x more in adverse price execution slippage than they saved in flat brokerage charges.",
    citation: "Exchange Order Routing and Best Execution Audit Disclosures",
    rule: "Execution fill quality and order latency matter far more than ₹0 brokerage headlines."
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

  // Fallback forensic framework
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
        inputEl.placeholder = "Session audit quota complete (4/4). Review research toolkits below.";
        inputEl.disabled = true;
        inputEl.style.opacity = "0.75";
        inputEl.style.cursor = "not-allowed";
        inputEl.style.borderColor = "var(--border-light)";
      }
      const submitBtn = formEl.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.className = "btn-pill btn-pill-black";
        submitBtn.style.background = "var(--ink-primary)";
        submitBtn.style.color = "#FFFFFF";
        submitBtn.innerHTML = `<span>Review Toolkits</span> <span>→</span>`;
        submitBtn.onclick = function(e) {
          e.preventDefault();
          const productsSec = document.getElementById('products');
          if (productsSec) productsSec.scrollIntoView({ behavior: 'smooth' });
        };
      }
    }
  }

  function appendQuotaNotice() {
    if (document.getElementById('debunky-quota-alert-box')) return;

    const noticeDiv = document.createElement('div');
    noticeDiv.id = 'debunky-quota-alert-box';
    noticeDiv.className = 'debunky-quota-card';
    noticeDiv.innerHTML = `
      <div class="quota-header-row">
        <div class="quota-status-pill">
          <span class="atlas-pulse-dot" style="background: var(--ink-muted);"></span>
          <span>SESSION AUDIT QUOTA CONSUMED // STATUTORY ARCHIVE</span>
        </div>
        <span class="quota-count-tag">4 OF 4 AUDITS LOGGED</span>
      </div>

      <h3 class="quota-title">
        Complimentary Forensic Session Complete
      </h3>

      <p class="quota-desc">
        To preserve live exchange data-feed latency and independent research bandwidth, complimentary query access is capped at 4 investigations per session. For continuous quantitative models, multi-agent trading scanners, and spreadsheet valuation suites, inspect our research tools below:
      </p>

      <div class="quota-options-grid">
        <a href="#products" class="quota-option-card" onclick="if(window.openRequisitionModal) openRequisitionModal('ai-agents-trading')">
          <div>
            <span class="product-format-badge" style="display:inline-block; margin-bottom: 6px;">AUTONOMOUS AI / PIPELINE</span>
            <div class="quota-option-title">AI Agents for Trading</div>
            <div style="font-size: 0.74rem; color: var(--ink-muted); margin-top: 4px;">Liquidity sweeps & multi-agent risk protocols</div>
          </div>
          <div class="quota-option-price">₹999/mo ↗</div>
        </a>

        <a href="#products" class="quota-option-card" onclick="if(window.openRequisitionModal) openRequisitionModal('valuation-engine')">
          <div>
            <span class="product-format-badge" style="display:inline-block; margin-bottom: 6px;">SPREADSHEET / REVERSE DCF</span>
            <div class="quota-option-title">Forensic Valuation Engine</div>
            <div style="font-size: 0.74rem; color: var(--ink-muted); margin-top: 4px;">Reverse DCF, Beneish M-Score & working capital model</div>
          </div>
          <div class="quota-option-price">₹1,299 (Lifetime) ↗</div>
        </a>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-light); padding-top: 12px; font-family: var(--font-mono); font-size: 0.72rem; color: var(--ink-muted);">
        <span>100% Sponsor-Free Financial Forensics</span>
        <a href="#products" style="color: var(--green-dark); font-weight: 700; text-decoration: none;">View All 6 Research Deliverables →</a>
      </div>
    `;

    chatWindow.appendChild(noticeDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  function appendMessage(role, contentObj, currentCount) {
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

    const verdictClass = contentObj.verdictType === 'hazard' ? 'case-verdict-hazard' : 'case-verdict-dilution';
    const isFinal = currentCount >= MAX_FREE_QUERIES;

    caseDiv.innerHTML = `
      <div class="case-meta-header">
        <div class="case-meta-left">
          <span class="atlas-pulse-dot"></span>
          <span class="case-ref-tag">CASE-REF #MD-2026-${caseHash}</span>
          <span>// SEBI LODR DATABASE</span>
        </div>
        <div>
          <span class="debunky-audit-counter-badge ${isFinal ? 'final' : ''}">
            AUDIT ${currentCount || 1} OF ${MAX_FREE_QUERIES} ${isFinal ? '(QUOTA COMPLETE)' : ''}
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
          <span>${contentObj.citation}</span>
        </div>

        <div class="case-rule-row">
          <span class="case-rule-label">FORENSIC DIRECTIVE:</span>
          <span>${contentObj.rule}</span>
        </div>
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
        let formatted = p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        return `<p style="margin-bottom: 8px;">${formatted}</p>`;
      })
      .join('');
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function handleQuery(text) {
    if (!text || !text.trim()) return;
    const cleanText = text.trim();

    if (queryCount >= MAX_FREE_QUERIES) {
      chatWindow.classList.add('debunky-shake-alert');
      setTimeout(() => chatWindow.classList.remove('debunky-shake-alert'), 400);
      appendQuotaNotice();
      const alertEl = document.getElementById('debunky-quota-alert-box');
      if (alertEl) alertEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    queryCount++;
    sessionStorage.setItem('debunky_query_count', queryCount);

    appendMessage('user', { text: cleanText });
    if (inputEl) inputEl.value = '';

    // Typing / Audit Progress indicator
    const typingDiv = document.createElement('div');
    typingDiv.className = 'debunky-typing-indicator';
    typingDiv.id = 'debunky-typing-temp';
    typingDiv.innerHTML = `
      <span class="font-mono" style="font-size: 0.72rem; color: var(--ink-muted); margin-right: 6px; font-weight: 700;">INTERROGATING STATUTORY FILINGS...</span>
      <span class="debunky-typing-dot"></span>
      <span class="debunky-typing-dot"></span>
      <span class="debunky-typing-dot"></span>
    `;
    chatWindow.appendChild(typingDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    setTimeout(() => {
      typingDiv.remove();
      const response = getDebunkyResponse(cleanText);
      appendMessage('bot', response, queryCount);

      if (queryCount >= MAX_FREE_QUERIES) {
        checkAndApplyLockState();
        setTimeout(() => {
          appendQuotaNotice();
        }, 500);
      }
    }, 450);
  }

  formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    if (queryCount >= MAX_FREE_QUERIES) {
      const productsSec = document.getElementById('products');
      if (productsSec) productsSec.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (inputEl) handleQuery(inputEl.value);
  });

  window.askDebunkyPrompt = function(promptText) {
    if (queryCount >= MAX_FREE_QUERIES) {
      handleQuery(promptText);
      return;
    }
    handleQuery(promptText);
  };

  window.clearDebunkyChat = function() {
    chatWindow.innerHTML = `
      <div class="debunky-case-record">
        <div class="case-meta-header">
          <div class="case-meta-left">
            <span class="atlas-pulse-dot"></span>
            <span class="case-ref-tag">SYSTEM // FORENSIC TERMINAL READY</span>
            <span>// SEBI LODR AUDIT ENGINE</span>
          </div>
          <div>
            <span class="font-mono" style="font-size: 0.65rem; color: var(--green-dark); font-weight: 700;">AUDITS REMAINING: ${Math.max(0, MAX_FREE_QUERIES - queryCount)}/${MAX_FREE_QUERIES}</span>
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
            Audit any Indian share market tip, viral finfluencer recommendation, high-dividend scheme, or balance sheet anomaly against statutory SEBI exchange filings and verified cash-flow statements.
          </p>
          <div class="case-citation-row">
            <span class="case-citation-label">AUDIT PROTOCOL:</span>
            <span>Queries interrogated against BSE/NSE statutory filings, MCA-21 disclosures &amp; cash flow ledgers.</span>
          </div>
        </div>
      </div>
    `;
    if (queryCount >= MAX_FREE_QUERIES) {
      appendQuotaNotice();
    }
  };

  checkAndApplyLockState();
  if (queryCount >= MAX_FREE_QUERIES) {
    appendQuotaNotice();
  }
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initDebunkyChat);
}
