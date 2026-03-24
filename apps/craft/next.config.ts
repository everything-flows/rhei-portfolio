import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const CURRENT_FILE_PATH = fileURLToPath(import.meta.url);
const PROJECT_ROOT_PATH = path.dirname(CURRENT_FILE_PATH);
const WORKSPACE_ROOT_PATH = path.resolve(PROJECT_ROOT_PATH, "../..");

const nextConfig: NextConfig = {
  basePath: "/craft",
  assetPrefix: "/craft",
  transpilePackages: ["@rhei/ui"],
  turbopack: {
    root: WORKSPACE_ROOT_PATH,
  },
};

export default nextConfig;
