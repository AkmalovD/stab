/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['images.pexels.com'], // Add your image domains
      remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  }
  
  export default nextConfig