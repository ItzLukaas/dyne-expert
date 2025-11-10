import type { NextConfig } from "next"

// 🚀 Slå Turbopack fra (virker på Windows + macOS)
process.env.NEXT_DISABLE_TURBOPACK = "1"

const nextConfig: NextConfig = {
  // 🧩 Fjern turbo-indstillingen, da den ikke længere er gyldig
  experimental: {
    // turbo: false,  // Fjern denne linje
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