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

  experimental: {},

  async rewrites() {
    return [];
  },

  async headers() {
    return [];
  },
};

module.exports = nextConfig;
