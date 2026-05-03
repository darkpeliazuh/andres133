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
        // Deep, theatrical palette inspired by candlelit dining rooms
        noir: {
          50: "#f5f3ef",
          100: "#e8e3da",
          200: "#c8bfae",
          300: "#9a8e76",
          400: "#6b6048",
          500: "#3d3525",
          600: "#241f15",
          700: "#16130d",
          800: "#0c0a07",
          900: "#050402",
          950: "#020100",
        },
        // Champagne / antique gold
        gold: {
          50: "#fbf6e6",
          100: "#f5ebc4",
          200: "#ead592",
          300: "#dcbb5e",
          400: "#caa23a",
          500: "#b08a26",
          600: "#8e6c1d",
          700: "#6b5118",
          800: "#473614",
          900: "#241b0a",
        },
        // Vintage burgundy / wine
        wine: {
          400: "#a23f4a",
          500: "#7a1e2a",
          600: "#5a1219",
          700: "#3d0b11",
        },
        ivory: {
          DEFAULT: "#f5efe2",
          warm: "#ece3cc",
          dim: "#cfc6ad",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        serif: ["var(--font-serif)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        "tightest-2": "-0.04em",
        "ultra-wide": "0.5em",
      },
      animation: {
        "fade-in": "fadeIn 1.4s ease-out forwards",
        shimmer: "shimmer 3s linear infinite",
        "marquee-x": "marqueeX 40s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulseSlow 4s ease-in-out infinite",
        "gold-sweep": "goldSweep 3.5s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marqueeX: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        goldSweep: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      backgroundImage: {
        "noir-radial":
          "radial-gradient(circle at 50% 0%, rgba(202,162,58,0.12) 0%, rgba(5,4,2,0) 60%)",
        "gold-text":
          "linear-gradient(120deg, #f5ebc4 0%, #caa23a 30%, #f5ebc4 50%, #8e6c1d 75%, #ead592 100%)",
        grain:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        "gold-glow": "0 0 60px -10px rgba(202,162,58,0.45)",
        "deep": "0 30px 80px -20px rgba(0,0,0,0.8)",
      },
    },
  },
  plugins: [],
};

export default config;
