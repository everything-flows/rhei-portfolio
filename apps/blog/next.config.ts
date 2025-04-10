import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/blog",
  assetPrefix: "/blog",
  transpilePackages: ["@rhei/ui"],
};

export default nextConfig;
