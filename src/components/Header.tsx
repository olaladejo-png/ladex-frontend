'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Sectors', href: '/sectors' },
  { label: 'Contact', href: '/contact' },
];

export default function Header({ siteName, email, whatsappUrl }: { siteName: string; email: string; whatsappUrl: string; }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isHome = pathname === '/';

  return (
    <>
      <style>{`
        .announce-bar {
          background: var(--ladex-black);
          color: rgba(255,255,255,.7);
          font-size: 0.72rem;
          font-weight: 600;
          padding: 0.55rem 0;
          letter-spacing: 0.04em;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          position: fixed; top: 0; left: 0; right: 0; z-index: 1001;
        }
        .announce-inner {
          display: flex; justify-content: space-between; align-items: center; gap: 1rem;
        }
        .announce-links { display: flex; gap: 1.5rem; flex-shrink: 0; }
        .announce-links a { color: var(--ladex-gold); transition: color .15s; font-weight: 800; white-space: nowrap; }
        .announce-links a:hover { color: #fff; }
        .announce-left { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: rgba(255,255,255,.5); }

        .site-header {
          position: fixed; top: 36px; left: 0; right: 0; z-index: 1000;
          transition: all 0.3s var(--ease-out-expo);
        }
        .header-wrap {
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid transparent;
          transition: box-shadow 0.3s, border-color 0.3s;
        }
        .header-scrolled .header-wrap {
          box-shadow: 0 2px 24px rgba(0,0,0,0.08);
          border-bottom-color: var(--border);
        }
        .header-bar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 1.5rem; max-width: var(--container);
          margin: 0 auto; height: 72px; gap: 2rem;
        }

        .logo { display: flex; align-items: center; gap: 0.75rem; flex-shrink: 0; text-decoration: none; }
        .logo-img { width: 144px; height: 144px; object-fit: contain; flex-shrink: 0; }
        .logo-name { display: block; font-size: 1.15rem; font-weight: 900; letter-spacing: -0.03em; color: var(--ladex-black); text-transform: uppercase; line-height: 1.1; }
        .logo-sub { display: block; font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: var(--ladex-gold); margin-top: 2px; }

        .nav-links { display: flex; align-items: center; gap: 0.25rem; }
        .nav-link {
          font-size: 0.82rem; font-weight: 700; padding: 0.5rem 0.875rem;
          border-radius: var(--radius-sm); transition: all .2s;
          color: var(--text-primary); white-space: nowrap;
          text-transform: uppercase; letter-spacing: 0.06em;
        }
        .nav-link:hover { color: var(--ladex-gold); }
        .nav-link.active { color: var(--ladex-gold); }

        .hamburger {
          display: none; width: 42px; height: 42px; border: none;
          background: var(--ladex-black); border-radius: 4px;
          align-items: center; justify-content: center; flex-direction: column; gap: 5px; padding: 0;
          cursor: pointer; flex-shrink: 0;
        }
        .hamburger span { display: block; width: 20px; height: 2px; border-radius: 2px; background: var(--ladex-gold); transition: all 0.3s; }

        .mobile-menu {
          background: #fff; border-top: 1px solid var(--border);
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
        }
        .mobile-menu a {
          display: block; padding: 0.875rem 1.5rem;
          font-size: 0.9rem; font-weight: 700; color: var(--text-primary);
          text-transform: uppercase; letter-spacing: 0.08em;
          border-bottom: 1px solid var(--border-light);
          transition: all .2s;
        }
        .mobile-menu a:last-of-type { border-bottom: none; }
        .mobile-menu a:hover, .mobile-menu a.active { color: var(--ladex-gold); background: var(--bg-off); }
        .mobile-cta { padding: 1rem 1.5rem; background: var(--bg-off); }

        @media (max-width: 1024px) {
          .nav-links { display: none; }
          .header-cta { display: none; }
          .hamburger { display: flex; }
        }
        @media (max-width: 480px) {
          .announce-left { display: none; }
          .header-bar { padding: 0 1rem; }
        }
      `}</style>

      {/* Announcement bar */}
      <div className="announce-bar">
        <div className="container">
          <div className="announce-inner">
            <div className="announce-left">Quality Without Compromise. Europe to the World.</div>
            <div className="announce-links">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp Support
              </a>
              <a href={`mailto:${email}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><rect width="20" height="14" x="2" y="5" rx="2"/></svg>
                {email}
              </a>
            </div>
          </div>
        </div>
      </div>

      <header className={`site-header ${scrolled ? 'header-scrolled' : ''}`}>
        <div className="header-wrap">
          <div className="header-bar">
            <Link href="/" className="logo" aria-label={siteName}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Ladex Group Logo" className="logo-img" />
            </Link>

            <nav className="nav-links" aria-label="Main navigation">
              {NAV_LINKS.map((l) => (
                <Link key={l.href} href={l.href} className={`nav-link ${pathname === l.href ? 'active' : ''}`}>
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="header-cta" style={{ flexShrink: 0 }}>
              <Link href="/contact" className="btn btn-dark">Get a Quote</Link>
            </div>

            <button className="hamburger" aria-label="Open menu" onClick={() => setMenuOpen(!menuOpen)}>
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="mobile-menu">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={pathname === l.href ? 'active' : ''}>{l.label}</Link>
            ))}
            <div className="mobile-cta">
              <Link href="/contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Get a Quote
              </Link>
            </div>
          </div>
        )}
      </header>

      {!isHome && <div style={{ height: '108px' }} />}
    </>
  );
}
