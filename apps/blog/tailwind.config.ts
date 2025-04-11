import type { Config } from "tailwindcss";
import preset from "../../packages/ui/tailwind-preset";

export default {
  presets: [preset as Config],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "../../packages/ui/**/*.{ts,tsx,css}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
