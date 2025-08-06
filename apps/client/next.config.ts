import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Basic redirect
      {
        source: '/api/auth/:path*',
        destination: 'https://chatbit-server.onrender.com/api/auth/:path*',
        basePath: false,
      }
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
      }
    ]
  }
};

export default nextConfig;
