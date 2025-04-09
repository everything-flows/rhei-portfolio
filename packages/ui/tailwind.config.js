/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{ts,tsx}", "../../apps/**/*.{ts,tsx}"],
  theme: {
    extend: {
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
      },
    },
  },
  plugins: [],
};
