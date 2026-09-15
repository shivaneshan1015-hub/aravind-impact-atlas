import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        aravind: {
          blue: "#2563EB", // Hospitals
          teal: "#0D9488", // LAICO
          purple: "#7C3AED", // AMRF
          orange: "#EA580C", // Aurolab
          cyan: "#0284C7", // Auroitech
          green: "#059669", // Eye Bank
          gold: "#D97706", // Golden Jubilee Gold
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
