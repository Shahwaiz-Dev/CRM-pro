/** @type {import('next').NextConfig} */
const nextConfig = {
  // Minimal development configuration for maximum speed
  
  // Turbopack configuration
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  
  // Disable all features that slow down development
  experimental: {
    // Only essential optimizations
    optimizePackageImports: ['lucide-react'],
  },
  
  // Disable all development slowdowns
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Disable image optimization
  images: {
    unoptimized: true,
  },
  
  // Disable all performance features in development
  compress: false,
  poweredByHeader: false,
  generateEtags: false,
  productionBrowserSourceMaps: false,
  swcMinify: false,
  reactStrictMode: false,
  
  // Disable webpack optimizations in development
  webpack: (config, { dev }) => {
    if (dev) {
      // Disable source maps
      config.devtool = false;
      // Disable optimizations
      config.optimization.minimize = false;
      config.optimization.minimizer = [];
    }
    return config;
  },
};

module.exports = nextConfig; 