import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      colors: {
        gray: {
          white: "#ffffff",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d4d4d8",
          400: "#a1a1aa",
          500: "#71717a",
          600: "#52525b",
          700: "#3f3f46",
          800: "#27272a",
          900: "#18181b",
          black: "#0a0a0a",
        },
        blue: {
          500: "#0055ff",
        },
        orange: {
          500: "#ff6000",
        },
        bg: {
          standard: "#ffffff",
          highlight: "#207bfa",
          code: "#C1BACC44",
          reverse: "#000000",
        },
        border: {
          standard: "#484561",
          light: "#C1BACC",
          dark: "#000000",
          highlight: "#207bfa",
          code: "#C1BACC",
        },
        text: {
          standard: "#000000",
          light: "#C1BACC",
          little_light: "#504e66",
          reverse: "#ffffff",
          link: "#207bfa",
          tag: "#207bfa",
        },
        primary: {
          ultra_light: "#d2e6fc",
          very_light: "#82befa",
          light: "#559cfa",
          standard: "#207bfa",
          dark: "#024ed1",
        },
        secondary: {
          ultra_light: "#efebff",
          very_light: "#c1b4fc",
          light: "#ab94fe",
          standard: "#7a5eff",
          dark: "#5e42e3",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
