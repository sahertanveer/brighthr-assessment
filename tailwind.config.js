/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#67E8F9",
          DEFAULT: "#06B6D4",
          dark: "#0E7490",
        },
        accent: {
          light: "#F9A8D4",
          DEFAULT: "#F472B6",
          dark: "#DB2777",
        },
        secondary: {
          light: "#22C55E",
          DEFAULT: "#16A34A",
          dark: "#15803D",
        },
        highlight: {
          light: "#FDE68A",
          DEFAULT: "#FBBF24",
          dark: "#D97706",
        },
        neutral: {
          50: "#FFFFFF",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#475569",
          600: "#334155",
          700: "#1E293B",
          800: "#0F172A",
          900: "#0A0F1C",
        },
        success: "#10B981",
        warning: "#FBBF24",
        error: "#EF4444",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 14px rgba(0,0,0,0.08)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
    },
  },
  plugins: [],
};
