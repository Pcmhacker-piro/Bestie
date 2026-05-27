import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.env.NEXT_OUTPUT_TRACING_ROOT || undefined,
};

export default nextConfig;
