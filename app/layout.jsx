import "./global.css"
import { CookiesProvider } from 'next-client-cookies/server';

export const metadata = {
  title: 'Interesting Geography',
}

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}) {
  return (
    <html lang="en">
      <CookiesProvider>
        <body>{children}</body>
      </CookiesProvider>
    </html>
  )
}