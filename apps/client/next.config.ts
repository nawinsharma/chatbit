import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Proxy all API routes to backend
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === "production" 
          ? 'https://chatbit-server.onrender.com/api/:path*'
          : 'http://localhost:8080/api/:path*',
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
