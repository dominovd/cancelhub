import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Legacy aliases — kept so old components don't break.
        background: "var(--paper)",
        foreground: "var(--ink)",

        // Warm design system. Use as bg-paper, text-ink, border-line, etc.
        paper: "var(--paper)",
        "paper-2": "var(--paper-2)",
        card: "var(--card)",
        ink: "var(--ink)",
        "ink-2": "var(--ink-2)",
        "ink-3": "var(--ink-3)",
        "ink-4": "var(--ink-4)",
        line: "var(--line)",
        "line-2": "var(--line-2)",
        accent: "var(--accent)",
        "accent-soft": "var(--accent-soft)",
        green: "var(--green)",
        "green-soft": "var(--green-soft)",
        easy: "var(--easy)",
        med: "var(--med)",
        hard: "var(--hard)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      borderRadius: {
        warm: "11px",
        "warm-md": "13px",
        "warm-lg": "14px",
        "warm-xl": "20px",
      },
      boxShadow: {
        warm: "0 1px 0 rgba(0, 0, 0, 0.04), 0 8px 24px -12px rgba(40, 30, 10, 0.18)",
      },
    },
  },
  plugins: [],
};
export default config;
