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
          500: "#3b82f6",
        },
        orange: {
          500: "#f97316",
        },
      },
    },
  },
};

export default preset;
