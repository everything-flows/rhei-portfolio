import type { Config } from "tailwindcss";

const preset: Partial<Config> = {
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
          600: "#005df0",
          500: "#0270ff",
          400: "#1688ff",
        },
        orange: {
          700: "#d83010",
          600: "#f03420",
          500: "#f94b28",
          400: "#fc683b",
        },
      },
    },
  },
};

export default preset;
