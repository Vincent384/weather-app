import './globals.css';

export const metadata = {
  title: 'Väder-app',
  description: 'Check the weather',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        {/* iOS-specific Apple Touch Icon */}
        <link rel="apple-touch-icon" href="/Icons/icon-192x192.png" />
        {/* Theme Color */}
        <meta name="theme-color" content="#000000" />
      </head>
      <body>{children}</body>
    </html>
  );
}
