/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/esm-magar.github.io',
  assetPrefix: '/esm-magar.github.io/',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
