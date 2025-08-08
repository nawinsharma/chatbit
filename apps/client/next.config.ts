import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Basic redirect
      {
        source: '/api/auth/:path*',
        destination: process.env.NODE_ENV === "production" 
          ? 'https://chatbit-server.onrender.com/api/auth/:path*'
          : 'http://localhost:8080/api/auth/:path*',
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
