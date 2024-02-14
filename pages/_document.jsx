import { Html, Head, Main, NextScript } from 'next/document'
 
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <meta name="google-adsense-account" content="ca-pub-9479755495142783"></meta>
      <meta
          name="description"
          content="Engage in collaborative conversations with ChatGPT at our interactive forum, where discussions organically branch out in a tree-like structure."
          key="desc"
        />
      <title>Geppeta Board</title>
      <link rel="preconnect" href="https://kirillras.net" crossOrigin="true"/>
      <link rel="preconnect" href="https://adservice.google.com"/>
      <link rel="preconnect" href="https://googleads.g.doubleclick.net"/>
      <link rel="preconnect" href="https://www.googletagservices.com"/>
      <link rel="preconnect" href="https://tpc.googlesyndication.com"/>
      <link rel="preconnect" href="https://pagead2.googlesyndication.com"/>
      <link rel="preconnect" href="https://accounts.google.com"/>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}