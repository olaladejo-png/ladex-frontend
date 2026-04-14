import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import HeroCarousel from '@/components/HeroCarousel';
import { getCarousels, getAboutPage } from '@/lib/api';
import Icon, { IconName } from '@/components/Icon';

export const metadata: Metadata = {
  title: 'Ladex Group – Quality Without Compromise. Europe to Africa.',
  description: 'Germany-based procurement and export company supplying high-quality equipment and solutions from leading European manufacturers to Africa and other international markets.',
};
export const revalidate = 60;

const WHY_US = [
  { icon: 'globe', title: 'Germany Based', desc: 'Direct access to European manufacturers and distribution networks' },
  { icon: 'graduation-cap', title: 'Technically Qualified', desc: 'MSc in Electrical Engineering' },
  { icon: 'map-pin', title: 'Nigeria Presence', desc: 'Operations in Ibadan and Lagos' },
  { icon: 'handshake', title: 'Customer Focus', desc: 'End-to-end support from enquiry to delivery' },
  { icon: 'package', title: 'Complete Service', desc: 'Sourcing, logistics, and after-sales support' },
];

const SECTORS = [
  { slug: 'oil-and-gas', image: '/sectors/oil-gas.jpg', title: 'Oil & Gas', desc: 'Instrumentation, valves, safety and process equipment for upstream and downstream oil & gas operations.' },
  { slug: 'power-electrical-systems', image: '/sectors/power-electrical.jpg', title: 'Power & Electrical Systems', desc: 'Protection relays, switchgear, power analysers, substation equipment and cables from leading European manufacturers.' },
  { slug: 'automation-control-systems', image: '/sectors/automation.jpg', title: 'Automation & Control Systems', desc: 'PLCs, SCADA systems and automation equipment for process industries and manufacturing facilities.' },
  { slug: 'instrumentation-metering-systems', image: '/sectors/instrumentation-metering.jpg', title: 'Instrumentation & Metering Systems', desc: 'Precision flow, level, pressure and temperature instruments for accurate measurement and process control.' },
  { slug: 'construction-infrastructure', image: '/sectors/construction.jpg', title: 'Construction & Infrastructure', desc: 'High-grade equipment for civil, structural and infrastructure projects across West Africa.' },
  { slug: 'manufacturing-heavy-industry', image: '/sectors/manufacturing-heavy-industry.jpg', title: 'Manufacturing & Heavy Industry', desc: 'Industrial motors, drives, conveyors and process equipment for manufacturing plants and heavy industry.' },
  { slug: 'telecommunications', image: '/sectors/telecommunications.jpg', title: 'Telecommunications', desc: 'Fibre optic cables, network infrastructure, power systems and passive components for telecom operators.' },
  { slug: 'mining-extractives', image: '/sectors/mining-extractives.png', title: 'Mining & Extractives', desc: 'Robust European equipment for mining, quarrying and extractive industry operations in demanding environments.' },
  { slug: 'healthcare-pharmaceuticals', image: '/sectors/healthcare-pharmaceuticals.jpg', title: 'Healthcare & Pharmaceuticals', desc: 'Certified European medical, laboratory and pharmaceutical equipment with full manufacturer documentation.' },
  { slug: 'agriculture-agro-processing', image: '/sectors/agriculture.jpg', title: 'Agriculture & Agro-processing', desc: 'Hatching eggs from certified European hatcheries, agricultural equipment and agro-processing systems.' },
];


const HOW_IT_WORKS = [
  { num: '01', title: 'Tell us what you need', desc: 'Share your requirement, specification, quantity and delivery timeline.' },
  { num: '02', title: 'We source and quote', desc: 'We identify the best European supplier and provide a competitive quotation.' },
  { num: '03', title: 'We deliver', desc: 'We manage procurement, export documentation, and shipping to your destination.' },
];

export default async function HomePage() {
  const carousels = await getCarousels();

  const aboutPage = await getAboutPage();
  const dynamicMission = aboutPage?.mission || 'To bridge the gap between European excellence and global opportunity; delivering premium products, technical expertise and reliable trade solutions to West African and international markets.';
  const dynamicVision = aboutPage?.vision || 'To become the most trusted gateway connecting global businesses with European and American industrial solutions.';

  return (
    <>
      <style>{`
        /* Stats */
        .stats-strip { background: #fff; border-bottom: 1px solid var(--border); }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); }
        .stat-item { padding: 2.25rem 1.25rem; text-align: center; border-right: 1px solid var(--border); }
        .stat-item:last-child { border-right: none; }
        .stat-number { font-size: clamp(2rem, 4vw, 2.75rem); font-weight: 800; color: var(--ladex-gold); letter-spacing: -0.04em; line-height: 1; margin: 0.75rem 0 0.5rem; }
        .stat-label { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); font-weight: 700; }

        /* Sectors */
        .sectors-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-top: 3.5rem; }
        .sector-card { background: #fff; border: 1px solid var(--border); overflow: hidden; border-radius: 4px; display: flex; flex-direction: column; transition: all .4s var(--ease-out-expo); text-decoration: none; }
        .sector-card:hover { border-color: var(--ladex-gold); transform: translateY(-8px); box-shadow: 0 30px 60px rgba(0,0,0,0.08); }
        .sector-card-img { aspect-ratio: 16/10; position: relative; overflow: hidden; background: var(--ladex-black); }
        .sector-card-img img { transition: transform 1.2s var(--ease-out-expo); filter: grayscale(20%); width: 100%; height: 100%; object-fit: cover; }
        .sector-card:hover .sector-card-img img { transform: scale(1.08); filter: grayscale(0%); }
        .sector-card-body { padding: 2rem; flex: 1; display: flex; flex-direction: column; }
        .sector-title { font-size: 1.1rem; font-weight: 800; margin: 0 0 0.5rem; color: var(--text-primary); text-transform: uppercase; letter-spacing: 0.02em; }
        .sector-desc { font-size: 0.88rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 1.25rem; flex: 1; }
        .sector-cta { font-size: 0.78rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: var(--ladex-gold); display: inline-flex; align-items: center; gap: 0.4rem; transition: gap .2s; }
        .sector-card:hover .sector-cta { gap: 0.7rem; }

        /* Why us */
        .why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-top: 3rem; }
        @media (max-width: 900px) { .why-grid { grid-template-columns: repeat(2, 1fr); } }
        .why-card { background: #fff; border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 2.5rem 2rem; transition: all .3s var(--ease-out-expo); position: relative; overflow: hidden; }
        .why-card::before { content: ''; position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: var(--ladex-gold); transform: scaleY(0); transform-origin: top; transition: transform .3s var(--ease-out-expo); }
        .why-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-6px); }
        .why-card:hover::before { transform: scaleY(1); }
        .why-card h3 { font-size: 1.1rem; font-weight: 800; text-transform: uppercase; margin: 1rem 0 0.5rem; }
        .why-card p { font-size: 0.9rem; color: var(--text-muted); line-height: 1.75; }

        /* How it works Restyled */
        .how-section { background: #0a0a0a; padding: 7rem 0 8rem; position: relative; overflow: hidden; }
        
        .how-section::before { 
          content: ''; position: absolute; width: 60vw; height: 60vw; top: -10vw; right: -10vw;
          background: radial-gradient(circle, rgba(201,162,39,0.08) 0%, transparent 60%); 
          border-radius: 50%; pointer-events: none; 
          animation: floatOrb 15s ease-in-out infinite alternate;
        }
        @keyframes floatOrb {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-50px, 50px) scale(1.1); }
        }

        .how-grid { 
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; 
          margin-top: 5rem; position: relative; z-index: 2; 
        }

        .how-grid::before {
          content: ''; position: absolute; top: 48px; left: 16%; right: 16%; height: 2px;
          background: linear-gradient(90deg, transparent, rgba(201,162,39,0.3) 20%, rgba(201,162,39,0.3) 80%, transparent);
          z-index: -1;
        }

        .how-step { 
          padding: 3rem 2.5rem; background: rgba(255,255,255,0.02); 
          border: 1px solid rgba(255,255,255,0.04); border-radius: 16px; 
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative; overflow: hidden; text-align: left;
        }
        
        .how-step::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(201,162,39,0.05), transparent);
          opacity: 0; transition: opacity 0.5s; pointer-events: none;
        }

        .how-step:hover { 
          transform: translateY(-8px); 
          border-color: rgba(201,162,39,0.3);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05);
        }
        .how-step:hover::after { opacity: 1; }

        .how-num { 
          font-size: 1.25rem; font-weight: 900; color: var(--ladex-gold); 
          width: 56px; height: 56px; line-height: 56px; text-align: center;
          background: rgba(201,162,39,0.1); border: 1px solid rgba(201,162,39,0.25);
          border-radius: 50%; margin-bottom: 2rem; margin-inline: auto;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .how-step:hover .how-num {
          background: var(--ladex-gold); color: var(--ladex-black);
          box-shadow: 0 0 20px rgba(201,162,39,0.3); transform: scale(1.1);
        }

        .how-step { text-align: center; }

        .how-title { font-size: 1.2rem; font-weight: 800; color: #fff; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: -0.01em; }
        .how-desc { font-size: 0.95rem; color: rgba(255,255,255,0.6); line-height: 1.8; }

        /* About split */
        .about-split { padding: 7rem 0; background: var(--bg-off); }
        .about-split-inner { display: grid; grid-template-columns: 5fr 6fr; gap: 5rem; align-items: center; max-width: var(--container); margin: 0 auto; padding: 0 1.5rem; }
        .about-image-panel { position: relative; border-radius: var(--radius-sm); overflow: hidden; box-shadow: var(--shadow-xl); aspect-ratio: 4/5; }
        .about-content-panel { display: flex; flex-direction: column; justify-content: center; }
        .about-content-panel h2 { color: var(--text-primary); margin-bottom: 1.5rem; font-size: clamp(1.75rem, 3.5vw, 2.75rem); }
        .about-content-panel p { margin-bottom: 1.5rem; font-size: 1.05rem; color: var(--text-secondary); line-height: 1.85; }
        .about-line { background: var(--ladex-gold); width: 64px; height: 4px; border-radius: 0; margin-bottom: 2rem; }

        /* Mission / Vision */
        .mv-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 3rem; }
        .mv-card { padding: 3rem 2.5rem; border-radius: var(--radius-sm); border: 1px solid var(--border); }
        .mv-card-mission { background: var(--ladex-black); }
        .mv-card-vision { background: #fff; }
        .mv-eyebrow { font-size: 0.7rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.2em; color: var(--ladex-gold); margin-bottom: 0.75rem; }
        .mv-card-mission h3, .mv-card-mission p { color: #fff; }
        .mv-card-mission p { color: rgba(255,255,255,.65); }
        .mv-card h3 { font-size: 1.25rem; font-weight: 900; margin-bottom: 1rem; text-transform: uppercase; }
        .mv-card p { font-size: 0.95rem; line-height: 1.8; color: var(--text-muted); }

        /* Quote */
        .quote-section { background: var(--ladex-gold); padding: 5rem 0; }
        .quote-wrap { max-width: 860px; margin: 0 auto; text-align: center; }
        .quote-mark { font-size: 5rem; line-height: 0.6; color: rgba(15,15,15,0.12); font-family: 'Montserrat', sans-serif; font-weight: 900; display: block; margin-bottom: 1rem; }
        .quote-text { font-size: clamp(1.2rem, 2.2vw, 1.6rem); color: var(--ladex-black); font-weight: 700; line-height: 1.55; margin-bottom: 2rem; font-family: 'Montserrat', sans-serif; }
        .quote-author { font-size: 0.85rem; color: var(--ladex-black); font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; }
        .quote-author span { display: block; font-size: 1rem; font-weight: 900; margin-bottom: 0.2rem; }

        /* Partners */
        .partners-strip { padding: 6rem 0; background: #fff; overflow: hidden; border-top: 1px solid var(--border); }
        .partner-logo-hm { filter: grayscale(100%) contrast(150%) brightness(50%); transition: all 0.3s; display: flex; align-items: center; justify-content: center; padding: 0 5rem; flex-shrink: 0; }
        .partner-logo-hm:hover { filter: grayscale(0%); transform: scale(1.08); }

        /* Brands */
        .brands-section { padding: 5rem 0; background: var(--ladex-black); border-top: 1px solid rgba(255,255,255,0.06); }
        .brands-header { text-align: center; margin-bottom: 3rem; }
        .brands-header p { font-size: 0.8rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.2em; color: var(--ladex-gold); margin-bottom: 0.75rem; }
        .brands-header h2 { font-size: clamp(1.5rem, 2.5vw, 2rem); color: #fff; font-weight: 800; margin: 0; }
        .brands-ticker-wrap { overflow: hidden; position: relative; }
        .brands-ticker-wrap::before, .brands-ticker-wrap::after { content: ''; position: absolute; top: 0; bottom: 0; width: 120px; z-index: 2; pointer-events: none; }
        .brands-ticker-wrap::before { left: 0; background: linear-gradient(to right, var(--ladex-black), transparent); }
        .brands-ticker-wrap::after { right: 0; background: linear-gradient(to left, var(--ladex-black), transparent); }
        .brands-ticker { display: flex; width: max-content; animation: brandScroll 35s linear infinite; }
        .brands-ticker:hover { animation-play-state: paused; }
        @keyframes brandScroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .brand-pill { display: inline-flex; align-items: center; padding: 0.6rem 1.75rem; margin: 0 0.5rem; border: 1px solid rgba(201,162,39,0.2); border-radius: 2rem; white-space: nowrap; font-size: 0.9rem; font-weight: 700; color: rgba(255,255,255,0.55); letter-spacing: 0.02em; transition: all 0.3s; cursor: default; }
        .brand-pill:hover { color: var(--ladex-gold); border-color: var(--ladex-gold); background: rgba(201,162,39,0.06); }
        .brands-note { text-align: center; margin-top: 2rem; font-size: 0.85rem; color: var(--text-muted); }

        /* CTA */
        .cta-full { position: relative; overflow: hidden; background: var(--ladex-black); padding: 7rem 0; }
        .cta-full::before { content: ''; position: absolute; width: 600px; height: 600px; border-radius: 50%; background: rgba(201,162,39,0.06); top: -250px; right: -150px; pointer-events: none; }
        .cta-full-inner { max-width: 680px; }
        .cta-full h2 { color: #fff; margin-bottom: 1.5rem; font-size: clamp(2rem, 5vw, 3.5rem); }
        .cta-full p { color: rgba(255,255,255,.55); font-size: 1.15rem; line-height: 1.8; margin-bottom: 3rem; }
        .cta-full-actions { display: flex; gap: 1.25rem; flex-wrap: wrap; }

        /* Responsive */
        @media (max-width: 1024px) {
          .sectors-grid { grid-template-columns: repeat(2, 1fr); }
          .how-grid { grid-template-columns: 1fr 1fr; }
          .about-split-inner { grid-template-columns: 1fr; gap: 3rem; }
          .about-image-panel { aspect-ratio: 16/9; }
        }
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .stat-item:nth-child(2) { border-right: none; }
          .stat-item:nth-child(3) { border-top: 1px solid var(--border); }
          .stat-item:nth-child(4) { border-top: 1px solid var(--border); border-right: none; }
          .why-grid { grid-template-columns: 1fr; }
          .mv-grid { grid-template-columns: 1fr; }
          .cta-full-actions { flex-direction: column; }
        }
        @media (max-width: 600px) {
          .sectors-grid { grid-template-columns: 1fr; }
          .how-grid { grid-template-columns: 1fr; }
          .stats-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      {/* Hero */}
      <HeroCarousel slides={carousels} />

      {/* Who We Are */}
      <div className="about-split">
        <div className="about-split-inner">
          <div className="about-image-panel fade-up">
            <Image src="/hero/hero_whoweare.jpg" alt="Ladex Group Germany-Nigeria operations" fill sizes="(max-width:1024px) 100vw, 45vw" style={{ objectFit: 'cover' }} />
          </div>
          <div className="about-content-panel fade-up stagger-1">
            <p className="section-eyebrow">Who We Are</p>
            <div className="about-line" />
            <h2>Rooted in Engineering. Built for Trade.</h2>
            <p>Ladex Group is a Germany-based procurement and export company supplying high-quality equipment and solutions from leading European manufacturers to Africa and other international markets.</p>
            <p>With operations in Germany and Nigeria, we combine direct access to European supply chains with on-ground technical support and delivery coordination globally.</p>
            <div style={{ marginTop: '2rem' }}>
              <Link href="/about" className="btn btn-dark">Learn More About Us →</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="section">
        <div className="container">
          <p className="section-eyebrow">Purpose</p>
          <h2 className="section-title">Our Mission &amp; Vision</h2>
          <div className="mv-grid">
            <div className="mv-card mv-card-mission">
              <div className="mv-eyebrow">Our Mission</div>
              <h3>Bridging European Excellence &amp; African Opportunity</h3>
              <p>{dynamicMission}</p>
            </div>
            <div className="mv-card mv-card-vision">
              <div className="mv-eyebrow" style={{ color: 'var(--ladex-gold)' }}>Our Vision</div>
              <h3>West Africa&apos;s Trusted Gateway</h3>
              <p>{dynamicVision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors We Serve */}
      <section className="section bg-off">
        <div className="container">
          <p className="section-eyebrow">Industries</p>
          <h2 className="section-title">Sectors We Serve</h2>
          <p className="section-lead">We supply equipment and solutions across a broad range of critical industries throughout Nigeria and West Africa.</p>
          <div className="sectors-grid">
            {SECTORS.map((s) => (
              <Link key={s.title} href={`/sectors#${s.slug}`} className="sector-card">
                <div className="sector-card-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.image} alt={s.title} loading="lazy" />
                </div>
                <div className="sector-card-body">
                  <h3 className="sector-title">{s.title}</h3>
                  <p className="sector-desc">{s.desc}</p>
                  <span className="sector-cta">Get a Quote →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section">
        <div className="container">
          <p className="section-eyebrow">Why Choose Us</p>
          <h2 className="section-title">The Ladex Advantage</h2>
          <p className="section-lead">Five reasons why leading organisations across Nigeria and West Africa trust Ladex Group.</p>
          <div className="why-grid">
            {WHY_US.map((w) => (
              <div key={w.title} className="why-card">
                <div style={{ color: 'var(--ladex-gold)' }}><Icon name={w.icon as IconName} size={40} /></div>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <div className="how-section">
        <div className="container">
          <p className="section-eyebrow fade-up" style={{ color: 'var(--ladex-gold)' }}>Process</p>
          <h2 className="fade-up stagger-1" style={{ color: '#fff', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>How It Works</h2>
          <div className="how-grid fade-up stagger-2">
            {HOW_IT_WORKS.map((s) => (
              <div key={s.num} className="how-step">
                <div className="how-num">{s.num}</div>
                <div className="how-title">{s.title}</div>
                <div className="how-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>



      {/* Brands */}
      <div className="brands-section">
        <div className="brands-header">
          <p>Trusted Manufacturers</p>
          <h2>Brands We Source</h2>
        </div>
        <div className="brands-ticker-wrap">
          {(() => {
            const brands = [
              'ABB','Beckhoff','Danfoss','Eaton','Endress+Hauser','Festo','Fluke',
              'Fronius','Hager','Janitza','Lapp Group','Legrand','Megger','OMICRON',
              'Pepperl+Fuchs','Phoenix Contact','Pilz','Rittal','Schneider Electric',
              'Screening Eagle Technologies','Siemens','SKF','SMA Solar','WAGO',
            ];
            const pills = brands.map(b => <span key={b} className="brand-pill">{b}</span>);
            return (
              <div className="brands-ticker">
                {pills}{pills}
              </div>
            );
          })()}
        </div>
        <p className="brands-note">…and many more leading European and American manufacturers.</p>
      </div>

      {/* CTA */}
      <div className="cta-full">
        <div className="container">
          <div className="cta-full-inner">
            <p className="section-eyebrow" style={{ color: 'var(--ladex-gold)' }}>Get Started</p>
            <h2>Ready to Source European Equipment?</h2>
            <p>Tell us your requirement, specification and timeline. We handle the rest — from supplier identification to delivery in Nigeria and West Africa.</p>
            <div className="cta-full-actions">
              <Link href="/contact" className="btn btn-primary btn-lg">Get a Quote</Link>
              <Link href="/services" className="btn btn-outline-white btn-lg">Our Services →</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
