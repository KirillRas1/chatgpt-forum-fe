const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
    // Or use this for more specific rule ignoring:
    rules: {
      '@next/next/no-html-link-for-pages': 'off'
    }
  }
}
 
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
 
module.exports = withBundleAnalyzer(nextConfig)