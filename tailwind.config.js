/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0E1A2B",
        panel: {
          DEFAULT: "#152238",
          secondary: "#1B2C48",
          elevated: "#213658"
        },
        paper: {
          DEFAULT: "#EFEAE0",
          dim: "#B9BFC9",
          muted: "#7B8698"
        },
        amber: {
          DEFAULT: "#00E599",
          hover: "#25F4AE",
          dim: "rgba(0, 229, 153, 0.15)"
        },
        green: {
          DEFAULT: "#00E599",
          hover: "#25F4AE",
          dim: "rgba(0, 229, 153, 0.15)",
          glow: "rgba(0, 229, 153, 0.28)"
        },
        brick: {
          DEFAULT: "#EF4444",
          hover: "#F87171",
          dim: "rgba(239, 68, 68, 0.18)"
        },
        hairline: "rgba(255, 255, 255, 0.08)",
        "hairline-accent": "rgba(0, 229, 153, 0.35)",
        "hairline-brick": "rgba(239, 68, 68, 0.35)",
      },
      fontFamily: {
        serif: ["'Plus Jakarta Sans'", "-apple-system", "sans-serif"],
        sans: ["'Plus Jakarta Sans'", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["'IBM Plex Mono'", "Menlo", "Consolas", "monospace"],
      },
      maxWidth: {
        ledger: "1080px",
      },
      boxShadow: {
        subtle: "0 1px 3px rgba(0, 0, 0, 0.3)",
      }
    },
  },
  plugins: [],
}
