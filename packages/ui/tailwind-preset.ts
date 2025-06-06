import type { Config } from "tailwindcss";

const preset: Partial<Config> = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gray: {
          white: "#ffffff",
          100: "#e5e5e5",
          200: "#d4d4d4",
          300: "#a3a3a3",
          400: "#737373",
          500: "#525252",
          600: "#404040",
          700: "#262626",
          800: "#171717",
          900: "#0a0a0a",
          black: "#000000",
        },
        blue: {
          100: "#d9effc",
          200: "#a2d4f5",
          300: "#4aa4ff",
          400: "#1688ff",
          500: "#0263ff",
          600: "#074dd9",
          700: "#0a3694",
          800: "#0b2878",
          900: "#05173b",
        },
        orange: {
          100: "#ffe3c7",
          200: "#ffba85",
          300: "#ff8f57",
          400: "#fc683b",
          500: "#f94b28",
          600: "#f03420",
          700: "#bf280a",
          800: "#801a08",
          900: "#471409",
        },
      },
    },
  },
};

export default preset;
