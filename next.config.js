/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true, // required for static export + GitHub Pages
  images: {
    unoptimized: true // optional: disables Image Optimization which isn’t supported in export mode
  }
};

module.exports = nextConfig;