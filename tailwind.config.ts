import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        violetaPrincipal: "#BB86FC",
        violetaSecundario: "#9747FF",
        grisPrincipal: "#D9D9D9",
        sombraCards: "#FAF8F8",
        blanco: "#FFFFFF",
        negro: "#191919",
        green: "#3EC500",
        yellow: "#FFE100",
        orange: "#FF7700",
        red: "#F30000",
        purple: "#6300DC",

      },
      boxShadow: {
        custom: '0px 4px 12px -2px rgba(187,134,252,0.5)',
      },
    },
  },
  plugins: [],
};
export default config;
