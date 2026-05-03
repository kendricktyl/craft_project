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
        cream: "#FAF7F2",
        rose: {
          DEFAULT: "#E8A598",
          50: "#FDF3F1",
          100: "#FAE5E0",
          200: "#F2C9C0",
          300: "#E8A598",
          400: "#D9847A",
        },
        sage: {
          DEFAULT: "#A8C5A0",
          50: "#F1F6EE",
          100: "#DDE9D6",
          200: "#C2D6B7",
          300: "#A8C5A0",
          400: "#86A87E",
        },
        cocoa: {
          DEFAULT: "#6B4226",
          50: "#F5EBE3",
          400: "#8C5E3F",
          500: "#6B4226",
          600: "#553319",
        },
      },
      fontFamily: {
        sans: ["var(--font-nunito)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      borderRadius: {
        DEFAULT: "16px",
        sm: "12px",
        md: "16px",
        lg: "20px",
        xl: "24px",
        "2xl": "28px",
      },
      fontSize: {
        base: ["1rem", { lineHeight: "1.6" }],
      },
      boxShadow: {
        soft: "0 4px 20px -8px rgba(107, 66, 38, 0.15)",
        cute: "0 8px 30px -10px rgba(232, 165, 152, 0.4)",
      },
    },
  },
  plugins: [],
};
export default config;
