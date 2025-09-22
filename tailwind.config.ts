import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: { luxe: { bg: "#0b0b0b", card: "#111111", brass: "#B08D57", stone: "#2B2B2B" } },
      boxShadow: { "luxe": "0 10px 30px rgba(0,0,0,0.35)" },
      borderRadius: { "2xl": "1.25rem" }
    }
  },
  plugins: [],
};
export default config;
