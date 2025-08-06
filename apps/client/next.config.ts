import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Basic redirect
      {
        source: '/api/auth/:path*',
        destination: 'https://chatbit-server.onrender.com/api/auth/:path*',
        basePath: false,
        permanent: false,
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
