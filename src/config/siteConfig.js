/**
 * Market Debunk — Central Configuration
 * Reads from Vite environment secrets with resilient fallbacks.
 */

export const siteConfig = {
  name: "Market Debunk",
  tagline: "Finance, explained without the fog.",
  bio: "Independent financial forensic media — deconstructing viral money myths with audited statutory filings and zero noise.",
  footerNotice: "New corrections, published on schedule.",

  // Social Channels & Channel Profiles
  links: {
    youtube: import.meta.env.VITE_YOUTUBE_URL || "https://www.youtube.com/@MarketDebunk",
    youtubeTamil: "https://www.youtube.com/@MarketDebunkTamil",
    instagram: import.meta.env.VITE_INSTAGRAM_URL || "https://www.instagram.com/marketdebunk",
    instagramTamil: "https://www.instagram.com/marketdebunk_tamil",
    telegram: import.meta.env.VITE_TELEGRAM_URL || "https://t.me/MarketDebunk",
    telegramTamil: "https://t.me/marketdebunk_tamil",
    linkedin: import.meta.env.VITE_LINKEDIN_URL || "https://www.linkedin.com/company/143659978/",
    facebook: "https://facebook.com/marketdebunk",
    email: "marketdebunk@gmail.com"
  },

  // Google Drive Live Feed Secrets & Configuration
  drive: {
    apiKey: import.meta.env.VITE_DRIVE_API_KEY || "",
    folderId: import.meta.env.VITE_DRIVE_FOLDER_ID || "1n600zacanICWFEQ1oX5XYOUyJLMSyvjc",
    pollIntervalMs: 5 * 60 * 1000, // 5 minutes
    staleThresholdMs: 60 * 60 * 1000, // 1 hour
    cacheKey: "md_latest_upload_cache"
  },

  // Hero Struck-through Myths to rotate through
  heroMyths: [
    "Buy the dip on every stock and you'll never lose.",
    "High dividend yield always means free safe income.",
    "Timing the market is easy if you follow technical indicators.",
    "Gold only ever surges when equities crash."
  ],

  // Marquee Ticker Entries (§4.3)
  tickerEntries: [
    "MYTH: HIGH YIELD = LOW RISK — DEBUNKED",
    "MYTH: TIMING THE MARKET BEATS TIME IN THE MARKET — DEBUNKED",
    "MYTH: 0% BROKERAGE MEANS FREE TRADING — DEBUNKED",
    "MYTH: PAST RETURNS GUARANTEE FUTURE PERFORMANCE — DEBUNKED",
    "MYTH: MARKET CRASHES CANNOT BE SURVIVED — DEBUNKED",
    "MYTH: INFLATION DOESN'T TOUCH CASH SAVINGS — DEBUNKED"
  ],

  // Channels Ledger (§4.4)
  channels: [
    {
      id: "yt",
      index: "01",
      name: "YouTube Shorts",
      description: "The main feed — vertical, fast, myth-then-fact format.",
      formatTag: "VIDEO",
      urlKey: "youtube",
      embedVideoId: "Z_YAq9bJjpE",
      badgeColor: "brick"
    },
    {
      id: "ig",
      index: "02",
      name: "Instagram",
      description: "Reels plus the occasional carousel breakdown.",
      formatTag: "REELS",
      urlKey: "instagram",
      embedVideoId: "1mRyKNEXhms",
      badgeColor: "amber"
    },
    {
      id: "tg",
      index: "03",
      name: "Telegram",
      description: "Text-first drops for reading over watching.",
      formatTag: "TEXT",
      urlKey: "telegram",
      sampleText: "MYTH: 'Debt-free companies are always immune to bankruptcy.'\n\nREALITY: Operating cash burn and rapid working capital lockup can trigger severe insolvency before lenders even call. Always cross-examine free cash flow, not just standalone balance sheet debt.",
      badgeColor: "panel"
    },
    {
      id: "li",
      index: "04",
      name: "LinkedIn",
      description: "Longer-form breakdowns and behind-the-scenes.",
      formatTag: "POSTS",
      urlKey: "linkedin",
      samplePost: "Why 80% of retail traders misunderstand dividend tax drag and total return rebalancing. A step-by-step tear-down.",
      badgeColor: "panel"
    }
  ],

  // Digital Products (§ Selling products)
  products: [
    {
      id: "retail-trap-playbook",
      title: "The Retail Trap: 50 Financial Myths Debunked",
      subtitle: "The definitive field manual dissecting the most expensive lies propagated on social media.",
      tag: "PLAYBOOK / PDF",
      price: "₹499",
      priceOriginal: "₹999",
      features: [
        "50 deep-dive breakdowns with historical charts",
        "Mathematical proof & filing citations",
        "Lifetime access + downloadable PDF & Notion workspace",
        "Direct checklist for evaluating viral stock tips"
      ],
      ctaText: "Acquire Playbook",
      badge: "MOST POPULAR"
    },
    {
      id: "valuation-toolkit",
      title: "Cold Facts Valuation & IPO Due-Diligence Model",
      subtitle: "Automated spreadsheet model used to strip promotional accounting and highlight balance-sheet red flags.",
      tag: "SHEET + LOOM",
      price: "₹1,299",
      priceOriginal: "₹2,499",
      features: [
        "Automated DCF, Reverse DCF & Owner Earnings sheets",
        "Working capital trap detector formula",
        "30-minute video walkthrough tearing down a live filing",
        "Plug-and-play Google Sheets & Excel files"
      ],
      ctaText: "Get Toolkit",
      badge: "CREATOR TOOL"
    },
    {
      id: "debunk-insider",
      title: "Debunk Insider VIP Dispatch",
      subtitle: "Real-time briefings whenever a dangerous financial falsehood starts gaining virality.",
      tag: "PRIVATE ACCESS",
      price: "₹299/mo",
      priceOriginal: "₹599/mo",
      features: [
        "Instant alerts before you enter a trending trap",
        "Weekly audio memo explaining institutional fund flows",
        "Exclusive subscriber-only Q&A channel",
        "Early access to all upcoming investigations"
      ],
      ctaText: "Join Insider",
      badge: "COMMUNITY"
    },
    {
      id: "ai-agents-trading",
      title: "AI Agents for Trading",
      subtitle: "Autonomous multi-agent execution framework scanning order book depth, liquidity sweeps, and price action metrics without emotion.",
      tag: "AUTONOMOUS TRADING",
      price: "₹999/mo",
      priceOriginal: "₹1,999/mo",
      features: [
        "Real-time multi-agent algorithmic market scans",
        "Risk-managed position sizing & stop-loss triggers",
        "Zero emotional bias execution protocols",
        "Telegram & Webhook instant trading alert integration"
      ],
      ctaText: "Subscribe",
      badge: "NEW RELEASE"
    },
    {
      id: "agentic-ai-workflow",
      title: "Agentic AI Workflow",
      subtitle: "Full-stack agentic automation pipeline designed for deep financial statement audits, news sentiment filtering, and quarterly filing extraction.",
      tag: "WORKFLOW AUTOMATION",
      price: "₹499",
      priceOriginal: "₹999",
      features: [
        "Ready-to-deploy LangChain / LlamaIndex agent graph",
        "Automated 10-K & statutory report parsing pipeline",
        "Fine-tuned prompt chains for forensic accounting",
        "Complete source code + visual architecture blueprint"
      ],
      ctaText: "Get Workflow",
      badge: "PRO ARCHITECTURE"
    },
    {
      id: "automation-share-update",
      title: "Automation Share Tracker (Keep Updated)",
      subtitle: "Continuous cloud sync engine tracking your stock holdings, price alerts, insider transactions, and earnings calendar updates automatically.",
      tag: "ALWAYS SYNCED",
      price: "₹499/mo",
      priceOriginal: "₹899/mo",
      features: [
        "Automated live price & shareholding updates",
        "Instant alerts on promoter pledge & insider trades",
        "Cloud Google Sheets & Telegram notification pipeline",
        "Continuous 24/7 background sync & quarterly alerts"
      ],
      ctaText: "Keep Updated",
      badge: "LIVE TRACKER"
    }
  ],

  // 4-Stage Pipeline (§4.6)
  pipelineStages: [
    {
      step: "01",
      name: "Script",
      caption: "Deconstruct the claim against raw filings and historical charts."
    },
    {
      step: "02",
      name: "Voice",
      caption: "Studio-grade voiceover recorded with no hype or artificial inflection."
    },
    {
      step: "03",
      name: "Assemble",
      caption: "Kinetic typography, evidence overlays, and frame-locked pacing."
    },
    {
      step: "04",
      name: "Publish",
      caption: "Simultaneous release across vertical feeds with zero algorithm chasing."
    }
  ]
};
