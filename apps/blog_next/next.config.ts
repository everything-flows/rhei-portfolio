import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/blog",
  assetPrefix: "/blog",
  transpilePackages: ["@rhei/ui", "@rhei/react"],
};

export default nextConfig;
