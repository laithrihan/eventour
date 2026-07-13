import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents:true,
  typescript:{
    ignoreBuildErrors:true,
  },
  images:{
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  reactCompiler:true,
  experimental:{
    turbopackFileSystemCacheForBuild: true,
  }
};

export default nextConfig;
