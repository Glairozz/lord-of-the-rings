import type { Metadata, Viewport } from 'next';
import { Cinzel_Decorative, Merriweather } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import { siteConfig } from '@/lib/site';

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
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — A Tolkien Encyclopedia & Atlas`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'Middle-earth',
    'Lord of the Rings',
    'The Hobbit',
    'J.R.R. Tolkien',
    'Silmarillion',
    'Tolkien encyclopedia',
    'Middle-earth atlas',
    'fantasy lore',
  ],
  authors: [{ name: 'Glairozz Blair P. Punay' }],
  openGraph: {
    type: 'website',
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0c1611',
  width: 'device-width',
  initialScale: 1,
};

const themeBootstrap = `
(function () {
  try {
    var stored = localStorage.getItem('lome-theme');
    var theme = stored || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${merriweather.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body className="font-serif antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
