import type { Config } from "tailwindcss";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { color } from "./color";

const __dirname = dirname(fileURLToPath(import.meta.url));

const preset: Partial<Config> = {
  content: [`${__dirname}/**/*.{ts,tsx,css}`],
  darkMode: "class",
  theme: {
    extend: {
      colors: color,
    },
  },
};

export default preset;
