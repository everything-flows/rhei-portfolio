import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/craft",
  assetPrefix: "/craft",
  transpilePackages: ["@rhei/ui", "@rhei/react"],
};

export default nextConfig;
