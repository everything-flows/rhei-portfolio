import type { Config } from "tailwindcss";
import preset from "@rhei/ui/tailwind-preset";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function resolveAliasPath(path: string): string {
  if (path.startsWith("@rhei/ui")) {
    const basePath = resolve(__dirname, "../../packages/ui");
    const restOfPath = path.replace("@rhei/ui", "");
    return basePath + restOfPath;
  }
  return path;
}

function expandContentPaths(paths: string[]): string[] {
  return paths.map((path) => resolveAliasPath(path));
}

export default {
  presets: [preset],
  content: expandContentPaths([
    "./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}",
    "@rhei/ui/**/*.{ts,tsx,css}",
  ]),
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
