/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#C9CEBD", // lys baggrund (ash gray)
          mid: "#B2BCAA", // sekundær baggrund
          dark: "#838E83", // dybere kontrast
          accent: "#6C6061", // hover / tekst
          deep: "#64403E", // knapper / fokus
        },
      },
      fontSize: {
        "fluid-sm": "clamp(0.9rem, 1vw + 0.2rem, 1rem)",
        "fluid-base": "clamp(1rem, 1vw + 0.3rem, 1.125rem)",
        "fluid-lg": "clamp(1.25rem, 2vw + 0.3rem, 1.75rem)",
        "fluid-xl": "clamp(1.75rem, 2vw + 0.5rem, 2.25rem)",
        "fluid-2xl": "clamp(2rem, 3vw + 0.6rem, 3rem)",
      },
      spacing: {
        "fluid-sm": "clamp(0.5rem, 0.8vw, 0.75rem)",
        "fluid-md": "clamp(1rem, 1.2vw, 1.5rem)",
        "fluid-lg": "clamp(1.5rem, 2vw, 2.5rem)",
      },
    },
  },
  plugins: [require("tailwindcss-fluid")],
}