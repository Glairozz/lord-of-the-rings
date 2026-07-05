import type { Metadata } from 'next';
import { Cinzel_Decorative, Merriweather } from 'next/font/google';
import './globals.css';

const cinzel = Cinzel_Decorative({
  weight: '700',
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

const merriweather = Merriweather({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-merriweather',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'The Legend of Middle-earth',
  description:
    'Explore the epic world of Middle-earth — discover books, characters, and themes from The Hobbit and The Lord of the Rings by J.R.R. Tolkien.',
  keywords: ['Middle-earth', 'Lord of the Rings', 'The Hobbit', 'J.R.R. Tolkien', 'fantasy'],
  openGraph: {
    title: 'The Legend of Middle-earth',
    description: 'Explore the epic world of Middle-earth — discover books, characters, and themes.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${merriweather.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-serif antialiased">
        {children}
      </body>
    </html>
  );
}
