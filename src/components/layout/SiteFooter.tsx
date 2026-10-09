import Link from 'next/link';
import { footerLinks, siteConfig } from '@/lib/site';

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-night-2/60">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <p className="font-display text-lg tracking-[0.2em] text-gold-light">{siteConfig.shortName}</p>
            <p className="mt-3 max-w-xs text-sm text-mist">{siteConfig.tagline}</p>
          </div>

          <FooterColumn title="Explore" links={footerLinks.explore} />
          <FooterColumn title="Study" links={footerLinks.study} />
          <FooterColumn title="About" links={footerLinks.about} />
        </div>

        <div className="mt-12 border-t border-border pt-8 text-xs leading-relaxed text-mist">
          <p className="mb-3">
            <strong className="text-parchment-2">Independent fan project.</strong> {siteConfig.name} is an
            unofficial, non-commercial resource created by fans for study and discussion. It is not
            affiliated with, endorsed by, or connected to the Tolkien Estate, Middle-earth Enterprises,
            Amazon, Warner Bros., New Line Cinema, or any other rights holder.
          </p>
          <p className="mb-3">
            &ldquo;The Hobbit&rdquo;, &ldquo;The Lord of the Rings&rdquo; and related names, places and
            characters are the property of their respective rights holders. Encyclopedia entries are original
            writing; brief quotations are attributed to their sources. Film and television material is
            labelled as adaptation and is not presented as Tolkien&rsquo;s own.
          </p>
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Built as a fan tribute by Glairozz Blair P. Punay.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="mb-3 font-display text-xs uppercase tracking-[0.2em] text-gold">{title}</p>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-parchment-2 transition-colors hover:text-gold-light">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
