import type { Config } from "tailwindcss";
import preset from "../../packages/ui/tailwind-preset";

export default {
  presets: [preset],
  content: [
    "./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}",
    "../../packages/ui/**/*.{ts,tsx}",
    "../../packages/ui/**/*.css",
  ],
  theme: {},
  plugins: [],
} satisfies Config;
