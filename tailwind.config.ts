import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // soft, calm, trustworthy palette
        ink: "#2b2440",        // deep plum-charcoal text
        muted: "#6f6883",
        plum: "#6d4aa6",       // primary purple
        "plum-2": "#8a63c9",
        lilac: "#ede7f7",      // soft lavender surface
        "lilac-2": "#f6f2fb",
        cream: "#f3ede3",      // warm beige
        sage: "#cfe3d4",       // pastel green accent
        paper: "#ffffff",
        line: "#ece7f3",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 50px -24px rgba(80,54,140,0.28)",
        card: "0 10px 30px -16px rgba(80,54,140,0.2)",
      },
      borderRadius: {
        xl2: "1.6rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
