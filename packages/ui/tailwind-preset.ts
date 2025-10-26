import type { Config } from "tailwindcss";

const preset: Partial<Config> = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gray: {
          white: "#ffffff",
          50: "#F3F3F3",
          100: "#E6E6E6",
          150: "#D9D9D9",
          200: "#CCCCCC",
          250: "#BFBFBF",
          300: "#B3B3B3",
          350: "#A6A6A6",
          400: "#999999",
          450: "#8C8C8C",
          500: "#808080",
          550: "#737373",
          600: "#666666",
          650: "#595959",
          700: "#4D4D4D",
          750: "#484848",
          800: "#3E3E3E",
          850: "#333333",
          900: "#292929",
          950: "#1F1F1F",
          black: "#000000",
        },
        blue: {
          100: "#DDEFFD",
          200: "#ADD8FA",
          300: "#64B4F8",
          400: "#2E92F4",
          500: "#0D6EEC",
          600: "#0956D1",
          700: "#083F9C",
          800: "#072D73",
          900: "#061B3F",
        },
        orange: {
          100: "#FFE8D6",
          200: "#FFC999",
          300: "#FFA165",
          400: "#FF7A3F",
          500: "#F95A22",
          600: "#D94717",
          700: "#A73612",
          800: "#73260E",
          900: "#3F170B",
        },
      },
    },
  },
};

export default preset;
