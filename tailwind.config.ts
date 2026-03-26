import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#050505",
          1: "#060606",
        },
        foreground: {
          DEFAULT: "#e8fff4",
        },
        glow: {
          DEFAULT: "#10b981",
        },
      },
      boxShadow: {
        glow: "0 0 32px rgba(16, 185, 129, 0.25)",
        glowStrong: "0 0 64px rgba(16, 185, 129, 0.28)",
      },
      keyframes: {
        "soft-pulse": {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "0.95" },
        },
      },
      animation: {
        "soft-pulse": "soft-pulse 6s ease-in-out infinite",
      },
    },
  },
} satisfies Config;

