import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  basePath: "/craft",
  assetPrefix: "/craft",
  transpilePackages: ["@rhei/ui"],
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
