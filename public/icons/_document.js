import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Manifest and theme color */}
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#000000" />

          {/* Apple Touch Icon */}
          <link rel="apple-touch-icon" href="/Icons/icon-192x192.png" />

          {/* Favicon (optional) */}
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
