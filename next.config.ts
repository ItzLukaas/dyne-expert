import type { NextConfig } from "next"

// 🚀 Slå Turbopack fra (virker på Windows + macOS)
process.env.NEXT_DISABLE_TURBOPACK = "1"

const nextConfig: NextConfig = {
  // 🧩 Slå eksperimentel turbo fra helt
  experimental: {
    turbo: false,
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

  // ⚙️ Valgfrit: tillad yderligere tilpasning af webpack hvis nødvendigt
  webpack: (config) => {
    return config
  },
}

export default nextConfig