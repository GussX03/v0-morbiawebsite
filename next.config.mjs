/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ["image/webp"],
    minimumCacheTTL: 2678400,
    deviceSizes: [320, 480, 640, 768, 1024, 1280, 1536],
  },
}

export default nextConfig
