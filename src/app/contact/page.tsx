import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/Icon';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Ladex Group – Get a Quote',
  description: 'Contact Ladex Group to source European equipment, request a quotation or discuss your project. We respond within 48 business hours.',
};

import { getGlobalSettings } from '@/lib/api';

export default async function ContactPage() {
  const settings = await getGlobalSettings();

  const email = settings?.contact_email || 'sales@ladexgroup.com';
  const phoneDE = '+49 1521 816 2816';
  const whatsappNG = '+2347069606542';
  const phoneNG = '+2347040580988';

  return (
    <>
      <style>{`
        .contact-hero {
          background: #0a0a0a; color: #fff;
          padding: 6.5rem 0 5.5rem; position: relative; overflow: hidden;
        }
        .contact-hero-content { position: relative; z-index: 10; }
        .contact-hero h1 { color: #fff; font-size: clamp(2rem, 5vw, 3.25rem); font-weight: 900; letter-spacing: -0.04em; margin-bottom: 1.25rem; max-width: 700px; line-height: 1; text-transform: uppercase; text-shadow: 0 4px 20px rgba(0,0,0,0.6); }
        .contact-hero p { color: rgba(255,255,255,.7); max-width: 560px; line-height: 1.8; font-size: 1.05rem; text-shadow: 0 2px 10px rgba(0,0,0,0.5); }

        .contact-layout {
          display: grid; grid-template-columns: 1fr 400px; gap: 4rem;
          padding: 5rem 0 6rem;
        }

        .form-panel {
          background: #fff; padding: 3.5rem; border-radius: var(--radius-sm);
          box-shadow: 0 24px 48px rgba(0,0,0,0.08); border: 1px solid var(--border);
          transform: translateY(-8rem); z-index: 10; position: relative;
        }
        .form-eyebrow { font-size: 0.75rem; font-weight: 900; text-transform: uppercase; color: var(--ladex-gold); letter-spacing: 0.2em; margin-bottom: 0.75rem; }
        .form-title { font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 900; margin-bottom: 2.5rem; color: var(--ladex-black); text-transform: uppercase; }

        .info-sidebar { padding-top: 0; }
        .info-section { margin-bottom: 3rem; }
        .info-section-title {
          display: flex; align-items: center; gap: 0.75rem;
          font-size: 0.78rem; font-weight: 900; text-transform: uppercase;
          color: var(--text-primary); letter-spacing: 0.15em; margin-bottom: 1.25rem;
          padding-bottom: 0.75rem; border-bottom: 2px solid var(--ladex-gold);
        }

        .contact-card { display: flex; flex-direction: column; gap: 1.5rem; }
        .contact-card-item {
          display: flex; gap: 1rem; align-items: flex-start;
          padding: 1.25rem; background: var(--bg-off);
          border-radius: var(--radius-sm); border: 1px solid var(--border);
          transition: border-color .2s;
        }
        .contact-card-item:hover { border-color: var(--ladex-gold); }
        .ccard-icon { font-size: 1.25rem; flex-shrink: 0; }
        .ccard-label { font-size: 0.7rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.12em; color: var(--text-muted); margin-bottom: 2px; }
        .ccard-value a { font-size: 0.95rem; color: var(--text-primary); font-weight: 700; transition: color .2s; }
        .ccard-value a:hover { color: var(--ladex-gold); }
        .ccard-note { font-size: 0.78rem; color: var(--text-muted); margin-top: 2px; }



        .faq-section { background: var(--bg-off); padding: 6rem 0; border-top: 1px solid var(--border); }
        .faq-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 3rem; }
        .faq-item { background: #fff; padding: 2.5rem; border-radius: var(--radius-sm); border: 1px solid var(--border); transition: all .3s; }
        .faq-item:hover { border-color: var(--ladex-gold); transform: translateY(-4px); box-shadow: var(--shadow-md); }
        .faq-q { font-size: 1.05rem; font-weight: 900; color: var(--text-primary); margin-bottom: 1rem; text-transform: uppercase; line-height: 1.25; }
        .faq-a { color: var(--text-muted); line-height: 1.8; font-size: 0.9rem; }

        @media (max-width: 1024px) {
          .contact-layout { grid-template-columns: 1fr; gap: 0; }
          .form-panel { transform: none; margin-top: -4rem; padding: 2.5rem; }
          .info-sidebar { margin-top: 3rem; }
          .contact-layout { padding: 4rem 0 5rem; }
        }
        @media (max-width: 768px) {
          .faq-grid { grid-template-columns: 1fr; }
          .form-panel { padding: 2rem 1.5rem; }
        }
      `}</style>

      {/* Hero */}
      <div className="contact-hero">
        <Image src="/hero/hero_contact.jpg" alt="Ladex Group Contact" fill sizes="100vw" style={{ objectFit: 'cover', opacity: 0.45 }} priority />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom right, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.4) 100%)', zIndex: 5 }} />
        <div className="container contact-hero-content">
          <nav className="breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: '2rem' }}>
            <Link href="/" style={{ color: 'var(--ladex-gold)', fontWeight: 800 }}>Home</Link>
            <span className="breadcrumb-sep" style={{ color: 'rgba(255,255,255,.2)' }}>›</span>
            <span style={{ color: '#fff' }}>Contact</span>
          </nav>
          <h1>Contact Us</h1>
          <p>Whether you require a quotation, technical evaluation, or wish to discuss a strategic partnership, our German and Nigerian teams are ready to respond.</p>
        </div>
      </div>

      <div className="container" style={{ position: 'relative' }}>
        <div className="contact-layout">

          {/* Form */}
          <div className="form-panel">
            <div className="form-eyebrow">Request a Quote</div>
            <h2 className="form-title">Send Us a Message</h2>
            <ContactForm />
          </div>

          {/* Sidebar */}
          <div className="info-sidebar">

            {/* European Operations */}
            <div className="info-section">
              <div className="info-section-title">
                <span>🇩🇪</span> European Operations
              </div>
              <div className="contact-card">
                <div className="contact-card-item">
                  <div className="ccard-icon"><Icon name="map-pin" size={18} /></div>
                  <div>
                    <div className="ccard-label">Location</div>
                    <div className="ccard-value" style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>Munich Area, Bavaria, Germany</div>
                  </div>
                </div>
                <div className="contact-card-item">
                  <div className="ccard-icon"><Icon name="phone" size={18} /></div>
                  <div>
                    <div className="ccard-label">Phone</div>
                    <div className="ccard-value">
                      <a href={`tel:${phoneDE.replace(/\s+/g, '')}`}>{phoneDE}</a>
                    </div>
                  </div>
                </div>
                <div className="contact-card-item">
                  <div className="ccard-icon"><Icon name="mail" size={18} /></div>
                  <div>
                    <div className="ccard-label">Email</div>
                    <div className="ccard-value">
                      <a href={`mailto:${email}`}>{email}</a>
                    </div>
                    <div className="ccard-note">We respond within 48 business hours</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Nigeria Operations */}
            <div className="info-section">
              <div className="info-section-title">
                <span>🇳🇬</span> Nigeria Operations
              </div>
              <div className="contact-card">
                <div className="contact-card-item">
                  <div className="ccard-icon"><Icon name="map-pin" size={18} /></div>
                  <div>
                    <div className="ccard-label">Location</div>
                    <div className="ccard-value" style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>Lagos &amp; Ibadan, Nigeria</div>
                  </div>
                </div>
                <div className="contact-card-item">
                  <div className="ccard-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#25D366' }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </div>
                  <div>
                    <div className="ccard-label">WhatsApp</div>
                    <div className="ccard-value">
                      <a href={`https://wa.me/${whatsappNG.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">{whatsappNG}</a>
                    </div>
                    <div className="ccard-note">Click to open WhatsApp</div>
                  </div>
                </div>
                <div className="contact-card-item">
                  <div className="ccard-icon"><Icon name="phone" size={18} /></div>
                  <div>
                    <div className="ccard-label">Phone</div>
                    <div className="ccard-value">
                      <a href={`tel:${phoneNG}`}>{phoneNG}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
