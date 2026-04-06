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
  const phoneNG = settings?.contact_phone || '+234 704 058 0988';
  const whatsappNG = '+234 706 960 6542'; // Explicitly preserved per brief if needed via whatsapp field later
  const phoneDE = '+49 1521 816 2816';

  const displayItems = [
    {
      icon: '✉', label: 'Email', value: email, href: `mailto:${email}`,
      note: 'We respond within 48 business hours',
    },
    {
      icon: '🇩🇪', label: 'Germany', value: phoneDE, href: `tel:${phoneDE.replace(/\s+/g, '')}`,
      note: 'European Operations',
    },
    {
      icon: '🇳🇬', label: 'Nigeria (WhatsApp)', value: whatsappNG, href: `https://wa.me/${whatsappNG.replace(/\D/g, '')}`,
      note: 'Click to open WhatsApp', external: true,
    },
    {
      icon: '📞', label: 'Nigeria (Phone)', value: phoneNG, href: `tel:${phoneNG.replace(/\s+/g, '')}`,
      note: 'Ibadan & Lagos operations',
    },
  ];

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
        <Image src="/hero/hero_power.jpg" alt="Ladex Group Contact" fill sizes="100vw" style={{ objectFit: 'cover', opacity: 0.45 }} priority />
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

            <div className="info-section">
              <div className="info-section-title">
                <Icon name="mail-open" size={18} /> Contact Channels
              </div>
              <div className="contact-card">
                {displayItems.map((c) => (
                  <div key={c.label} className="contact-card-item">
                    <div className="ccard-icon">{c.icon}</div>
                    <div>
                      <div className="ccard-label">{c.label}</div>
                      <div className="ccard-value">
                        <a href={c.href} target={c.external ? '_blank' : undefined} rel={c.external ? 'noopener noreferrer' : undefined}>
                          {c.value}
                        </a>
                      </div>
                      <div className="ccard-note">{c.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
