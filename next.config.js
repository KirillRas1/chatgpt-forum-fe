// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     backendUrl: 'http://localhost:8000',
//   }

//   export default nextConfig
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
  })
  module.exports = withBundleAnalyzer({})