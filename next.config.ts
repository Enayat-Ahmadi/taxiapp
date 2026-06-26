import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: (
    process.env.ALLOWED_DEV_ORIGINS || "localhost:3000"
  ).split(","),
  experimental: {},
};

export default nextConfig;
