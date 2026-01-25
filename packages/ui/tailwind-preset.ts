import type { Config } from "tailwindcss";
import { color } from "./color";

const preset: Partial<Config> = {
  darkMode: "class",
  theme: {
    extend: {
      colors: color,
    },
  },
};

export default preset;
