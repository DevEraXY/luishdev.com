/** @type {import('next').NextConfig} */
const nextConfig = {
  //output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: '', // ← change to your actual repo name
};

module.exports = nextConfig;