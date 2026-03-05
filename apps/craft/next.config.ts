import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/craft",
  assetPrefix: "/craft",
  transpilePackages: ["@rhei/ui"],
};

export default nextConfig;
