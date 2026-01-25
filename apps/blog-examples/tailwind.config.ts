import type { Config } from "tailwindcss";
import preset from "@rhei/ui/tailwind-preset";

export default {
  presets: [preset],
  content: ["./src/**/*.{html,ts,tsx}", "@rhei/ui/**/*.css"],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
