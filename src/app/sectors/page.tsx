import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sectors We Serve | Ladex Group – European Equipment for Nigeria & West Africa',
  description: 'Ladex Group supplies European equipment across Oil & Gas, Power, Automation, Construction, Mining and Agriculture sectors in Nigeria and West Africa.',
};

const SECTORS = [
  {
    slug: 'oil-and-gas',
    image: '/sectors/oil-gas.jpg',
    title: 'Oil and Gas',
    desc: 'We supply instrumentation, safety, and process equipment to upstream and downstream oil and gas operations across Nigeria and West Africa. Our sourcing covers the full lifecycle of oil and gas projects — from exploration and drilling through to production, refining and distribution.',
    products: [
      'Flow meters and level instruments',
      'Pressure and temperature transmitters',
      'Safety valves and pressure relief systems',
      'Control valves and actuators',
      'Gas detection equipment',
      'Flare ignition and burner systems',
      'NDT inspection equipment',
      'Electrical and instrumentation cables',
      'Junction boxes and control panels',
      'Switchgear and motor control centres',
    ],
  },
  {
    slug: 'power-electrical-instrumentation',
    image: '/sectors/power-electrical.jpg',
    title: 'Power, Electrical & Instrumentation',
    desc: 'We source and supply a wide range of electrical and instrumentation equipment from leading European manufacturers. From power generation and distribution through to substation protection and power quality management, we serve utilities, industrial plants and infrastructure operators.',
    products: [
      'Protection relays and IEDs',
      'Switchgear — LV, MV and HV',
      'Power transformers and distribution transformers',
      'Power quality analysers and meters',
      'Energy management systems',
      'Substation automation equipment',
      'Cables — power, control and instrumentation',
      'Cable management and containment systems',
      'UPS systems and battery banks',
      'Earthing and lightning protection systems',
    ],
  },
  {
    slug: 'automation-control-systems',
    image: '/sectors/automation.jpg',
    title: 'Automation and Control Systems',
    desc: 'We source industrial automation and control equipment from European manufacturers to support process industries, manufacturing facilities and infrastructure operators in Nigeria and West Africa. Our solutions cover everything from individual PLC components to complete SCADA and control system integration.',
    products: [
      'Programmable Logic Controllers (PLCs)',
      'SCADA systems and HMI panels',
      'Variable speed drives and soft starters',
      'Industrial sensors and transducers',
      'Process controllers and regulators',
      'Field buses and industrial networking equipment',
      'Motor control centres (MCCs)',
      'Remote terminal units (RTUs)',
      'Automation enclosures and control panels',
      'Industrial communication modules',
    ],
  },
  {
    slug: 'construction-infrastructure',
    image: '/sectors/construction.jpg',
    title: 'Construction and Infrastructure',
    desc: 'We supply high-quality equipment and materials to support civil, structural and infrastructure projects across Nigeria and West Africa. Our procurement covers both electrical and mechanical equipment needed at various stages of construction and commissioning.',
    products: [
      'Generators and power distribution equipment',
      'Site lighting and temporary power systems',
      'Electrical installation materials and fittings',
      'Structural inspection and testing equipment',
      'Cable management and trunking systems',
      'Industrial fasteners and fixings',
      'Safety and PPE equipment',
      'Survey and measurement instruments',
      'Concrete testing and monitoring equipment',
      'Communication and signalling systems',
    ],
  },
  {
    slug: 'mining-heavy-engineering',
    image: '/sectors/mining.jpg',
    title: 'Mining and Heavy Engineering',
    desc: 'We supply robust European equipment for mining operations, quarrying, and heavy engineering projects. Our sourcing covers equipment for exploration, extraction, processing and safety — built to withstand demanding environments and operating conditions.',
    products: [
      'NDT equipment — ultrasonic, radiographic and magnetic',
      'Structural inspection tools',
      'Explosive atmosphere (ATEX) certified equipment',
      'Heavy-duty electrical cables and connectors',
      'Motor control and variable speed drives',
      'Industrial sensors for harsh environments',
      'Pump control and monitoring equipment',
      'Conveyor and material handling instrumentation',
      'Condition monitoring and vibration analysis tools',
      'Safety and gas detection systems',
    ],
  },
  {
    slug: 'agriculture-agro-processing',
    image: '/sectors/agriculture.jpg',
    title: 'Agriculture and Agro-processing',
    desc: 'We facilitate the sourcing and delivery of agricultural inputs and processing equipment from certified European suppliers. Our agricultural solutions support poultry farming, crop processing and agro-industrial operations across Nigeria and West Africa.',
    products: [
      'Layers and broiler hatching eggs from certified European hatcheries',
      'Incubation and hatchery equipment',
      'Poultry farm automation and ventilation systems',
      'Feed milling and processing machinery',
      'Grain storage and handling equipment',
      'Irrigation and water management systems',
      'Cold chain and refrigeration equipment',
      'Agricultural monitoring and control systems',
      'Technical support and import documentation',
      'Logistics coordination for perishable goods',
    ],
  },
];

export default function SectorsPage() {
  return (
    <>
      <style>{`
        .sectors-hero {
          background: #0a0a0a; padding: 7rem 0 6rem;
          position: relative; overflow: hidden;
        }
        .sectors-hero-content { position: relative; z-index: 10; }
        .sectors-hero h1 { color: #fff; font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 900; text-transform: uppercase; letter-spacing: -0.03em; margin-bottom: 1.25rem; line-height: 1.05; text-shadow: 0 4px 20px rgba(0,0,0,0.6); }
        .sectors-hero p { color: rgba(255,255,255,.7); font-size: 1.1rem; font-weight: 500; max-width: 620px; line-height: 1.8; text-shadow: 0 2px 10px rgba(0,0,0,0.5); }

        .sectors-list { padding: 5rem 0; display: flex; flex-direction: column; gap: 3rem; }

        .sector-item { display: grid; grid-template-columns: minmax(300px, 1fr) 1.5fr; gap: 4rem; padding: 4rem 0; border-bottom: 1px solid var(--border); align-items: center; }
        .sector-item:last-child { border-bottom: none; }

        .sector-item-left { position: relative; width: 100%; aspect-ratio: 4/5; overflow: hidden; border-radius: var(--radius-sm); }
        .sector-item-left img { width: 100%; height: 100%; object-fit: cover; transition: transform 1.2s ease; }
        .sector-item:hover .sector-item-left img { transform: scale(1.05); }
        .sector-img-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(15,15,15,0.95), rgba(15,15,15,0.2)); }
        .sector-item-left-content { position: absolute; bottom: 2rem; left: 2.5rem; right: 2.5rem; }
        .sector-num { font-size: 0.85rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.25em; color: var(--ladex-gold); margin-bottom: 0.75rem; }
        .sector-item-left h2 { font-size: 1.75rem; font-weight: 900; line-height: 1.15; margin: 0; color: #fff; text-transform: uppercase; }

        .sector-item-right { padding-top: 1rem; }
        .sector-item-right p { font-size: 1.05rem; line-height: 1.8; color: var(--text-secondary); margin-bottom: 2rem; max-width: 540px; }

        .includes-label { font-size: 0.8rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.15em; color: var(--text-primary); margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid var(--ladex-gold); display: inline-block; }
        .product-list { list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem 2rem; margin-bottom: 2.5rem; }
        .product-item { font-size: 0.92rem; color: var(--text-muted); display: flex; align-items: flex-start; gap: 0.65rem; line-height: 1.5; }
        .sector-li-dot { width: 6px; height: 6px; background: var(--ladex-gold); border-radius: 50%; margin-top: 6px; flex-shrink: 0; }

        .sector-actions { margin-top: 2.5rem; }

        @media (max-width: 1024px) {
          .sector-item { gap: 2.5rem; }
          .product-list { grid-template-columns: 1fr; }
        }
        @media (max-width: 900px) {
          .sector-item { grid-template-columns: 1fr; gap: 2rem; }
          .sector-item-left { aspect-ratio: 16/9; }
          .sector-item-left h2 { font-size: 1.5rem; }
          .sector-item-left-content { bottom: 1.5rem; left: 1.5rem; right: 1.5rem; }
        }
      `}</style>

      {/* Hero */}
      <div className="sectors-hero">
        <Image src="/hero/hero_engineering.jpg" alt="Sectors We Serve" fill sizes="100vw" style={{ objectFit: 'cover', opacity: 0.45 }} priority />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.5) 100%)', zIndex: 5 }} />
        <div className="container sectors-hero-content">
          <nav className="breadcrumb" aria-label="Breadcrumb" style={{ marginBottom: '2rem' }}>
            <Link href="/" style={{ color: 'var(--ladex-gold)', fontWeight: 800 }}>Home</Link>
            <span className="breadcrumb-sep" style={{ color: 'rgba(255,255,255,.2)' }}>›</span>
            <span style={{ color: '#fff' }}>Sectors</span>
          </nav>
          <h1>Sectors We Serve</h1>
          <p>We supply European equipment and technical solutions across six critical industries throughout Nigeria and West Africa.</p>
        </div>
      </div>

      {/* Sectors List */}
      <div className="container">
        <div className="sectors-list">
          {SECTORS.map((sector, i) => (
            <div key={sector.slug} id={sector.slug} className="sector-item fade-up">
              <div className="sector-item-left">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={sector.image} alt={sector.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                <div className="sector-img-overlay" />
                <div className="sector-item-left-content">
                  <div className="sector-num">Sector {String(i + 1).padStart(2, '0')}</div>
                  <h2>{sector.title}</h2>
                </div>
              </div>
              <div className="sector-item-right">
                <p>{sector.desc}</p>
                <div className="includes-label">Equipment &amp; Solutions</div>
                <ul className="product-list">
                  {sector.products.map(p => (
                    <li key={p} className="product-item">
                      <span className="sector-li-dot" />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="sector-actions">
                  <Link href="/contact" className="btn btn-dark">Enquire About {sector.title} →</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: 'var(--ladex-black)', padding: '5rem 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2.5rem' }}>
          <div style={{ maxWidth: '580px' }}>
            <h2 style={{ color: '#fff', marginBottom: '1rem', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}>Don&apos;t See Your Sector?</h2>
            <p style={{ color: 'rgba(255,255,255,.5)', margin: 0, fontSize: '1.05rem', lineHeight: 1.8 }}>
              We source equipment across a broad range of industries. Contact us with your requirement and we will identify the right European supplier for you.
            </p>
          </div>
          <Link href="/contact" className="btn btn-primary btn-lg">Get a Quote</Link>
        </div>
      </div>
    </>
  );
}
