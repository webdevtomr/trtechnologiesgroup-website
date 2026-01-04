import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E5E7EB",
        secondary: "#AEB5C2",
        muted: "#7A8190",
        accent: "#4D8BFF",
        accentHover: "#6B9FFF",
        accentGlow: "rgba(77, 139, 255, 0.15)",
        body: "#AEB5C2",
        border: "rgba(255, 255, 255, 0.06)",
        borderHover: "rgba(77, 139, 255, 0.2)",
        card: "#181B21",
        cardAlt: "#1C2026",
        cardHover: "#1E2229",
        background: "#0B0B0D",
        backgroundAlt: "#111216",
        backgroundSection: "#16181C",
        disabled: "#404040",
      },
      fontFamily: {
        heading: ['"Stack Sans Notch"', "sans-serif"],
        body: ["Inter", "sans-serif"],
        nav: ["Lilex", "monospace"],
        description: ['"M PLUS 1 Code"', "monospace"],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at center, #111826 0%, #0B0B0D 100%)',
        'gradient-radial-hero': 'radial-gradient(ellipse at center, #111826 0%, #0B0B0D 70%)',
        'gradient-section': 'linear-gradient(180deg, #111216 0%, #16181C 100%)',
      },
      boxShadow: {
        'card': '0 4px 24px rgba(0, 0, 0, 0.35)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(77, 139, 255, 0.1)',
        'accent-glow': '0 0 24px rgba(77, 139, 255, 0.2)',
        'accent-glow-sm': '0 0 12px rgba(77, 139, 255, 0.15)',
      },
      letterSpacing: {
        'heading': '0.02em',
      },
    },
  },
  plugins: [],
};
export default config;
