/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  experimental: {
    serverActions: false, 
  },

  async rewrites() {
    return [];
  },

  async headers() {
    return [];
  },

  logger: {
    level: "debug", // Enables deeper logging
  },
};

module.exports = nextConfig;
