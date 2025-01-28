import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        primary: {
          DEFAULT: "#2640CC",
          hover: "#1E349E",
        },
        secondary: {
          DEFAULT: "#8B1CCA",
          hover: "#7015A2",
        },
        neutral: {
          DEFAULT: "#F3F4F6",
          hover: "#E5E7EB",
        },
        background: {
          light: "#F9FAFB",
          dark: "#1E293B",
        },
        text: {
          primary: "#1F2937",
          secondary: "#4B5563",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
