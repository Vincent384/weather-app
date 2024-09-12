/** @type {import('next').NextConfig} */
const nextConfig = {};

const withPWA = require('next-pwa')({
    dest: 'public', // Anger var den cachade service workern ska lagras
  });
  
  module.exports = withPWA({
    // Andra Next.js-konfigurationer kan också placeras här om nödvändigt
    reactStrictMode: true,
  });
  

export default nextConfig;
