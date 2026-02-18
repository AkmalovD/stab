/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['images.pexels.com'], // Add your image domains
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  }
  
  export default nextConfig