import withPWA from 'next-pwa';

const config = withPWA({
  dest: 'public',
  reactStrictMode: true,
});

export default config;
