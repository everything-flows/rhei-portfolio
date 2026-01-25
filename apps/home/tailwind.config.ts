import type { Config } from "tailwindcss";
import preset from "@rhei/ui/tailwind-preset";

export default {
  presets: [preset],
  content: [
    "./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}",
    "@rhei/ui/**/*.{ts,tsx}",
    "@rhei/ui/**/*.css",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
