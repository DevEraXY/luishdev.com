/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: '/luishdev.com', // ← change to your actual repo name
};

module.exports = nextConfig;