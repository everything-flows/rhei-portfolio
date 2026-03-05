import { createRequire } from "module";
import { dirname } from "path";

import preset from "@rhei/ui/tailwind-preset";

import type { Config } from "tailwindcss";

const resolve = createRequire(import.meta.url).resolve;
const rheiUiPath = dirname(resolve("@rhei/ui/package.json"));

export default {
  presets: [preset],
  content: [
    "./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}",
    `${rheiUiPath}/**/*.{ts,tsx,css}`,
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
