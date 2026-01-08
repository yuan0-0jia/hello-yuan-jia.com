import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        typewriter: ["var(--font-typewriter)", "Courier", "monospace"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      colors: {
        // Warm vintage palette
        cream: "#faf6f1",
        parchment: "#f5efe6",
        sepia: {
          50: "#fdfcfb",
          100: "#f9f5f0",
          200: "#f0e6d8",
          300: "#e2d0b8",
          400: "#c9a97a",
          500: "#a67c52",
          600: "#8b5e34",
          700: "#6d4a2a",
          800: "#4a3520",
          900: "#2d2118",
        },
        warmGray: {
          50: "#faf9f7",
          100: "#f3f1ed",
          200: "#e8e4dd",
          300: "#d4cec3",
          400: "#a9a296",
          500: "#7a7267",
          600: "#5c554c",
          700: "#45403a",
          800: "#2e2a26",
          900: "#1a1816",
        },
        rust: {
          400: "#c67a52",
          500: "#a65d38",
          600: "#8b4a2a",
        },
        slate: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "typewriter": "typewriter 2s steps(20) forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        typewriter: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
