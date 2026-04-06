'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
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
        .logo-img { width: 48px; height: 48px; object-fit: contain; flex-shrink: 0; }
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
            <div className="announce-left">Quality Without Compromise. Europe to Africa.</div>
            <div className="announce-links">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp Support</a>
              <a href={`mailto:${email}`}>{email}</a>
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
              <div>
                <span className="logo-name">Ladex Group</span>
                <span className="logo-sub">Europe to Africa</span>
              </div>
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
