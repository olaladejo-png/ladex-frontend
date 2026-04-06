import Link from 'next/link';
import type { GlobalSetting } from '@/lib/api';

interface FooterProps { settings: GlobalSetting | null; }

const NAV = {
  Services: [
    { label: 'Equipment Sourcing & Supply', href: '/services' },
    { label: 'Technical Representation', href: '/services' },
    { label: 'Engineering Consulting', href: '/services' },
    { label: 'Inspection & Procurement', href: '/services' },
    { label: 'Agricultural & Poultry Solutions', href: '/services' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Services', href: '/services' },
    { label: 'Contact Us', href: '/contact' },
  ],
};

export default function Footer({ settings }: FooterProps) {
  const year = new Date().getFullYear();
  const email = settings?.contact_email || 'sales@ladexgroup.com';
  const whatsappNG = '+2347069606542';
  const phoneDE = settings?.contact_phone || '+49 1521 816 2816';
  const phoneNG = '+2347040580988';
  const linkedin = settings?.linkedin_url || 'https://www.linkedin.com/company/ladexgroup';

  return (
    <>
      <style>{`
        .footer { background: var(--ladex-black); color: rgba(255,255,255,.65); font-size: 0.95rem; }
        .footer-main { padding: 5rem 0 4rem; border-bottom: 1px solid rgba(255,255,255,.06); }
        .footer-grid {
          display: grid;
          grid-template-columns: 2.2fr 1.4fr 1.2fr 1.6fr;
          gap: 4rem;
        }

        .footer-logo { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.75rem; }
        .footer-logo-img { width: 52px; height: 52px; object-fit: contain; flex-shrink: 0; filter: brightness(0) invert(1); }
        .footer-logo-name { font-size: 1.25rem; font-weight: 900; color: #fff; line-height: 1.1; text-transform: uppercase; letter-spacing: -0.02em; }
        .footer-logo-sub { font-size: 0.7rem; color: var(--ladex-gold); text-transform: uppercase; letter-spacing: 0.2em; font-weight: 700; }
        .footer-brand-desc { font-size: 0.95rem; line-height: 1.8; color: rgba(255,255,255,.45); max-width: 320px; margin-bottom: 2rem; }

        .footer-socials { display: flex; gap: 0.75rem; }
        .footer-social-link {
          width: 40px; height: 40px; border-radius: 4px;
          background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.1);
          color: rgba(255,255,255,.55); display: flex; align-items: center;
          justify-content: center; font-size: 0.9rem; font-weight: 800;
          transition: all .3s var(--ease-out-expo); letter-spacing: 0;
        }
        .footer-social-link:hover {
          background: var(--ladex-gold); border-color: var(--ladex-gold);
          color: var(--ladex-black); transform: translateY(-4px);
        }

        .footer-col h4 {
          font-size: 0.8rem; font-weight: 900; text-transform: uppercase;
          letter-spacing: 0.2em; color: #fff; margin-bottom: 1.5rem;
          padding-bottom: 0.75rem; border-bottom: 1px solid rgba(255,255,255,.08);
        }
        .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 0.9rem; }
        .footer-col ul li a {
          color: rgba(255,255,255,.45); transition: all .2s;
          font-weight: 500; font-size: 0.9rem; display: inline-flex; align-items: center; gap: 0.4rem;
        }
        .footer-col ul li a:hover { color: var(--ladex-gold); transform: translateX(4px); }

        .footer-contact-item { display: flex; gap: 1rem; margin-bottom: 1.25rem; }
        .footer-contact-icon { font-size: 1rem; flex-shrink: 0; color: var(--ladex-gold); margin-top: 2px; }
        .footer-contact-val { color: rgba(255,255,255,.5); line-height: 1.6; font-weight: 500; font-size: 0.9rem; }
        .footer-contact-val strong { display: block; color: rgba(255,255,255,.8); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 2px; }
        .footer-contact-val a { color: rgba(255,255,255,.5); transition: color .2s; }
        .footer-contact-val a:hover { color: var(--ladex-gold); }

        .footer-bottom {
          padding: 2rem 0;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 1.5rem;
          font-size: 0.82rem; color: rgba(255,255,255,.3);
        }
        .footer-bottom-links { display: flex; gap: 2rem; flex-wrap: wrap; }
        .footer-bottom a { color: rgba(255,255,255,.35); transition: color .2s; font-weight: 600; }
        .footer-bottom a:hover { color: var(--ladex-gold); }

        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 3rem; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          .footer-main { padding: 3.5rem 0 3rem; }
        }
      `}</style>

      <footer className="footer">
        <div className="footer-main">
          <div className="container">
            <div className="footer-grid">

              {/* Brand */}
              <div>
                <div className="footer-logo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logo.png" alt="Ladex Group Logo" className="footer-logo-img" />
                  <div>
                    <div className="footer-logo-name">Ladex Group</div>
                    <div className="footer-logo-sub">Europe to Africa</div>
                  </div>
                </div>
                <p className="footer-brand-desc">
                  Germany-based procurement and export company supplying high-quality European equipment and solutions to Nigeria and West Africa. Quality Without Compromise.
                </p>
                <div className="footer-socials">
                  <a href={linkedin} target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="LinkedIn" title="LinkedIn">in</a>
                  <a href={`https://wa.me/${whatsappNG.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="WhatsApp" title="WhatsApp">wa</a>
                  <a href={`mailto:${email}`} className="footer-social-link" aria-label="Email" title="Email">@</a>
                </div>
              </div>

              {/* Services */}
              <div className="footer-col">
                <h4>Our Services</h4>
                <ul>
                  {NAV.Services.map(l => (
                    <li key={l.label}><Link href={l.href}>{l.label}</Link></li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div className="footer-col">
                <h4>Company</h4>
                <ul>
                  {NAV.Company.map(l => (
                    <li key={l.label}><Link href={l.href}>{l.label}</Link></li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div className="footer-col">
                <h4>Contact</h4>

                <div className="footer-contact-item">
                  <span className="footer-contact-icon">✉</span>
                  <div className="footer-contact-val">
                    <strong>Email</strong>
                    <a href={`mailto:${email}`}>{email}</a>
                  </div>
                </div>

                <div className="footer-contact-item">
                  <span className="footer-contact-icon">🇩🇪</span>
                  <div className="footer-contact-val">
                    <strong>Germany</strong>
                    <a href={`tel:${phoneDE.replace(/\s/g, '')}`}>{phoneDE}</a>
                  </div>
                </div>

                <div className="footer-contact-item">
                  <span className="footer-contact-icon">🇳🇬</span>
                  <div className="footer-contact-val">
                    <strong>Nigeria (WhatsApp)</strong>
                    <a href={`https://wa.me/${whatsappNG.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">{whatsappNG}</a>
                  </div>
                </div>

                <div className="footer-contact-item">
                  <span className="footer-contact-icon">📞</span>
                  <div className="footer-contact-val">
                    <strong>Nigeria (Phone)</strong>
                    <a href={`tel:${phoneNG}`}>{phoneNG}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="footer-bottom">
            <span>© {year} Ladex Group. All rights reserved. Registered in Germany.</span>
            <div className="footer-bottom-links">
              <Link href="/contact">Contact Us</Link>
              <Link href="/about">About</Link>
              <Link href="/services">Services</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
