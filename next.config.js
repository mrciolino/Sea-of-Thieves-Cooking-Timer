/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Generate a static export to the `out` directory
  output: 'export',
  // If `next/image` is used later, avoid server-side optimization
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
