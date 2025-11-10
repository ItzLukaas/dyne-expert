const nextConfig = {
  experimental: {
    turbopack: {}, // Aktivér Turbopack
  },

  // 🖼️ Shopify billeder
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
    ],
  },
}

export default nextConfig