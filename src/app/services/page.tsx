import type { Metadata } from 'next';
import Link from 'next/link';
import Icon from '@/components/Icon';

export const metadata: Metadata = {
  title: 'Our Services | Ladex Group – Equipment Sourcing, Technical Representation & More',
  description: 'Ladex Group provides equipment sourcing, technical representation, engineering consulting, inspection and agricultural solutions from Europe to Nigeria and West Africa.',
};

const SERVICES = [
  {
    icon: 'package',
    image: '/sectors/construction.jpg?v=2',
    title: 'Equipment Sourcing and Supply',
    desc: 'We source and supply genuine European and American equipment directly to clients in Nigerian and West African. From supplier identification to delivery, we manage the full procurement process.',
    products: [
      'Electrical testing and diagnostic equipment',
      'Industrial automation and PLC components',
      'Solar and battery storage systems',
      'Protection relays and substation equipment',
      'NDT and structural inspection equipment',
      'Cables and wiring systems',
      'Switchgear and electrical distribution',
      'Power quality analysers',
    ],
    cta: 'Enquire About Equipment',
  },
  {
    icon: 'handshake',
    image: '/sectors/automation.jpg?v=2',
    title: 'Technical Representation',
    desc: 'We act as a technical partner for European and American manufacturers in Nigeria and West Africa, supporting market entry, client engagement, and after-sales service.',
    products: [
      'Product specification support',
      'Technical advisory and selection guidance',
      'Client introduction and market development',
      'After-sales support and warranty coordination',
    ],
    cta: 'Learn More',
  },
  {
    icon: 'settings',
    image: '/sectors/power-electrical.jpg?v=2',
    title: 'Engineering Consulting & Project Support',
    desc: 'We support infrastructure and industrial projects by coordinating complete equipment solutions from specification to delivery.',
    products: [
      'Equipment specification and supplier selection',
      'BOQ pricing and quotation',
      'Logistics coordination and shipping',
      'Import documentation support',
      'Installation and commissioning coordination',
    ],
    cta: 'Discuss Your Project',
  },
  {
    icon: 'shield',
    image: '/sectors/mining.jpg?v=2',
    title: 'Inspection & Procurement Services',
    desc: 'We provide pre-shipment inspection and general procurement services to ensure quality, compliance and accuracy before delivery.',
    products: [
      'Physical inspection before shipment',
      'We also support procurement of selected European products including industrial vehicles and specialized equipment based on client requirements.',
      'Verification against specifications',
      'Detailed inspection reports with photos',
      'Coordination with logistics partners',
    ],
    cta: 'Get an Inspection Quote',
  },
  {
    icon: 'leaf',
    image: '/sectors/agriculture.jpg?v=2',
    title: 'Agricultural & Poultry Solutions',
    desc: 'We facilitate the sourcing and delivery of:',
    products: [
      'Layers and broiler hatching eggs from certified European hatcheries',
      'Agricultural equipment and processing systems',
      'Technical support and documentation for import and handling',
    ],
    afterText: 'Our network ensures that all products meet international health and quality standards, with proper logistics coordination to maintain product integrity during transport.',
    cta: 'Enquire About Agricultural Products',
  },
];

import { getServices, getStrapiMediaUrl } from '@/lib/api';

export default async function ServicesPage() {
  const strapiServices = await getServices();
  let displayServices = SERVICES;
  
  if (strapiServices.length > 0) {
    displayServices = strapiServices.map(s => ({
      icon: s.icon || 'settings',
      image: s.image?.url ? getStrapiMediaUrl(s.image.url) : '/sectors/construction.jpg',
      title: s.title,
      desc: s.description || '',
      products: Array.isArray(s.included_items) ? s.included_items : [],
      cta: 'Get a Quote',
      afterText: undefined
    }));
  }

  return (
    <>
      <style>{`
        .service-hero {
          background: var(--ladex-black); padding: 6rem 0 5rem;
          position: relative; overflow: hidden;
        }
        .service-hero::after {
          content: ''; position: absolute; right: -5%; top: -20%;
          width: 45%; height: 140%; background: var(--ladex-gold); opacity: 0.03;
          transform: rotate(-15deg); border-radius: 40px; pointer-events: none;
        }
        .service-hero h1 { color: #fff; font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 900; text-transform: uppercase; letter-spacing: -0.03em; margin-bottom: 1.25rem; line-height: 1.05; }
        .service-hero p { color: rgba(255,255,255,.5); font-size: 1.1rem; font-weight: 500; max-width: 620px; line-height: 1.8; }

        .services-list { padding: 5rem 0; display: flex; flex-direction: column; gap: 3rem; }

        .service-item { display: grid; grid-template-columns: minmax(300px, 1fr) 1.5fr; gap: 4rem; padding: 4rem 0; border-bottom: 1px solid var(--border); align-items: center; }
        .service-item:last-child { border-bottom: none; }
        
        .service-item-left { position: relative; width: 100%; aspect-ratio: 4/5; overflow: hidden; border-radius: var(--radius-sm); }
        .service-img-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(15,15,15,0.95), rgba(15,15,15,0.2)); }
        .service-item-left-content { position: absolute; bottom: 2rem; left: 2.5rem; right: 2.5rem; }
        .service-icon { margin-bottom: 1rem; color: var(--ladex-gold); }
        .service-num { font-size: 0.85rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.25em; color: var(--ladex-gold); margin-bottom: 0.75rem; }
        .service-item-left h2 { font-size: 1.75rem; font-weight: 900; line-height: 1.15; margin: 0; color: #fff; text-transform: uppercase; }

        .service-item-right { padding-top: 1rem; }
        .service-item-right p { font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary); margin-bottom: 2rem; max-width: 540px; }
        
        .includes-label { font-size: 0.8rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.15em; color: var(--text-primary); margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid var(--ladex-gold); display: inline-block; }
        .product-list { list-style: none; display: grid; grid-template-columns: 1fr; gap: 0.85rem; margin-bottom: 2.5rem; }
        .product-item { font-size: 0.95rem; color: var(--text-muted); display: flex; align-items: flex-start; gap: 0.75rem; line-height: 1.5; }
        .svc-li-dot { width: 6px; height: 6px; background: var(--ladex-gold); border-radius: 50%; margin-top: 6px; flex-shrink: 0; }
        
        .svc-actions { margin-top: 2.5rem; }

        .how-banner { background: var(--bg-off); border-top: 1px solid var(--border); padding: 5rem 0; }
        .how-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-top: 3rem; }
        .how-step { text-align: center; padding: 2.5rem 2rem; }
        .how-step-num { width: 52px; height: 52px; border-radius: 50%; background: var(--ladex-gold); color: var(--ladex-black); font-weight: 900; font-size: 1.25rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem; }
        .how-step h3 { font-size: 1.05rem; font-weight: 900; text-transform: uppercase; margin-bottom: 0.5rem; }
        .how-step p { font-size: 0.9rem; color: var(--text-muted); line-height: 1.7; }

        @media (max-width: 1024px) {
          .service-item { gap: 2.5rem; }
        }
        @media (max-width: 900px) {
          .service-item { grid-template-columns: 1fr; gap: 2rem; }
          .service-item-left { aspect-ratio: 16/9; }
          .service-item-left h2 { font-size: 1.5rem; }
          .service-item-left-content { bottom: 1.5rem; left: 1.5rem; right: 1.5rem; }
        }
      `}</style>

      {/* Hero */}
      <div className="service-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: '2rem' }}>
            <Link href="/" style={{ color: 'var(--ladex-gold)', fontWeight: 800 }}>Home</Link>
            <span className="breadcrumb-sep" style={{ color: 'rgba(255,255,255,.2)' }}>›</span>
            <span style={{ color: '#fff' }}>Services</span>
          </nav>
          <h1>Our Services</h1>
          <p>From equipment sourcing and technical representation to full project support — we manage the entire process from European supplier to your door in Nigeria and West Africa.</p>
        </div>
      </div>

      {/* Services List */}
      <div className="container">
        <div className="services-list">
          {displayServices.map((svc, i) => (
            <div key={svc.title} className="service-item fade-up">
              <div className="service-item-left">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={svc.image} alt={svc.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                <div className="service-img-overlay" />
                <div className="service-item-left-content">
                    <div className="service-icon"><Icon name={svc.icon as any} size={32} /></div>
                    <div className="service-num">Service {String(i + 1).padStart(2, '0')}</div>
                    <h2>{svc.title}</h2>
                </div>
              </div>
              <div className="service-item-right">
                <p>{svc.desc}</p>
                <div className="includes-label">What&apos;s Included</div>
                <ul className="product-list">
                  {svc.products.map(p => (
                    <li key={p} className="product-item">
                      <span className="svc-li-dot" />
                      {p}
                    </li>
                  ))}
                </ul>
                {svc.afterText && <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.7' }}>{svc.afterText}</p>}
                <div className="svc-actions">
                  <Link href="/contact" className="btn btn-dark">{svc.cta} →</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="how-banner">
        <div className="container">
          <p className="section-eyebrow text-center" style={{ justifyContent: 'center' }}>Our Process</p>
          <h2 className="section-title text-center">How It Works</h2>
          <p className="section-lead text-center" style={{ margin: '0 auto' }}>Simple, transparent and reliable — from first contact to delivery.</p>
          <div className="how-steps">
            <div className="how-step">
              <div className="how-step-num">1</div>
              <h3>Share Your Requirement</h3>
              <p>Tell us what you need — specification, quantity and timeline. The more detail, the faster we can act.</p>
            </div>
            <div className="how-step">
              <div className="how-step-num">2</div>
              <h3>We Source &amp; Quote</h3>
              <p>We identify the best European supplier and provide a competitive, itemised quotation within agreed timelines.</p>
            </div>
            <div className="how-step">
              <div className="how-step-num">3</div>
              <h3>We Deliver</h3>
              <p>We manage procurement, export documentation, quality inspection and shipping to your destination.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: 'var(--ladex-black)', padding: '5rem 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2.5rem' }}>
          <div style={{ maxWidth: '580px' }}>
            <h2 style={{ color: '#fff', marginBottom: '1rem', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>Have a Specific Requirement?</h2>
            <p style={{ color: 'rgba(255,255,255,.5)', margin: 0, fontSize: '1.05rem', lineHeight: 1.8 }}>
              Contact us with your specification. We will identify the right supplier and provide a competitive quotation — no obligation.
            </p>
          </div>
          <Link href="/contact" className="btn btn-primary btn-lg">Get a Quote</Link>
        </div>
      </div>
    </>
  );
}
